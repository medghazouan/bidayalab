"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { Settings } from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    try {
        await connectToDatabase();
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        return JSON.parse(JSON.stringify(settings));
    } catch (error) {
        console.error("Error fetching settings:", error);
        return null;
    }
}

export async function updateSettings(data: { linkedinUrl: string; instagramUrl: string }) {
    try {
        await connectToDatabase();
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(data);
        } else {
            settings.linkedinUrl = data.linkedinUrl;
            settings.instagramUrl = data.instagramUrl;
            await settings.save();
        }
        revalidatePath("/");
        return { success: true, settings: JSON.parse(JSON.stringify(settings)) };
    } catch (error) {
        console.error("Error updating settings:", error);
        return { success: false, error: "Failed to update settings" };
    }
}
