import { MetadataRoute } from 'next';
import { getDatabase } from '@/lib/mongodb';

export const revalidate = 3600; // Revalidate every hour

// Helper to safely create a date
function safeDate(dateValue: any): Date {
    if (!dateValue) return new Date();
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bidayalab.com';
    const db = await getDatabase();

    // Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/services',
        '/works',
        '/blogs',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Fetch Projects
    const works = await db.collection('projects').find({ status: 'published' }).project({ slug: 1, updatedAt: 1 }).toArray();
    const workRoutes = works.map((work) => ({
        url: `${baseUrl}/works/${work.slug}`,
        lastModified: safeDate(work.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Fetch Blogs
    const blogs = await db.collection('blogs').find({}).project({ slug: 1, updatedAt: 1 }).toArray();
    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: safeDate(blog.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
