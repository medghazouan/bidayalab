// app/works/category/[slug]/page.tsx

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import clientPromise from "@/lib/mongodb";
import { IProject } from "@/models/Project";

// Code splitting - load category pages dynamically
const DigitalDevelopmentCategory = dynamic(
  () => import("@/components/sections/category/DigitalDevelopmentCategory"),
  {
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true
  }
);

const DigitalMarketingCategory = dynamic(
  () => import("@/components/sections/category/DigitalMarketingCategory"),
  {
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true
  }
);

const CreativeStudioCategory = dynamic(
  () => import("@/components/sections/category/CreativeStudioCategory"),
  {
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true
  }
);

const AIAutomationCategory = dynamic(
  () => import("@/components/sections/category/AIAutomationCategory"),
  {
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true
  }
);

const VisualStorytellingCategory = dynamic(
  () => import("@/components/sections/category/VisualStorytellingCategory"),
  {
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true
  }
);

// Category metadata
const categoryInfo = {
  "digital-development": {
    title: "Digital Development",
    description: "Modern, scalable web applications built with cutting-edge technologies",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Data-driven ad campaigns that deliver measurable ROI",
  },
  "creative-studio": {
    title: "Creative Studio",
    description: "Brand identities and visual systems that stand out",
  },
  "ai-automation": {
    title: "AI Automation",
    description: "Intelligent systems to automate and scale your business",
  },
  "visual-storytelling": {
    title: "Visual Storytelling",
    description: "Cinematic content that tells your brand's story",
  },
  // Legacy aliases
  "web-dev": {
    title: "Digital Development",
    description: "Modern, scalable web applications built with cutting-edge technologies",
  },
  "paid-ads": {
    title: "Digital Marketing",
    description: "Data-driven ad campaigns that deliver measurable ROI",
  },
  "social-media": {
    title: "Visual Storytelling",
    description: "Engaging content strategies that drive real growth and engagement",
  },
};

// Fetch projects from MongoDB with timeout protection
async function getProjectsByCategory(categorySlug: string) {
  try {
    const client = await clientPromise;
    const db = client.db('meddigital');

    // Handle legacy slugs in query if needed, or assume data uses new slugs?
    // For now, query by the slug passed in. If data uses "web-dev" and url uses "digital-development", we might need mapping.
    // Assuming data still uses old slugs or we need to query for both?
    // Let's assume exact match for now.

    const projects = await Promise.race([
      db
        .collection('works')
        .find({ categorySlug: categorySlug }) // You might need to map new slugs to old DB values if DB hasn't been updated
        .sort({ order: 1 })
        .toArray(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      )
    ]) as Array<{ _id: { toString: () => string };[key: string]: unknown }>;

    // Convert MongoDB _id to string
    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    })) as unknown as IProject[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryInfo[slug as keyof typeof categoryInfo];

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.title} | MEDDIGITAL`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Map new slugs to old DB slugs if necessary (optional, depending on DB state)
  // For now, we pass the slug directly.
  const categoryProjects = await getProjectsByCategory(slug);

  // Render specific category page
  switch (slug) {
    case "digital-development":
    case "web-dev":
      return <DigitalDevelopmentCategory projects={categoryProjects} />;

    case "digital-marketing":
    case "paid-ads":
      return <DigitalMarketingCategory projects={categoryProjects} />;

    case "creative-studio":
      return <CreativeStudioCategory projects={categoryProjects} />;

    case "ai-automation":
      return <AIAutomationCategory projects={categoryProjects} />;

    case "visual-storytelling":
    case "social-media":
      return <VisualStorytellingCategory projects={categoryProjects} />;

    default:
      notFound();
  }
}

export function generateStaticParams() {
  return [
    { slug: "digital-development" },
    { slug: "digital-marketing" },
    { slug: "creative-studio" },
    { slug: "ai-automation" },
    { slug: "visual-storytelling" },
    // Legacy
    { slug: "web-dev" },
    { slug: "paid-ads" },
    { slug: "social-media" },
  ];
}
