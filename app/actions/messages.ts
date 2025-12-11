"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";

export async function getMessages() {
    await connectToDatabase();
    const messages = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(messages));
}

export async function getMessage(id: string) {
    await connectToDatabase();
    const message = await Contact.findById(id).lean();
    return JSON.parse(JSON.stringify(message));
}

export async function markAsRead(id: string) {
    await connectToDatabase();
    await Contact.findByIdAndUpdate(id, { status: 'read' });
    revalidatePath("/dashboard/messages");
}

export async function deleteMessage(id: string) {
    await connectToDatabase();
    await Contact.findByIdAndDelete(id);
    revalidatePath("/dashboard/messages");
}
