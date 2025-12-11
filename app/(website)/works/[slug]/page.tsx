import { notFound } from "next/navigation";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// --- Import Your 5 New Distinct Components ---
// Ensure these files exist in 'components/projects/' with these exact names
import CreativeStudioProject from "@/components/projects/CreativeStudioProject";
import DigitalDevelopmentProject from "@/components/projects/DigitalDevelopmentProject";
import AIAutomationProject from "@/components/projects/AIAutomationProject";
import DigitalMarketingProject from "@/components/projects/DigitalMarketingProject";
import VisualStorytellingProject from "@/components/projects/VisualStorytellingProject";

// Import Type Definition
import { IProject } from "@/models/Project";

// --- Data Fetching Logic ---
async function getProjectBySlug(slug: string) {
  try {
    const db = await getDatabase();

    // Find the project by slug
    const project = await db.collection('works').findOne({ slug: slug });

    if (!project) return null;

    // Convert MongoDB Objects to simple Strings for React hydration
    return {
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt?.toString() || new Date().toISOString(),
      updatedAt: project.updatedAt?.toString() || new Date().toISOString(),
      // Map legacy/optional fields to ensure arrays are never undefined
      images: project.images || [],
      technologies: project.technologies || [],
      brandColors: project.brandColors || [],
      deliverables: project.deliverables || [],
    } as unknown as IProject;

  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// --- Main Page Component ---
export default async function ProjectDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // Next.js 15+ awaits params
  const { slug } = await params;

  // Fetch Data
  const project = await getProjectBySlug(slug);

  // 404 if missing
  if (!project) {
    return notFound();
  }

  // --- RENDER LOGIC: Category Routing ---

  // Case 1: AI & Automation
  if (project.category === "ai-automation") {
    return <AIAutomationProject project={project} />;
  }

  // Case 2: Creative Studio (Graphics & Branding)
  if (project.category === "creative-studio") {
    return <CreativeStudioProject project={project} />;
  }

  // Case 3: Digital Marketing (Ads & SEO)
  if (project.category === "digital-marketing") {
    return <DigitalMarketingProject project={project} />;
  }

  // Case 4: Visual Storytelling (Photo & Video)
  if (project.category === "visual-storytelling") {
    return <VisualStorytellingProject project={project} />;
  }

  // Case 5 & Default: Digital Development (Web)
  // This handles 'digital-development' and serves as the fallback layout
  return <DigitalDevelopmentProject project={project} />;
}