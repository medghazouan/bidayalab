import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog — Insights digitaux & stratégie IA | BidayaLab',
  description:
    "Plongées concrètes sur l'automatisation IA, n8n, Next.js, Shopify Hydrogen et Core Web Vitals — par une agence senior de Marrakech.",
  alternates: {
    canonical: 'https://www.bidayalab.com/fr/blogs',
    languages: {
      en: 'https://www.bidayalab.com/blogs',
      fr: 'https://www.bidayalab.com/fr/blogs',
    },
  },
  openGraph: {
    title: 'Blog BidayaLab — Insights digitaux',
    description:
      'IA, automatisation, Next.js, Hydrogen, Core Web Vitals. Par une agence senior de Marrakech.',
    url: 'https://www.bidayalab.com/fr/blogs',
    locale: 'fr_FR',
    type: 'website',
  },
};

interface BlogIndexEntry {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  publicationDate?: string;
  updatedAt?: string;
  category?: string;
  image?: string;
  authorName?: string;
  lang?: string;
}

function resolveImageUrl(image?: string): string {
  if (!image) return '/images/placeholder.jpg';
  if (image.startsWith('http')) return image;
  if (image.startsWith('/')) return image;
  return `/uploads/${image}`;
}

export default async function FrenchBlogsPage() {
  const { data } = await getBlogs('all');
  const all: BlogIndexEntry[] = Array.isArray(data) ? data : [];
  const blogs = all.filter((b) => b.lang === 'fr');

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'BidayaLab Editorial — édition française',
    url: 'https://www.bidayalab.com/fr/blogs',
    inLanguage: 'fr-FR',
    publisher: { '@id': 'https://www.bidayalab.com/#organization' },
    blogPost: blogs.slice(0, 20).map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      url: `https://www.bidayalab.com/fr/blogs/${b.slug}`,
      datePublished: b.publicationDate,
      dateModified: b.updatedAt || b.publicationDate,
      image: b.image,
      articleSection: b.category,
      inLanguage: 'fr-FR',
      author: b.authorName
        ? { '@type': 'Person', name: b.authorName }
        : { '@id': 'https://www.bidayalab.com/#organization' },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.bidayalab.com/fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.bidayalab.com/fr/blogs' },
    ],
  };

  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-[#050505] text-zinc-300 selection:bg-[#beff01] selection:text-black overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div
        aria-hidden
        className="absolute -top-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.12] blur-[120px] pointer-events-none"
        style={{ background: '#beff01' }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <section className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-40 md:pt-44 pb-24">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#beff01]">
            FR // BLOG
          </span>
          <span className="h-px w-12 bg-white/30" />
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-white/60">
            Marrakech
          </span>
        </div>

        <h1
          className="font-louis font-black uppercase tracking-tighter text-white leading-[0.85]"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
        >
          Insights <span className="text-[#beff01]">digitaux</span>
        </h1>
        <p className="mt-6 text-zinc-400 text-lg max-w-2xl">
          Plongées concrètes — automatisation IA, n8n, Next.js, Shopify
          Hydrogen, Core Web Vitals. Par les opérateurs seniors de BidayaLab.
        </p>

        {blogs.length === 0 ? (
          <div className="mt-16 border border-white/10 bg-zinc-950/40 p-8 max-w-2xl">
            <p className="text-zinc-300">
              Les articles français sont en cours de publication. En attendant,
              vous pouvez lire la version anglaise du blog.
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-flex items-center gap-2 text-[#beff01] hover:underline font-mono text-[11px] tracking-[0.18em] uppercase"
            >
              Voir le blog en anglais →
            </Link>
          </div>
        ) : (
          <ul className="mt-16 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {blogs.map((post) => (
              <li key={post.slug} className="bg-[#050505]">
                <Link
                  href={`/fr/blogs/${post.slug}`}
                  className="group flex flex-col h-full transition-colors"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={resolveImageUrl(post.image)}
                      alt={post.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      sizes="(min-width:768px) 50vw, 100vw"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#beff01] text-black text-[10px] tracking-[0.2em] uppercase font-louis font-bold">
                      {post.category || 'Article'}
                    </span>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col gap-3">
                    <h2 className="font-louis font-black uppercase tracking-tight text-white text-xl md:text-2xl leading-tight group-hover:text-[#beff01] transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                      <span>
                        {post.publicationDate
                          ? new Date(post.publicationDate).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : ''}
                      </span>
                      <span className="text-[#beff01]">Lire →</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
