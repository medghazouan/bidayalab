/**
 * Seed script for the BidayaLab blog collection.
 *
 * - Connects to the MongoDB instance defined by MONGODB_URI.
 * - Deletes ALL existing posts in the `blogs` collection (destructive).
 * - Inserts the 12 hand-written posts from `scripts/blog-content/`.
 *
 * Usage:
 *   MONGODB_URI="mongodb+srv://..." npx tsx scripts/seed-blogs.ts
 *
 * Or with the project's existing dotenv pattern (reads from .env.local):
 *   npx tsx scripts/seed-blogs.ts
 *
 * This is intentionally destructive — review BLOG_POSTS in
 * scripts/blog-content/index.ts before running on production.
 */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { BLOG_POSTS } from './blog-content';

dotenv.config({ path: '.env.local' });

async function seedBlogs() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not set. Aborting.');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('▶ Connecting to MongoDB...');
    await client.connect();
    const db = client.db();
    const collection = db.collection('blogs');

    console.log(`▶ Connected. Current blogs collection holds ${await collection.countDocuments()} document(s).`);

    // Destructive wipe — only run intentionally.
    const wipe = await collection.deleteMany({});
    console.log(`▶ Deleted ${wipe.deletedCount} existing post(s).`);

    // Insert the 12 hand-written posts.
    const now = new Date();
    const docs = BLOG_POSTS.map((p) => ({
      title: p.title,
      slug: p.slug,
      image: p.image,
      publicationDate: new Date(p.publicationDate),
      category: p.category,
      text: p.text.trim(),
      excerpt: p.excerpt,
      lang: p.lang,
      alternateSlug: p.alternateSlug,
      faq: p.faq,
      authorName: p.authorName,
      readingTime: p.readingTime,
      createdAt: now,
      updatedAt: now,
    }));

    const result = await collection.insertMany(docs);
    console.log(`▶ Inserted ${result.insertedCount} new post(s).`);

    // Quick summary.
    const enCount = await collection.countDocuments({ lang: 'en' });
    const frCount = await collection.countDocuments({ lang: 'fr' });
    console.log(`▶ EN posts: ${enCount} · FR posts: ${frCount}`);
    console.log('✓ Seed completed.');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedBlogs();
