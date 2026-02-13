const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');

// Load env vars from the root directory
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
}

// EXACT JSON PROVIDED BY USER
const projectData = {
    "_id": new ObjectId("65d4a1b2c9e78f35baea8812"),
    "category": "visual_storytelling",
    "title": "IlyassFit: Sculpted in Motion",
    "slug": "ilyassfit-sculpted-in-motion",
    "clientName": "IlyassFit",
    "isConfidential": false,
    "industry": "Health & Wellness",
    "status": "published",
    "featured": true,
    "completedAt": new Date("2025-12-15T00:00:00.000Z"),
    "summary": "Defining a premium visual identity for high-performance personal training.",
    "description": "A comprehensive visual campaign designed to elevate the IlyassFit brand from standard gym content to a cinematic lifestyle experience. The project focused on capturing the raw intensity of training sessions combined with the emotional journey of client transformations. We utilized dramatic lighting and high-frame-rate cinematography to emphasize the power and discipline required for real results.",
    "challenge": "The primary challenge was filming in active gym environments with varying lighting conditions while striving for a consistent, moody, and high-contrast 'editorial' aesthetic that separates the brand from generic fitness content.",
    "solution": "We implemented a mobile lighting setup using RGB tube lights to create depth and separation from the background. We shot primarily at 60fps and 120fps to slow down fast-paced movements, highlighting muscle mechanics and the sweat-drenched effort of the athletes. The color grade emphasized deep blacks and vibrant reds to align with the brand's aggressive energy.",
    "result": "The visual campaign led to a 300% increase in Instagram engagement and a direct correlation in high-ticket coaching inquiries. The transformation photos became the cornerstone of the brand's social proof strategy.",
    "thumbnail": "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770969166/DSC07396_w4orrp.jpg",
    "gallery": [
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770965989/contactForm_uhvdye.webp",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770965989/about_ipkogi.webp",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770965988/service_kk4vov.webp",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770965988/contactHero_lotjhk.webp",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770965986/hero-768_enrtst.webp",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968966/DSC07703_ydoe7p.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968967/DSC07734_zgmc6b.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968967/DSC07730_botxjy.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968969/DSC07667_ql08hz.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968968/DSC07688_wm6pw2.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968970/DSC07608_dtvrxy.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968973/DSC07528_xjtvfg.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968973/DSC07587_omauno.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968974/DSC07531_mwgokd.jpg",
        "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968986/DSC07434_irxlce.jpg"
    ],
    "productionRole": "Creative Director & Cinematographer",
    "videoUrl": "https://vimeo.com/1164611099?share=copy&fl=sv&fe=ci",
    "thumbnailUrl": "https://res.cloudinary.com/dbsgzwmf6/image/upload/v1770968969/DSC07648_trjmvq.jpg",
    "testimonial": {
        "quote": "The visuals completely transformed how people see my brand. It's not just workouts anymore; it's a lifestyle that people want to be part of.",
        "author": {
            "name": "Ilyass",
            "role": "Head Coach & Founder"
        }
    },
    "createdAt": new Date("2025-12-20T14:30:00.000Z"),
    "updatedAt": new Date("2025-12-20T14:30:00.000Z")
};

async function seed() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        // Default to 'test' if DB name not in URI, but usually valid URI has it or we specify.
        // Based on previous logs, db might be 'bidayalab'
        const db = client.db('bidayalab');
        const projects = db.collection('projects');

        console.log(`🔌 Connected to database. Updating project...`);

        // Use upsert to insert or update
        const result = await projects.updateOne(
            { _id: projectData._id },
            { $set: projectData },
            { upsert: true }
        );

        console.log(`✅ Project '${projectData.title}' processed.`);
        console.log(`   Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`);

    } catch (error) {
        console.error('❌ Error seeding project:', error);
    } finally {
        await client.close();
    }
}

seed();
