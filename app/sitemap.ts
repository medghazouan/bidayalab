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
        '/services',
        '/works',
        '/blogs',
        '/contact',
        '/privacy',
        '/terms',
        '/fr',
        '/fr/about',
        '/fr/services',
        '/fr/works',
        '/fr/blogs',
        '/fr/contact',
    ];

    const now = new Date();

    const staticRoutes = staticPaths.map((route) => {
        const isFr = route.startsWith('/fr');
        const enRoute = isFr ? route.replace(/^\/fr/, '') || '/' : route;
        const frRoute = isFr ? route : `/fr${route}`;
        return {
            url: `${baseUrl}${route}`,
            lastModified: now,
            alternates: {
                languages: {
                    en: `${baseUrl}${enRoute}`,
                    fr: `${baseUrl}${frRoute}`,
                },
            },
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

        // Fetch Blogs (with hreflang alternates between en/fr counterparts)
        const blogs = await db.collection('blogs').find({}).project({ slug: 1, updatedAt: 1, lang: 1, alternateSlug: 1 }).toArray();
        blogRoutes = blogs.map((blog) => {
            const isFr = blog.lang === 'fr';
            const path = isFr ? `/fr/blogs/${blog.slug}` : `/blogs/${blog.slug}`;
            const counterpart = blog.alternateSlug
                ? isFr
                    ? `/blogs/${blog.alternateSlug}`
                    : `/fr/blogs/${blog.alternateSlug}`
                : null;
            return {
                url: `${baseUrl}${path}`,
                lastModified: safeDate(blog.updatedAt),
                alternates: counterpart
                    ? {
                          languages: {
                              [isFr ? 'fr' : 'en']: `${baseUrl}${path}`,
                              [isFr ? 'en' : 'fr']: `${baseUrl}${counterpart}`,
                          },
                      }
                    : undefined,
            };
        });
    } catch (error) {
        // If DB is unreachable, return static routes only — no 500
        console.error('Sitemap: Failed to fetch dynamic routes from database:', error);
    }

    return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
