"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
    await connectToDatabase();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(testimonials));
}

export async function getTestimonial(id: string) {
    await connectToDatabase();
    const testimonial = await Testimonial.findById(id).lean();
    return JSON.parse(JSON.stringify(testimonial));
}

export async function createTestimonial(formData: FormData) {
    await connectToDatabase();

    const data = {
        name: formData.get("name"),
        position: formData.get("position"),
        content: formData.get("content"),
        rating: Number(formData.get("rating")),
    };

    await Testimonial.create(data);
    revalidatePath("/dashboard/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
    await connectToDatabase();

    const data = {
        name: formData.get("name"),
        position: formData.get("position"),
        content: formData.get("content"),
        rating: Number(formData.get("rating")),
    };

    await Testimonial.findByIdAndUpdate(id, data);
    revalidatePath("/dashboard/testimonials");
}

export async function deleteTestimonial(id: string) {
    await connectToDatabase();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/dashboard/testimonials");
}
