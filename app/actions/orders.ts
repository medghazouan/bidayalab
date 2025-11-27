"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";

export async function getOrders() {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
}

export async function getOrder(id: string) {
    await connectToDatabase();
    const order = await Order.findById(id).lean();
    return JSON.parse(JSON.stringify(order));
}

export async function updateOrderStatus(id: string, status: string) {
    await connectToDatabase();
    await Order.findByIdAndUpdate(id, { status });
    revalidatePath("/dashboard/orders");
}
