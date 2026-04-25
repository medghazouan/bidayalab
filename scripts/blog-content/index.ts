/**
 * Aggregated blog content for the seed script.
 * Run: `MONGODB_URI=... npx tsx scripts/seed-blogs.ts`
 *
 * 6 English posts.
 *   FR translations are pre-written in the same files (post0X_fr) but NOT
 *   seeded yet — the live site is English-only in this round. When the FR
 *   locale ships, add the `_fr` exports to BLOG_POSTS below.
 *
 * Each post is AEO-optimized (TL;DR snippet → Q&A H2s → table → FAQ block).
 */
import { post01_en } from './01-n8n-vs-make-vs-zapier';
import { post02_en } from './02-wordpress-to-nextjs';
import { post03_en } from './03-shopify-hydrogen-vs-theme';
import { post04_en } from './04-practical-ai-guide';
import { post05_en } from './05-website-cost-morocco-2026';
import { post06_en } from './06-core-web-vitals-2026';
import type { SeedBlog } from './types';

export const BLOG_POSTS: SeedBlog[] = [
  post01_en,
  post02_en,
  post03_en,
  post04_en,
  post05_en,
  post06_en,
];

export type { SeedBlog } from './types';
