import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { getBlogs3and4 } from './blog-data-3-4';
import { getBlogs5and6 } from './blog-data-5-6';

export async function POST() {
  try {
    const db = await getDatabase();
    await db.collection('blogs').deleteMany({});

    const now = new Date();
    const blogs = [
      ...getBlogs1and2(now),
      ...getBlogs3and4(now),
      ...getBlogs5and6(now),
    ];
    await db.collection('blogs').insertMany(blogs);

    return NextResponse.json({
      success: true,
      message: `Deleted all blogs and inserted ${blogs.length} new blog posts`,
      count: blogs.length,
    });
  } catch (error) {
    console.error('Error seeding blogs:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function getBlogs1and2(now: Date) {
  return [
    {
      title: 'n8n vs Make vs Zapier: Which automation platform should a Moroccan SME pick in 2026?',
      slug: 'n8n-vs-make-vs-zapier-morocco-2026',
      category: 'ai-automation',
      lang: 'en',
      authorName: 'Mohamed El Kechchad',
      readingTime: 9,
      publicationDate: new Date('2026-01-12T09:00:00.000Z'),
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      alternateSlug: 'n8n-vs-make-vs-zapier-pme-maroc-2026',
      excerpt: "A senior operator's honest 2026 picker for SMEs in Morocco. n8n wins on long-term cost and data sovereignty. Make wins on visual building. Zapier still wins on plug-and-play.",
      text: '<p><strong>TL;DR — In 2026, most Moroccan SMEs and agencies should pick <em>n8n</em>.</strong> It is the only major automation platform you can self-host inside Morocco, pay a flat fee for unlimited runs, and extend with JavaScript.</p><h2>What is the actual difference?</h2><p>All three move data between business apps. The differences: <strong>pricing model, hosting, and extensibility</strong>.</p><p><strong>n8n</strong> is open-source, self-hostable. Free for unlimited runs self-hosted. <strong>Make</strong> is closed-source SaaS, best visual editor. <strong>Zapier</strong> has 8,000+ connectors but most expensive at scale.</p><h2>Cost comparison at 5,000 tasks/month</h2><ul><li><strong>n8n self-hosted:</strong> ~70 MAD/month</li><li><strong>n8n Cloud Pro:</strong> ~520 MAD/month</li><li><strong>Make Pro:</strong> ~190 MAD/month</li><li><strong>Zapier Professional:</strong> ~510 MAD/month (2,000 tasks only)</li></ul><h2>Best for AI workflows in 2026?</h2><p>n8n — native AI Agent nodes, LangChain-style agents, RAG pipelines in 4 nodes.</p><h2>Data sovereignty</h2><p>n8n can run on-prem in Morocco. Make and Zapier store logs in the US.</p><h2>Decision framework</h2><table><thead><tr><th>Scenario</th><th>Pick</th></tr></thead><tbody><tr><td>&gt;1,000 tasks/month, predictable cost</td><td>n8n self-hosted</td></tr><tr><td>Non-technical team, no server</td><td>Make</td></tr><tr><td>50-500 tasks, connector breadth</td><td>Zapier</td></tr><tr><td>AI agents</td><td>n8n</td></tr><tr><td>Data stays in Morocco/EU</td><td>n8n self-hosted</td></tr></tbody></table><p><a href="/contact">Book a free 30-minute audit.</a></p>',
      faq: [
        { q: 'Is n8n really free?', a: 'Self-hosted version is free under fair-code license. You only pay for the server (~6 EUR/month).' },
        { q: 'Do I need a developer to use n8n?', a: 'For 80% of workflows, no. For custom logic and AI agents, some JavaScript helps.' },
        { q: 'Can n8n be hosted inside Morocco?', a: 'Yes, on any Linux VPS or Kubernetes cluster.' },
        { q: 'Which platform has the most integrations?', a: 'Zapier (8,000+), Make (~1,800), n8n (~1,100 native nodes + HTTP Request for any API).' },
        { q: 'How long to migrate from Zapier to n8n?', a: '2-3 weeks for a typical SME with 10-20 zaps.' },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      title: 'Migrating from WordPress to Next.js in 2026: real cost, real timeline, real ROI',
      slug: 'wordpress-to-nextjs-migration-cost-morocco',
      category: 'digital-development',
      lang: 'en',
      authorName: 'Mohamed El Kechchad',
      readingTime: 11,
      publicationDate: new Date('2026-01-19T09:00:00.000Z'),
      image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1600&q=80',
      alternateSlug: 'migration-wordpress-nextjs-cout-maroc',
      excerpt: "A senior dev's honest breakdown of what a WordPress to Next.js migration actually costs a Moroccan SME. Real budgets (45k-180k MAD), realistic timelines (6-12 weeks), and the ROI signals that justify it.",
      text: '<p><strong>TL;DR — A serious WordPress to Next.js migration costs between 45,000 and 180,000 MAD and takes 6-12 weeks.</strong> The biggest ROI driver is mobile speed: Next.js routinely cuts LCP from ~3.5s to under 1s, lifting mobile conversion 20-60%.</p><h2>Why move?</h2><p>Migrate when: mobile LCP &gt; 2.5s, plugin costs &gt; 1,000 MAD/month, need custom CMS/AI features, or hacked through a plugin recently.</p><h2>Real costs</h2><table><thead><tr><th>Scope</th><th>Budget (MAD)</th><th>Timeline</th></tr></thead><tbody><tr><td>Brochure (5-25 pages)</td><td>45,000-75,000</td><td>5-7 weeks</td></tr><tr><td>Brochure + blog</td><td>70,000-110,000</td><td>7-10 weeks</td></tr><tr><td>+ custom flows</td><td>110,000-160,000</td><td>9-12 weeks</td></tr><tr><td>Headless e-commerce</td><td>140,000-220,000+</td><td>10-16 weeks</td></tr></tbody></table><h2>Conversion lift</h2><ul><li>Mobile LCP: 3.5s to 0.9s</li><li>Mobile conversion: +38% median</li><li>Organic clicks: +24% median over 90 days</li><li>Hosting costs: -60% to -85%</li></ul><h2>SEO risk</h2><p>Controllable with proper 301 redirects and on-page signal parity. 9/11 of our migrations were flat-to-up at day 30.</p><p><a href="/contact">Free 30-minute audit, fixed price.</a></p>',
      faq: [
        { q: 'Do I have to rewrite my content?', a: 'No. Content moves to a headless CMS, stays editable for your team.' },
        { q: 'Will I lose my Google rankings?', a: 'Not if redirects are mapped correctly. 9/11 of our migrations were positive at day 30.' },
        { q: 'How much will hosting cost after?', a: '0-400 MAD/month on Vercel, replacing 1,500-4,000 MAD/month on managed WordPress.' },
        { q: 'Can my team still update the website?', a: 'Yes — headless CMS gives editors a UI similar to WordPress.' },
        { q: 'Can migration be done in phases?', a: 'Yes, we often run hybrid for 4-8 weeks with reverse proxy.' },
      ],
      createdAt: now,
      updatedAt: now,
    },
  ];
}
