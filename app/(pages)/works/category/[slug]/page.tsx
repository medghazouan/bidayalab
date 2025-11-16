// app/works/category/[slug]/page.tsx

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import clientPromise from "@/lib/mongodb";

// Code splitting - load category pages dynamically
const WebDevCategoryPage = dynamic(
  () => import("@/components/sections/category/WebDevCategoryPage"),
  { 
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true 
  }
);

const SocialMediaCategoryPage = dynamic(
  () => import("@/components/sections/category/SocialMediaCategoryPage"),
  { 
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true 
  }
);

const PaidAdsCategoryPage = dynamic(
  () => import("@/components/sections/category/PaidAdsCategoryPage"),
  { 
    loading: () => <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#beff01] border-t-transparent"></div></div>,
    ssr: true 
  }
);

// Category metadata
const categoryInfo = {
  "web-dev": {
    title: "Web Development Projects",
    description: "Modern, scalable web applications built with cutting-edge technologies",
  },
  "social-media": {
    title: "Social Media & Content Creation",
    description: "Engaging content strategies that drive real growth and engagement",
  },
  "paid-ads": {
    title: "Paid Advertising Campaigns",
    description: "Data-driven ad campaigns that deliver measurable ROI",
  },
};

// Fetch projects from MongoDB with timeout protection
async function getProjectsByCategory(categorySlug: string) {
  try {
    const client = await clientPromise;
    const db = client.db('meddigital');
    
    // Fetch with timeout protection
    const projects = await Promise.race([
      db
        .collection('projects')
        .find({ categorySlug: categorySlug })
        .sort({ order: 1 })
        .toArray(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ]) as any[];

    // Convert MongoDB _id to string
    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categoryInfo[params.slug as keyof typeof categoryInfo];
  
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

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryProjects = await getProjectsByCategory(params.slug);

  if (categoryProjects.length === 0) {
    notFound();
  }

  // Render specific category page
  switch (params.slug) {
    case "web-dev":
      return <WebDevCategoryPage projects={categoryProjects} />;
    case "social-media":
      return <SocialMediaCategoryPage projects={categoryProjects} />;
    case "paid-ads":
      return <PaidAdsCategoryPage projects={categoryProjects} />;
    default:
      notFound();
  }
}

export function generateStaticParams() {
  return [
    { slug: "web-dev" },
    { slug: "social-media" },
    { slug: "paid-ads" },
  ];
}
