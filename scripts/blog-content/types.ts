/**
 * Shared types for the blog seed content.
 * Keep in sync with `models/Blog.ts` (IBlog).
 */
export type BlogCategory =
  | 'ai-automation'
  | 'digital-development'
  | 'digital-marketing'
  | 'creative-studio'
  | 'visual-storytelling';

export type BlogLang = 'en' | 'fr';

export type SeedBlog = {
  title: string;
  slug: string;
  /** Slug of the same article in the other language. Used for hreflang alternates. */
  alternateSlug: string;
  lang: BlogLang;
  category: BlogCategory;
  excerpt: string;
  image: string;
  /** ISO date string. */
  publicationDate: string;
  authorName: string;
  /** Estimated reading time in minutes. */
  readingTime: number;
  /** Full HTML body (rendered via dangerouslySetInnerHTML on the post page). */
  text: string;
  /** Q&A surfaced as FAQPage JSON-LD on the post page. */
  faq: Array<{ q: string; a: string }>;
};
