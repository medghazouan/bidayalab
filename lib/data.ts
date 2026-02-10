"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Blog from "@/models/Blog";
import Project from "@/models/Project";

/**
 * Get all blogs or filter by category
 */
export async function getBlogs(category: string = 'all') {
    try {
        await connectToDatabase();

        const query = category && category !== 'all'
            ? { category }
            : {};

        const blogs = await Blog.find(query)
            .sort({ publicationDate: -1 })
            .lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(blogs))
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { success: false, data: [] };
    }
}

/**
 * Get a single blog by slug
 */
export async function getBlogBySlug(slug: string) {
    try {
        await connectToDatabase();

        const blog = await Blog.findOne({ slug }).lean();

        if (!blog) {
            return { success: false, data: null };
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(blog))
        };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return { success: false, data: null };
    }
}

/**
 * Get all projects
 */
export async function getProjects() {
    try {
        await connectToDatabase();

        const projects = await Project.find({ status: 'published' })
            .sort({ createdAt: -1 })
            .lean();

        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string) {
    try {
        await connectToDatabase();

        const project = await Project.findOne({ slug, status: 'published' }).lean();

        if (!project) {
            return null;
        }

        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
}

/**
 * Get related blogs by category
 */
export async function getRelatedBlogs(currentSlug: string, category: string, limit: number = 5) {
    try {
        await connectToDatabase();

        const blogs = await Blog.find({
            slug: { $ne: currentSlug },
            category
        })
            .sort({ publicationDate: -1 })
            .limit(limit)
            .lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(blogs))
        };
    } catch (error) {
        console.error("Error fetching related blogs:", error);
        return { success: false, data: [] };
    }
}
