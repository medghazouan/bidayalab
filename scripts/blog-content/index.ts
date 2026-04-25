/**
 * Aggregated blog content for the seed script.
 * Run: `MONGODB_URI=... npx tsx scripts/seed-blogs.ts`
 *
 * 12 posts total: 6 EN + 6 FR (the same 6 topics translated).
 *
 * Each post is AEO-optimized (TL;DR snippet -> Q&A H2s -> table -> FAQ block).
 */
import { post01_en, post01_fr } from './01-n8n-vs-make-vs-zapier';
import { post02_en, post02_fr } from './02-wordpress-to-nextjs';
import { post03_en, post03_fr } from './03-shopify-hydrogen-vs-theme';
import { post04_en, post04_fr } from './04-practical-ai-guide';
import { post05_en, post05_fr } from './05-website-cost-morocco-2026';
import { post06_en, post06_fr } from './06-core-web-vitals-2026';
import type { SeedBlog } from './types';

export const BLOG_POSTS: SeedBlog[] = [
  post01_en,
  post01_fr,
  post02_en,
  post02_fr,
  post03_en,
  post03_fr,
  post04_en,
  post04_fr,
  post05_en,
  post05_fr,
  post06_en,
  post06_fr,
];

export type { SeedBlog } from './types';
