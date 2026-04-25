import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/lib/data';
import BlogPostContent from '../../../blogs/[slug]/BlogPostContent';

type Props = {
  params: Promise<{ slug: string }>;
};

function stripHtml(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
}

function resolveImageUrl(image: string): string {
  if (!image) return 'https://www.bidayalab.com/images/placeholder.jpg';
  if (image.startsWith('http')) return image;
  if (image.startsWith('/')) return `https://www.bidayalab.com${image}`;
  return `https://www.bidayalab.com/uploads/${image}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await getBlogBySlug(slug);
  if (!post) return { title: 'Article introuvable | BidayaLab' };

  const description = post.excerpt || stripHtml(post.text);
  const imageUrl = resolveImageUrl(post.image);

  return {
    title: `${post.title} | BidayaLab Blog`,
    description,
    keywords: [
      post.category,
      'BidayaLab',
      'agence digitale Maroc',
      'agence IA Maroc',
      'agence Next.js Marrakech',
      'blog',
    ],
    openGraph: {
      title: post.title,
      description,
      url: `https://www.bidayalab.com/fr/blogs/${slug}`,
      siteName: 'BidayaLab',
      type: 'article',
      locale: 'fr_FR',
      publishedTime: post.publicationDate,
      modifiedTime: post.updatedAt || post.publicationDate,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.bidayalab.com/fr/blogs/${slug}`,
      languages: post.alternateSlug
        ? {
            fr: `https://www.bidayalab.com/fr/blogs/${slug}`,
            en: `https://www.bidayalab.com/blogs/${post.alternateSlug}`,
          }
        : undefined,
    },
  };
}

export default async function FrenchBlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await getBlogBySlug(slug);
  if (!post) notFound();

  const imageUrl = resolveImageUrl(post.image);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || stripHtml(post.text),
    image: imageUrl,
    datePublished: post.publicationDate,
    dateModified: post.updatedAt || post.publicationDate,
    articleSection: post.category,
    inLanguage: 'fr-FR',
    keywords: [post.category, 'BidayaLab', 'Maroc', 'Marrakech', 'agence digitale'],
    wordCount: post.text ? stripHtml(post.text, 100000).split(/\s+/).length : undefined,
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
    url: `https://www.bidayalab.com/fr/blogs/${slug}`,
    author: post.authorName
      ? {
          '@type': 'Person',
          name: post.authorName,
          worksFor: {
            '@type': 'Organization',
            '@id': 'https://www.bidayalab.com/#organization',
            name: 'BidayaLab',
          },
        }
      : { '@id': 'https://www.bidayalab.com/#organization' },
    publisher: { '@id': 'https://www.bidayalab.com/#organization' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.bidayalab.com/fr/blogs/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.bidayalab.com/fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.bidayalab.com/fr/blogs' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.bidayalab.com/fr/blogs/${slug}` },
    ],
  };

  const faqSchema =
    Array.isArray(post.faq) && post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item: { q: string; a: string }) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <BlogPostContent post={post} />
    </>
  );
}
