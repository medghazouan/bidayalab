"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createAdmin(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string || "admin";

    if (!name || !email || !password) {
        throw new Error("Missing required fields");
    }

    await connectToDatabase();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        throw new Error("Admin with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Admin.create({
        name,
        email,
        passwordHash,
        role,
    });

    revalidatePath("/dashboard/settings");
}
