import { notFound } from "next/navigation";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

import UniversalProject from "@/components/projects/UniversalProject";
import { IProject } from "@/models/Project";

// --- Data Fetching ---
async function getProjectBySlug(slug: string) {
  try {
    const db = await getDatabase();
    const project = await db.collection('projects').findOne({ slug: slug });

    if (!project) return null;

    // Manual serialization for Next.js hydration
    return {
      ...project,
      _id: project._id.toString(),
      completedAt: project.completedAt?.toString(),
      createdAt: project.createdAt?.toString(),
      updatedAt: project.updatedAt?.toString(),
      // Ensure arrays are arrays
      gallery: project.gallery || [],
      techStack: project.techStack || [],
      aiTools: project.aiTools || [],
    } as unknown as IProject;

  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

async function getRelatedProjects(currentId: string) {
  try {
    const db = await getDatabase();
    const related = await db.collection('projects')
      .find({
        _id: { $ne: new ObjectId(currentId) }
      })
      .toArray();

    return related.map(p => ({
      ...p,
      _id: p._id.toString(),
      completedAt: p.completedAt?.toString(),
      createdAt: p.createdAt?.toString(),
      updatedAt: p.updatedAt?.toString(),
      gallery: p.gallery || [],
      techStack: p.techStack || [],
      aiTools: p.aiTools || [],
    })) as unknown as IProject[];
  } catch (error) {
    console.error("Error fetching related:", error);
    return [];
  }
}

// --- Page Component ---
export default async function ProjectDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return notFound();

  const relatedProjects = await getRelatedProjects(project._id as string);

  return <UniversalProject project={project} relatedProjects={relatedProjects} />;
}