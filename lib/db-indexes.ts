// lib/db-indexes.ts
// Utility to ensure MongoDB indexes are created
// This should be called once on app startup or can be run manually

import clientPromise from './mongodb';

export async function ensureIndexes() {
  try {
    const client = await clientPromise;
    const db = client.db('meddigital');

    // Projects collection indexes
    await db.collection('projects').createIndex(
      { slug: 1 },
      { unique: true, name: 'slug_unique' }
    );
    await db.collection('projects').createIndex(
      { category: 1, order: 1, createdAt: -1 },
      { name: 'category_order_created' }
    );
    await db.collection('projects').createIndex(
      { featured: 1 },
      { name: 'featured_index' }
    );
    await db.collection('projects').createIndex(
      { categorySlug: 1, order: 1 },
      { name: 'categorySlug_order' }
    );

    // Testimonials collection indexes
    await db.collection('testimonials').createIndex(
      { createdAt: -1 },
      { name: 'testimonials_created' }
    );

    // Messages/Contacts collection indexes
    await db.collection('contacts').createIndex(
      { status: 1, createdAt: -1 },
      { name: 'contacts_status_created' }
    );
    await db.collection('contacts').createIndex(
      { createdAt: -1 },
      { name: 'contacts_created' }
    );

    // Pricing plans collection indexes
    await db.collection('pricing_plans').createIndex(
      { price: 1 },
      { name: 'pricing_price' }
    );

    // Orders collection indexes
    await db.collection('orders').createIndex(
      { orderNumber: 1 },
      { unique: true, name: 'orderNumber_unique' }
    );
    await db.collection('orders').createIndex(
      { status: 1, createdAt: -1 },
      { name: 'orders_status_created' }
    );

    console.log('✅ All database indexes created successfully');
    return true;
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    // Don't throw - indexes might already exist
    return false;
  }
}

// Helper to ensure indexes exist (safe to call multiple times)
export async function ensureIndexesSafe() {
  try {
    await ensureIndexes();
  } catch (error) {
    // Indexes might already exist, which is fine
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log('ℹ️ Indexes already exist, skipping...');
    }
  }
}

