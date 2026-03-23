import { MetadataRoute } from 'next';

export const revalidate = 3600; // Revalidate every hour

// Helper to safely create a date
function safeDate(dateValue: any): Date {
    if (!dateValue) return new Date();
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.bidayalab.com';

    // Static Routes — all public indexable pages
    const staticPaths = [
        '',
        '/about',
        '/works',
        '/blogs',
        '/contact',
        '/privacy',
        '/terms',
    ];

    const now = new Date();

    const staticRoutes = staticPaths.map((route) => {
        return {
            url: `${baseUrl}${route}`,
            lastModified: now,
        };
    });

    // Dynamic routes from database — wrapped in try/catch to prevent 500
    let workRoutes: MetadataRoute.Sitemap = [];
    let blogRoutes: MetadataRoute.Sitemap = [];

    try {
        const { getDatabase } = await import('@/lib/mongodb');
        const db = await getDatabase();

        // Fetch Projects
        const works = await db.collection('projects').find({ status: 'published' }).project({ slug: 1, updatedAt: 1 }).toArray();
        workRoutes = works.map((work) => {
            return {
                url: `${baseUrl}/works/${work.slug}`,
                lastModified: safeDate(work.updatedAt),
            };
        });

        // Fetch Blogs
        const blogs = await db.collection('blogs').find({}).project({ slug: 1, updatedAt: 1 }).toArray();
        blogRoutes = blogs.map((blog) => {
            return {
                url: `${baseUrl}/blogs/${blog.slug}`,
                lastModified: safeDate(blog.updatedAt),
            };
        });
    } catch (error) {
        // If DB is unreachable, return static routes only — no 500
        console.error('Sitemap: Failed to fetch dynamic routes from database:', error);
    }

    return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
