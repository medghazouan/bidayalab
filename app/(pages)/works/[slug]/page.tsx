// app/works/[slug]/page.tsx
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { Document, WithId } from "mongodb";
import GenericProjectPage from "@/components/projects/GenericProjectPage";

interface ProjectPageProps {
  params: Promise<{ slug: string }>; // Next.js 15 uses Promise for params
}

// Extend MongoDB's Document type
type ProjectDocument = WithId<Document> & {
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  description?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  client?: string;
  year?: string;
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  featured?: boolean;
  order?: number;
  createdAt?: Date;
};

async function getProjectData(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    console.log('🔍 Looking for project with slug:', slug);

    const project = await db
      .collection<ProjectDocument>('projects')
      .findOne({ slug });

    console.log('📦 Found project:', project ? project.title : 'NOT FOUND');

    if (!project) {
      return null;
    }

    // Convert to plain object with _id as string
    const { _id, ...rest } = project;
    
    return {
      ...rest,
      _id: _id.toString()
    };
  } catch (error) {
    console.error('❌ Error fetching project:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params; // Must await params
  const project = await getProjectData(slug);

  if (!project) {
    return { 
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    };
  }

  return {
    title: `${project.title} | Your Agency Name`,
    description: project.description || `View ${project.title} project details`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params; // Must await params
  
  console.log('🚀 Loading project page for slug:', slug);
  
  const project = await getProjectData(slug);

  if (!project) {
    console.log('❌ Project not found, showing 404');
    notFound();
  }

  console.log('✅ Rendering project:', project.title);

  return <GenericProjectPage project={project} />;
}

// Optional: Generate static paths for better performance
export async function generateStaticParams() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const projects = await db
      .collection('projects')
      .find({}, { projection: { slug: 1 } })
      .toArray();

    console.log('📋 Generating static params for', projects.length, 'projects');

    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
