"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Lead from "@/models/Lead";

export async function submitLead(formData: FormData) {
    try {
        await connectToDatabase();

        const email = formData.get("email");
        const industry = formData.get("industry");

        if (!email || !industry) {
            return { success: false, error: "Email and Industry are required." };
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.toString())) {
            return { success: false, error: "Invalid email address." };
        }

        await Lead.create({
            email,
            industry
        });

        // Form submitted successfully

        return { success: true };
    } catch (error) {
        console.error("Lead Submission Error:", error);
        return { success: false, error: "Failed to submit. Please try again." };
    }
}
