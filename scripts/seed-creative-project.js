
require('dotenv').config({ path: '.env.local' });
const { MongoClient, ObjectId } = require('mongodb');

const projectData = {
    _id: new ObjectId("6751a2b3c4d5e6f7a8b9c0d1"),
    title: "TechFlow Brand Identity & Design System",
    slug: "techflow-brand-identity",
    description: "Complete brand transformation for a SaaS startup, including logo design, brand guidelines, and a comprehensive design system for digital and print applications.",
    category: "creative-studio",
    client: "TechFlow Inc.",
    year: "2024",
    duration: "6 weeks",
    image: "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
    images: [
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/cuisine_a9qwr6.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/cuisine_a9qwr6.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/cuisine_a9qwr6.jpg"
    ],
    technologies: [
        "Adobe Illustrator",
        "Figma",
        "Adobe Photoshop",
        "After Effects",
        "Procreate"
    ],
    featured: true,
    order: 1,
    status: "published",
    brandColors: [
        "#FD79A8",
        "#00B894",
        "#FD79A8",
        "#FDCB6E",
        "#2D3436"
    ],
    deliverables: [
        "Primary Logo + 5 Variations",
        "Brand Guidelines (45 pages)",
        "Color Palette & Typography System",
        "Business Card & Letterhead Design",
        "50+ Social Media Templates",
        "Website UI Design",
        "Email Signature Templates",
        "Brand Animation (10 seconds)"
    ],
    brandStrategy: "We created a modern, tech-forward identity that balances professionalism with approachability. The color palette combines trust-inspiring blues with energetic accent colors to reflect innovation and reliability.",
    createdAt: new Date("2024-01-15T10:00:00.000Z"),
    updatedAt: new Date("2024-01-15T10:00:00.000Z")
};

async function seed() {
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI not found in environment variables');
        process.exit(1);
    }

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('works'); // Using 'works' collection as per previous update

        // Replace the project to ensure exact match (removing fields if needed)
        const result = await collection.replaceOne(
            { _id: projectData._id },
            projectData,
            { upsert: true }
        );

        console.log(`✅ Project seeded successfully. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`);

    } catch (error) {
        console.error('❌ Error seeding project:', error);
    } finally {
        await client.close();
    }
}

seed();
