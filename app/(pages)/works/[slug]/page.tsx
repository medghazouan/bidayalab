// app/(pages)/works/[slug]/page.tsx

import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import WebDevProject from "@/components/projects/WebDevProject";
import SocialMediaProject from "@/components/projects/SocialMediaProject";
import PaidAdsProject from "@/components/projects/PaidAdsProject";

// Fetch single project by slug
async function getProjectBySlug(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db('meddigital');
    
    const project = await db
      .collection('projects')
      .findOne({ slug: slug });

    if (!project) {
      return null;
    }

    // Convert MongoDB _id to string
    return {
      ...project,
      _id: project._id.toString(),
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found | MEDDIGITAL",
    };
  }

  return {
    title: `${project.title} | MEDDIGITAL`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Render specific project component based on category
  switch (project.category) {
    case "web-dev":
      return <WebDevProject project={project} />;
    case "social-media":
      return <SocialMediaProject project={project} />;
    case "paid-ads":
      return <PaidAdsProject project={project} />;
    default:
      return <WebDevProject project={project} />; // Default fallback
  }
}
