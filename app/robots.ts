import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/api/', '/admin/'],
            },
            {
                // Explicitly allow Google and major AI chatbots for brand visibility.
                userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Google-Extended'],
                allow: '/',
            },
            {
                // Block massive low-quality scrapers
                userAgent: ['Bytespider', 'CCBot'],
                disallow: '/',
            }
        ],
        sitemap: 'https://www.bidayalab.com/sitemap.xml',
    };
}
