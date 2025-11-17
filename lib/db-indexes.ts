import { getDatabase } from './mongodb';
import type { IndexDescriptionInfo } from 'mongodb';

/**
 * Ensure MongoDB indexes are created
 * Should be called once on app startup
 */
export async function ensureIndexes(): Promise<boolean> {
  try {
    const db = await getDatabase();

    // Create all indexes in parallel for better performance
    await Promise.all([
      // Projects collection indexes
      db.collection('projects').createIndex(
        { slug: 1 },
        { unique: true, name: 'slug_unique', background: true }
      ),
      db.collection('projects').createIndex(
        { category: 1, order: 1, createdAt: -1 },
        { name: 'category_order_created', background: true }
      ),
      db.collection('projects').createIndex(
        { featured: 1, order: 1 },
        { name: 'featured_order', background: true }
      ),
      db.collection('projects').createIndex(
        { categorySlug: 1, order: 1 },
        { name: 'categorySlug_order', background: true }
      ),

      // Testimonials collection indexes
      db.collection('testimonials').createIndex(
        { createdAt: -1 },
        { name: 'testimonials_created', background: true }
      ),

      // Messages/Contacts collection indexes
      db.collection('contacts').createIndex(
        { status: 1, createdAt: -1 },
        { name: 'contacts_status_created', background: true }
      ),
      db.collection('contacts').createIndex(
        { createdAt: -1 },
        { name: 'contacts_created', background: true }
      ),
      db.collection('contacts').createIndex(
        { email: 1 },
        { name: 'contacts_email', background: true }
      ),

      // Pricing plans collection indexes
      db.collection('pricing_plans').createIndex(
        { price: 1 },
        { name: 'pricing_price', background: true }
      ),
      db.collection('pricing_plans').createIndex(
        { popular: 1, price: 1 },
        { name: 'pricing_popular', background: true }
      ),

      // Orders collection indexes
      db.collection('orders').createIndex(
        { orderNumber: 1 },
        { unique: true, name: 'orderNumber_unique', background: true }
      ),
      db.collection('orders').createIndex(
        { status: 1, createdAt: -1 },
        { name: 'orders_status_created', background: true }
      ),
      db.collection('orders').createIndex(
        { email: 1, createdAt: -1 },
        { name: 'orders_email', background: true }
      ),
    ]);

    console.log('✅ All database indexes created successfully');
    return true;
  } catch (error) {
    // Check if error is due to existing indexes
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️ Indexes already exist');
        return true;
      }
    }
    
    console.error('❌ Error creating indexes:', error);
    return false;
  }
}

/**
 * Helper to ensure indexes exist (safe to call multiple times)
 * Won't throw errors if indexes already exist
 */
export async function ensureIndexesSafe(): Promise<void> {
  try {
    await ensureIndexes();
  } catch (error) {
    console.warn('⚠️ Index creation encountered an error (non-critical):', error);
  }
}

/**
 * List all existing indexes for a collection (useful for debugging)
 */
export async function listIndexes(collectionName: string): Promise<IndexDescriptionInfo[]> {
  try {
    const db = await getDatabase();
    const indexes = await db.collection(collectionName).indexes();
    console.log(`📋 Indexes for ${collectionName}:`, indexes);
    return indexes;
  } catch (error) {
    console.error(`❌ Error listing indexes for ${collectionName}:`, error);
    return [];
  }
}

/**
 * Drop all indexes for a collection (use with caution!)
 */
export async function dropAllIndexes(collectionName: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    await db.collection(collectionName).dropIndexes();
    console.log(`🗑️ All indexes dropped for ${collectionName}`);
    return true;
  } catch (error) {
    console.error(`❌ Error dropping indexes for ${collectionName}:`, error);
    return false;
  }
}