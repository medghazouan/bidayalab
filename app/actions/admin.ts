"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function changePassword(currentPassword: string, newPassword: string) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return { success: false, error: "Not authenticated" };
        }

        await connectToDatabase();
        const admin = await Admin.findOne({ email: session.user.email });

        if (!admin) {
            return { success: false, error: "User not found" };
        }

        const passwordsMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
        if (!passwordsMatch) {
            return { success: false, error: "Incorrect current password" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.passwordHash = hashedPassword;
        await admin.save();

        return { success: true };
    } catch (error) {
        console.error("Error changing password:", error);
        return { success: false, error: "Failed to change password" };
    }
}

import { z } from "zod";

const CreateAdminSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["admin", "editor"]),
});

export async function createAdmin(data: { name: string; email: string; password: string; role: string }) {
    try {
        const session = await auth();
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if ((session?.user as any)?.role !== "admin") {
            return { success: false, error: "Unauthorized: Only admins can create new users" };
        }

        // Validate input with Zod
        const validatedFields = CreateAdminSchema.safeParse(data);
        if (!validatedFields.success) {
            const errorMsg = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(", ");
            return { success: false, error: errorMsg || "Invalid input data" };
        }

        await connectToDatabase();

        const existingAdmin = await Admin.findOne({ email: data.email });
        if (existingAdmin) {
            return { success: false, error: "User with this email already exists" };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await Admin.create({
            name: data.name,
            email: data.email,
            passwordHash: hashedPassword,
            role: data.role || "editor",
        });

        revalidatePath("/dashboard/settings");
        return { success: true };
    } catch (error) {
        console.error("Error creating admin:", error);
        return { success: false, error: "Failed to create admin" };
    }
}
