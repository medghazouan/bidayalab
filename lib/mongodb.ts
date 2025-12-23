import { MongoClient, MongoClientOptions, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;

// Optimized connection pool configuration
const options: MongoClientOptions = {
  maxPoolSize: 20, // Reduced from 50 for better resource management
  minPoolSize: 5,
  maxIdleTimeMS: 60000, // Increased to 60s to reduce connection churn
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  retryReads: true,
  compressors: ['snappy', 'zlib'], // Enable compression for better network performance
  family: 4, // Force IPv4 to resolve ENOTFOUND errors on some networks
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let cachedDb: Db | null = null;

// Development: use global to prevent multiple connections during hot reload
if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
    globalWithMongo._mongoClient = client;
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Production: create single connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Helper function to get database instance with caching
export async function getDatabase(dbName: string = 'meddigital'): Promise<Db> {
  if (cachedDb && cachedDb.databaseName === dbName) {
    return cachedDb;
  }

  const client = await clientPromise;
  cachedDb = client.db(dbName);
  return cachedDb;
}

// Health check function
export async function checkConnection(): Promise<boolean> {
  try {
    const client = await clientPromise;
    await client.db('admin').command({ ping: 1 });
    return true;
  } catch (error) {
    console.error('MongoDB connection health check failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function closeConnection(): Promise<void> {
  try {
    const client = await clientPromise;
    await client.close();
    cachedDb = null;
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

export default clientPromise;