"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Project, { IProject } from "@/models/Project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getProjects() {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
}

export async function getProject(id: string) {
    await connectToDatabase();
    try {
        const project = await Project.findById(id).lean();
        if (!project) return null;
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        return null;
    }
}

export async function createProject(formData: FormData) {
    await connectToDatabase();

    // Helper to safe parse JSON
    const parseJSON = (key: string) => {
        const value = formData.get(key);
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch (e) {
                return [];
            }
        }
        return [];
    };

    const data: Partial<IProject> = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as any,
        client: formData.get("client") as string,
        year: formData.get("year") as string,
        duration: formData.get("duration") as string,
        image: formData.get("image") as string,
        status: formData.get("status") as any || 'draft',
        featured: formData.get("featured") === 'on',

        // Arrays & Complex Objects
        technologies: parseJSON("technologies"),
        images: parseJSON("images"),
        results: parseJSON("results"),

        // Category Specific
        brandColors: parseJSON("brandColors"),
        deliverables: parseJSON("deliverables"),
        features: parseJSON("features"),
        aiModels: parseJSON("aiModels"),
        integrations: parseJSON("integrations"),
        platforms: parseJSON("platforms"),
        equipment: parseJSON("equipment"),
        adCreatives: parseJSON("adCreatives"),

        // Simple String Fields
        brandStrategy: formData.get("brandStrategy") as string,
        liveUrl: formData.get("liveUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        challenge: formData.get("challenge") as string,
        solution: formData.get("solution") as string,
        automationType: formData.get("automationType") as string,
        workflowDescription: formData.get("workflowDescription") as string,
        timeSaved: formData.get("timeSaved") as string,
        budget: formData.get("budget") as string,
        targetAudience: formData.get("targetAudience") as string,
        strategy: formData.get("strategy") as string,
        shootingStyle: formData.get("shootingStyle") as string,
        location: formData.get("location") as string,
        postProduction: formData.get("postProduction") as string,
        videoUrl: formData.get("videoUrl") as string,
    };

    await Project.create(data);
    revalidatePath("/dashboard/projects");
    redirect("/dashboard/projects");
}

export async function updateProject(id: string, formData: FormData) {
    await connectToDatabase();

    // Helper to safe parse JSON
    const parseJSON = (key: string) => {
        const value = formData.get(key);
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch (e) {
                return [];
            }
        }
        return [];
    };

    const data: Partial<IProject> = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as any,
        client: formData.get("client") as string,
        year: formData.get("year") as string,
        duration: formData.get("duration") as string,
        image: formData.get("image") as string,
        status: formData.get("status") as any || 'draft',
        featured: formData.get("featured") === 'on',

        // Arrays & Complex Objects
        technologies: parseJSON("technologies"),
        images: parseJSON("images"),
        results: parseJSON("results"),

        // Category Specific
        brandColors: parseJSON("brandColors"),
        deliverables: parseJSON("deliverables"),
        features: parseJSON("features"),
        aiModels: parseJSON("aiModels"),
        integrations: parseJSON("integrations"),
        platforms: parseJSON("platforms"),
        equipment: parseJSON("equipment"),
        adCreatives: parseJSON("adCreatives"),

        // Simple String Fields
        brandStrategy: formData.get("brandStrategy") as string,
        liveUrl: formData.get("liveUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        challenge: formData.get("challenge") as string,
        solution: formData.get("solution") as string,
        automationType: formData.get("automationType") as string,
        workflowDescription: formData.get("workflowDescription") as string,
        timeSaved: formData.get("timeSaved") as string,
        budget: formData.get("budget") as string,
        targetAudience: formData.get("targetAudience") as string,
        strategy: formData.get("strategy") as string,
        shootingStyle: formData.get("shootingStyle") as string,
        location: formData.get("location") as string,
        postProduction: formData.get("postProduction") as string,
        videoUrl: formData.get("videoUrl") as string,
    };

    await Project.findByIdAndUpdate(id, data);
    revalidatePath("/dashboard/projects");
    redirect("/dashboard/projects");
}

export async function deleteProject(id: string) {
    await connectToDatabase();
    await Project.findByIdAndDelete(id);
    revalidatePath("/dashboard/projects");
}
