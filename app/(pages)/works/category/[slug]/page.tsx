// app/works/category/[slug]/page.tsx

import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import GenericCategoryPage from "@/components/sections/category/GenericCategoryPage";

interface CategoryPageProps {
  params: Promise<{ slug: string }>; // ✅ FIXED: Changed to Promise
}

// Define your 3 main categories
const CATEGORIES = {
  'digital-solutions': {
    label: 'Digital Solutions',
    description: 'Custom web applications, AI-powered tools, and innovative digital products. From e-commerce platforms to intelligent chatbots, we build solutions that solve real business problems.',
    icon: 'Code2',
    services: [
      { name: 'Web Applications', desc: 'React, Next.js, full-stack development' },
      { name: 'AI Integration', desc: 'LLMs, chatbots, machine learning models' },
      { name: 'Custom Development', desc: 'Tailored solutions for unique needs' }
    ]
  },
  'smart-automation': {
    label: 'Smart Automation',
    description: 'Streamline your business operations with intelligent automation workflows. From n8n integrations to custom automation systems, we help you work smarter, not harder.',
    icon: 'Workflow',
    services: [
      { name: 'Workflow Automation', desc: 'n8n, Zapier, custom workflows' },
      { name: 'Business Process', desc: 'HR automation, data processing' },
      { name: 'API Integrations', desc: 'Connect your tools seamlessly' }
    ]
  },
  'creative-branding': {
    label: 'Creative Branding',
    description: 'Strategic marketing and brand identity that makes you stand out. From social media campaigns to complete brand overhauls, we create memorable experiences that resonate with your audience.',
    icon: 'Palette',
    services: [
      { name: 'Brand Identity', desc: 'Logos, visual systems, brand guides' },
      { name: 'Digital Marketing', desc: 'Social media, paid ads, content strategy' },
      { name: 'Content Creation', desc: 'Engaging content that converts' }
    ]
  }
};

type CategorySlug = keyof typeof CATEGORIES;

async function getCategoryData(slug: string) {
  // Validate category exists
  if (!(slug in CATEGORIES)) {
    return null;
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB); // ✅ Use env variable

  // ✅ FIXED: Query by categorySlug, not category
  const projects = await db
    .collection('projects')
    .find({ categorySlug: slug })
    .sort({ order: 1, createdAt: -1 })
    .toArray();

  return {
    category: {
      slug,
      ...CATEGORIES[slug as CategorySlug]
    },
    projects: projects.map(p => ({
      ...p,
      _id: p._id.toString()
    }))
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params; // ✅ FIXED: Await params
  const data = await getCategoryData(slug);
  
  if (!data) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${data.category.label} | Your Agency Name`,
    description: data.category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params; // ✅ FIXED: Await params
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  return (
    <GenericCategoryPage 
      category={data.category} 
      projects={data.projects} 
    />
  );
}

// Generate static paths for all 3 categories
export async function generateStaticParams() {
  return [
    { slug: 'digital-solutions' },
    { slug: 'smart-automation' },
    { slug: 'creative-branding' },
  ];
}
