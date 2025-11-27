"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
}

export async function createBlog(formData: FormData) {
    await connectToDatabase();

    const data = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        text: formData.get("text"),
        excerpt: formData.get("excerpt"),
        image: formData.get("image"),
        category: formData.get("category"),
        author: formData.get("author"),
    };

    await Blog.create(data);
    revalidatePath("/dashboard/blogs");
}

export async function getBlog(id: string) {
    await connectToDatabase();
    const blog = await Blog.findById(id).lean();
    return JSON.parse(JSON.stringify(blog));
}

export async function updateBlog(id: string, formData: FormData) {
    await connectToDatabase();

    const data = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        text: formData.get("text"),
        excerpt: formData.get("excerpt"),
        image: formData.get("image"),
        category: formData.get("category"),
        author: formData.get("author"),
    };

    await Blog.findByIdAndUpdate(id, data);
    revalidatePath("/dashboard/blogs");
}

export async function deleteBlog(id: string) {
    await connectToDatabase();
    await Blog.findByIdAndDelete(id);
    revalidatePath("/dashboard/blogs");
}
