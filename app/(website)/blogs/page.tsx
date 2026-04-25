import { Metadata } from 'next';
import BlogListingClient from './BlogListingClient';
import { getBlogs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Digital Transformation Insights & AI Strategy | BidayaLab Blog',
  description:
    'Practical deep-dives into AI automation, n8n workflows, Next.js engineering, Shopify Hydrogen, and Core Web Vitals — from a senior agency in Marrakech, Morocco.',
  keywords: [
    'AI automation blog',
    'n8n automation Morocco',
    'Next.js agency Marrakech',
    'Shopify Hydrogen Morocco',
    'Core Web Vitals 2026',
    'digital transformation insights',
    'Morocco tech blog',
    'BidayaLab blog',
  ],
  openGraph: {
    title: 'Digital Transformation Insights & AI Strategy | BidayaLab Blog',
    description:
      'Practical deep-dives into AI automation, n8n workflows, Next.js engineering, Shopify Hydrogen, and Core Web Vitals — from a senior agency in Marrakech.',
    url: 'https://www.bidayalab.com/blogs',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/blogs',
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
}

export default async function BlogPage() {
  // Fetch the blog list at request time so we can emit Blog + ItemList JSON-LD.
  const { data } = await getBlogs('all');
  const blogs: BlogIndexEntry[] = Array.isArray(data) ? data : [];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://www.bidayalab.com/blogs#blog',
    name: 'BidayaLab Editorial',
    description:
      'Practical deep-dives into AI automation, Next.js engineering, Shopify Hydrogen, and Core Web Vitals from BidayaLab — a senior agency in Marrakech, Morocco.',
    url: 'https://www.bidayalab.com/blogs',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.bidayalab.com/#organization',
      name: 'BidayaLab',
      url: 'https://www.bidayalab.com',
    },
    blogPost: blogs.slice(0, 20).map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      url: `https://www.bidayalab.com/blogs/${b.slug}`,
      datePublished: b.publicationDate,
      dateModified: b.updatedAt || b.publicationDate,
      image: b.image,
      articleSection: b.category,
      author: b.authorName
        ? { '@type': 'Person', name: b.authorName }
        : { '@id': 'https://www.bidayalab.com/#organization' },
    })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BidayaLab blog index',
    itemListElement: blogs.slice(0, 20).map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.bidayalab.com/blogs/${b.slug}`,
      name: b.title,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.bidayalab.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.bidayalab.com/blogs',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogListingClient />
    </>
  );
}
