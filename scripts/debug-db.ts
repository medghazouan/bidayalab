import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function debugDb() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        if (!db) {
            throw new Error("Database connection failed");
        }

        const collections = await db.listCollections().toArray();

        console.log('\nCollections found:');
        for (const collection of collections) {
            const count = await db.collection(collection.name).countDocuments();
            console.log(`- ${collection.name}: ${count} documents`);

            if (count > 0 && (collection.name.toLowerCase().includes('contact') || collection.name.toLowerCase().includes('message'))) {
                const sample = await db.collection(collection.name).findOne();
                console.log('  Sample document:', sample);
            }
        }

        await mongoose.disconnect();
        console.log('\nDisconnected');
    } catch (error) {
        console.error('Error:', error);
    }
}

debugDb();
