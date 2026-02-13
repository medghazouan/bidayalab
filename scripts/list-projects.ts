import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

async function listProjects() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Missing MONGODB_URI");

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db();

        console.log("Connected. Listing projects:");
        const projects = await db.collection('projects').find({}, { projection: { title: 1, category: 1 } }).toArray();

        console.table(projects.map(p => ({ title: p.title, category: p.category })));

        const categories = [...new Set(projects.map(p => p.category))];
        console.log("Categories found:", categories);

    } finally {
        await client.close();
    }
}

listProjects().catch(console.error);
