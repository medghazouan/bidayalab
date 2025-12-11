"use server";

import { connectToDatabase } from "@/lib/mongoose";
import PricingPlan from "@/models/PricingPlan";
import { revalidatePath } from "next/cache";

export async function getPricingPlans() {
    await connectToDatabase();
    const plans = await PricingPlan.find({}).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(plans));
}

export async function getPricingPlan(id: string) {
    await connectToDatabase();
    const plan = await PricingPlan.findById(id).lean();
    return JSON.parse(JSON.stringify(plan));
}

export async function createPricingPlan(formData: FormData) {
    await connectToDatabase();

    const data = {
        name: formData.get("name"),
        tagline: formData.get("tagline"),
        price: Number(formData.get("price")),
        period: formData.get("period"),
        description: formData.get("description"),
        features: formData.getAll("features"),
        popular: formData.get("popular") === "on",
        isCustom: formData.get("isCustom") === "on",
    };

    await PricingPlan.create(data);
    revalidatePath("/dashboard/pricing");
}

export async function updatePricingPlan(id: string, formData: FormData) {
    await connectToDatabase();

    const data = {
        name: formData.get("name"),
        tagline: formData.get("tagline"),
        price: Number(formData.get("price")),
        period: formData.get("period"),
        description: formData.get("description"),
        features: formData.getAll("features"),
        popular: formData.get("popular") === "on",
        isCustom: formData.get("isCustom") === "on",
    };

    await PricingPlan.findByIdAndUpdate(id, data);
    revalidatePath("/dashboard/pricing");
}

export async function deletePricingPlan(id: string) {
    await connectToDatabase();
    await PricingPlan.findByIdAndDelete(id);
    revalidatePath("/dashboard/pricing");
}
