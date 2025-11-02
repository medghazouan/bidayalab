// app/(pages)/works/[slug]/page.tsx

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import clientPromise from "@/lib/mongodb";

// Code splitting - load project components dynamically
const WebDevProject = dynamic(
  () => import("@/components/projects/WebDevProject"),
  { 
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true 
  }
);

const SocialMediaProject = dynamic(
  () => import("@/components/projects/SocialMediaProject"),
  { 
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true 
  }
);

const PaidAdsProject = dynamic(
  () => import("@/components/projects/PaidAdsProject"),
  { 
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true 
  }
);

// Fetch single project by slug with timeout protection
async function getProjectBySlug(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db('meddigital');
    
    // Fetch with timeout protection
    const project = await Promise.race([
      db
        .collection('projects')
        .findOne({ slug: slug }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      )
    ]) as any;

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

// Cache project data to avoid duplicate queries using Next.js unstable_cache
let projectCache = new Map<string, Promise<any>>();

async function getProjectData(slug: string) {
  // Simple in-memory cache to deduplicate requests within the same render
  if (!projectCache.has(slug)) {
    projectCache.set(slug, getProjectBySlug(slug));
  }
  return projectCache.get(slug)!;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectData(params.slug);
  
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
  // Use the same cached data as generateMetadata
  const project = await getProjectData(params.slug);

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
