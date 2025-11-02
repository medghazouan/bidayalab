import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;

// Optimized connection pool configuration
const options: MongoClientOptions = {
  maxPoolSize: 50, // Maximum number of connections in the pool
  minPoolSize: 5, // Minimum number of connections
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
  connectTimeoutMS: 10000, // Timeout after 10 seconds
  serverSelectionTimeoutMS: 10000, // Timeout for server selection
  socketTimeoutMS: 45000, // Socket timeout
  retryWrites: true, // Enable retry writes
  retryReads: true, // Enable retry reads
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
