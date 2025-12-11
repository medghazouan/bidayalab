
require('dotenv').config({ path: '.env.local' });
const { MongoClient, ObjectId } = require('mongodb');

const projectData = {
    _id: new ObjectId("6751a2b3c4d5e6f7a8b9c0d2"),
    title: "HealthHub - Patient Management Platform",
    slug: "healthhub-patient-management",
    description: "A comprehensive healthcare platform that streamlines patient management, appointment scheduling, and medical record management with real-time notifications and secure data handling.",
    category: "digital-development",
    client: "HealthHub Medical Group",
    year: "2024",
    duration: "12 weeks",
    image: "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
    images: [
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1763023533/ecom-2_ejbmbk.jpg"
    ],
    technologies: [
        "Next.js 14",
        "TypeScript",
        "PostgreSQL",
        "Prisma ORM",
        "Tailwind CSS",
        "Node.js",
        "Socket.io",
        "AWS S3",
        "Stripe API"
    ],
    featured: true,
    order: 2,
    status: "published",
    liveUrl: "https://healthhub-demo.com",
    challenge: "The medical group was struggling with fragmented systems—patient records were scattered across multiple platforms, appointment scheduling was manual and error-prone, and staff spent hours on administrative tasks instead of patient care. They needed a unified, secure, HIPAA-compliant solution.",
    solution: "We developed a full-stack web application with role-based access control, automated appointment reminders via SMS/email, electronic health records (EHR) integration, real-time chat between patients and doctors, and an analytics dashboard for insights. The system reduced administrative workload by 65%.",
    features: [
        "Secure patient authentication with 2FA",
        "Real-time appointment scheduling & calendar sync",
        "Electronic Health Records (EHR) management",
        "Automated SMS & email notifications",
        "Video consultation integration (Zoom API)",
        "Prescription management & refill requests",
        "Insurance verification & billing",
        "Analytics dashboard with custom reports",
        "Mobile-responsive design for all devices",
        "HIPAA-compliant data encryption",
        "Multi-language support (English, Spanish, French)"
    ],
    createdAt: new Date("2024-02-10T10:00:00.000Z"),
    updatedAt: new Date("2024-02-10T10:00:00.000Z")
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
        const collection = db.collection('works');

        // Replace the project to ensure exact match
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
