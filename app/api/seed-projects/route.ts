import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const db = await getDatabase();

        // 1. Clear existing projects
        await db.collection('projects').deleteMany({});

        // 2. Define New Data Structure
        const projects = [

            // --- WEB DEVELOPMENT ---
            {
                _id: new ObjectId(),
                category: "web_development",
                title: "AgriFlow Dashboard",
                slug: "agriflow-dashboard",
                clientName: "GreenTech Solutions",
                isConfidential: false,
                industry: "AgriTech",
                status: "published",
                featured: true,
                completedAt: new Date("2024-05-15"),
                summary: "IoT-based crop management system for vertical farms.",
                description: "AgriFlow solves the problem of data fragmentation in vertical farming. By unifying sensor data from humidity, temperature, and soil moisture sensors into a single real-time dashboard, we enabled farm operators to predict yield with 95% accuracy.",
                challenge: "Vertical farms struggle with manual monitoring of thousands of sensors, leading to preventable crop waste.",
                solution: "We built a centralized dashboard that ingests millions of data points via MQTT to automate climate control.",
                result: "Reduced water usage by 25% and increased crop yield by 15%.",
                thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2670&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1595841055318-943e157b6059?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2564&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2696&auto=format&fit=crop"
                ],
                techStack: ["Next.js 14", "TypeScript", "Python", "TensorFlow Lite", "PostgreSQL"],
                liveUrl: "https://agriflow-demo.com",
                testimonial: {
                    quote: "The dashboard gave us visibility we never thought possible. It paid for itself in two months.",
                    author: { name: "Sarah Jenkins", role: "CTO, GreenTech" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new ObjectId(),
                category: "web_development",
                title: "MetroPulse App",
                slug: "metropulse-app",
                clientName: "City of Neo-Tokyo",
                isConfidential: false,
                industry: "Urban Tech",
                status: "published",
                featured: true,
                completedAt: new Date("2025-01-10"),
                summary: "Real-time smart city transit visualization for commuters.",
                description: "MetroPulse aggregates real-time data from 10,000+ IoT sensors across the city's transit network to give commuters an exact pulse on train loads, delays, and optimal routes.",
                challenge: "Commuters faced unpredictable delays and overcrowding with no real-time transparency.",
                solution: "We built a mobile-first experience using Mapbox GL and WebSockets for sub-second updates.",
                result: "Daily active users grew to 500k within 3 months of launch.",
                thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=2680&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1496450681664-3df85efbd569?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1519671260920-6da09e3e7f4c?q=80&w=2672&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=2670&auto=format&fit=crop"
                ],
                techStack: ["React Native", "Mapbox", "Redis", "Golang"],
                liveUrl: "https://metropulse.city",
                testimonial: {
                    quote: "Finally, a transit app that actually works in real-time. It completely changed how our city moves.",
                    author: { name: "Kenji Sato", role: "Head of Infrastructure" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new ObjectId(),
                category: "web_development",
                title: "VaultX Exchange",
                slug: "vaultx-exchange",
                clientName: "VaultX DAO",
                isConfidential: true,
                industry: "FinTech",
                status: "published",
                featured: false,
                completedAt: new Date("2024-11-20"),
                summary: "Secure decentralized trading platform for institutional assets.",
                description: "A banking-grade DeFi interface designed for institutional investors who require audit trails, multi-sig security, and high-frequency trading capabilities.",
                challenge: "Institutional investors lacked a compliant, secure interface for decentralized finance.",
                solution: "We implemented a zero-knowledge proof identity layer on top of a standard DEX.",
                result: "Processed $500M in volume in Q4 2024 with zero security incidents.",
                thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?q=80&w=2680&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?q=80&w=2680&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1639843885527-43827ee64889?q=80&w=2532&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2664&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1622630998477-20aa696fab05?q=80&w=2746&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                ],
                techStack: ["Solidity", "Next.js", "The Graph", "IPFS"],
                liveUrl: "https://vaultx.io",
                testimonial: {
                    quote: "Security was our #1 concern. This architecture is bulletproof.",
                    author: { name: "Alex R.", role: "Security Auditor" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },


            // --- AI AUTOMATION ---
            {
                _id: new ObjectId(),
                category: "ai_automation",
                title: "LegalMind AI",
                slug: "legalmind-ai",
                clientName: "Pearson & Specter",
                isConfidential: false,
                industry: "Legal Tech",
                status: "published",
                featured: true,
                completedAt: new Date("2025-02-01"),
                summary: "Contract analysis agent for corporate law firms.",
                description: "LegalMind is an autonomous agent that pre-screens NDAs and service agreements. It uses a fine-tuned LLM to flag risky clauses and suggest redlines based on the firm's playbook.",
                challenge: "Associates spend 40% of their time reviewing low-value standard contracts manually.",
                solution: "Constructed a RAG pipeline using LangChain and a vector database of 50k legal precedents.",
                result: "Reduced contract review time by 85%, saving approx. 20 hours per associate week.",
                thumbnail: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=2671&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=2671&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1555432384-22c60c874402?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1526304640152-d292a39d9512?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1662947231454-04be36173004?q=80&w=2532&auto=format&fit=crop"
                ],
                aiTools: ["GPT-4-Turbo", "LangChain", "Pinecone", "Python"],
                testimonial: {
                    quote: "It's like having a senior partner review every clause instantly. Indispensable.",
                    author: { name: "Jessica Pearson", role: "Managing Partner" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new ObjectId(),
                category: "ai_automation",
                title: "MediScan Assistant",
                slug: "mediscan-assistant",
                clientName: "General Hospital",
                isConfidential: true,
                industry: "Healthcare",
                status: "published",
                featured: true,
                completedAt: new Date("2024-09-15"),
                summary: "Radiology pre-screening tool for rapid triage.",
                description: "An AI-powered diagnostic aid that scans X-rays and MRI feeds in real-time to flag critical anomalies like fractures or tumors for immediate radiologist review.",
                challenge: "Radiology backlogs meant patients waited days for critical results.",
                solution: "Trained a custom computer vision model on a dataset of 100k annotated scans.",
                result: "Reduced critical diagnosis turnaround time from 48 hours to 2 hours.",
                thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=2670&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1576091160550-21878bf971e5?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2564&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2652&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1584036561566-b93fa7a80601?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2680&auto=format&fit=crop"
                ],
                aiTools: ["PyTorch", "EfficientNet", "DICOM"],
                testimonial: {
                    quote: "Speed saves lives. This tool gives our radiologists superpowers.",
                    author: { name: "Dr. Gregory H.", role: "Chief of Radiology" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new ObjectId(),
                category: "ai_automation",
                title: "RetailGenie",
                slug: "retail-genie",
                clientName: "Shopify Plus Brands",
                isConfidential: false,
                industry: "E-Commerce",
                status: "published",
                featured: false,
                completedAt: new Date("2024-12-05"),
                summary: "Personalized shopping concierge for e-commerce brands.",
                description: "Unlike standard chatbots, RetailGenie remembers user preferences, size, and style constraints to recommend products just like a human store associate.",
                challenge: "Generic chatbots frustrate users and fail to drive conversions.",
                solution: "Implemented a memory-aware conversational agent using OpenAI Assistants API.",
                result: "Increased conversion rate by 22% for interacting users.",
                thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1472851294608-4151057e934d?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1555421689-4922181b30ac?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2672&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=2670&auto=format&fit=crop"
                ],
                aiTools: ["OpenAI API", "Node.js", "Redis"],
                testimonial: {
                    quote: "Our customers love it, and our sales numbers prove it works.",
                    author: { name: "Marcus L.", role: "E-com Director" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },


            // --- VISUAL STORYTELLING ---
            {
                _id: new ObjectId(),
                category: "visual_storytelling",
                title: "Dune: Origins",
                slug: "dune-origins",
                clientName: "Warner Bros",
                isConfidential: false,
                industry: "Entertainment",
                status: "published",
                featured: true,
                completedAt: new Date("2024-03-20"),
                summary: "Cinematic behind-the-scenes documentary.",
                description: "A visceral look into the stunt coordination and practical effects of the Dune production. We lived with the stunt team in the desert for 3 weeks.",
                challenge: "Documenting the massive scale of production without interfering with the main unit.",
                solution: "Utilized long-lens cinematography and stealth rigging to capture candid moments.",
                result: "Garnered 2M views on YouTube in first week.",
                thumbnail: "https://images.unsplash.com/photo-1547234935-80c7142ea969?q=80&w=2674&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1547234935-80c7142ea969?q=80&w=2674&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1460359727763-84728562479f?q=80&w=2000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=2574&auto=format&fit=crop"
                ],
                productionRole: "Director & DP",
                caseStudyUrl: "#",
                testimonial: {
                    quote: "They found the story within the chaos. A masterpiece of documentary filmmaking.",
                    author: { name: "Denis V.", role: "Director" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new ObjectId(),
                category: "visual_storytelling",
                title: "CyberLife Campaign",
                slug: "cyberlife-campaign",
                clientName: "Balenciaga",
                isConfidential: false,
                industry: "Fashion",
                status: "published",
                featured: true,
                completedAt: new Date("2024-10-31"),
                summary: "Futuristic neon-noir fashion commercial.",
                description: "A mixed-reality commercial blending physical models with a virtually generated cyberpunk city using Unreal Engine 5.",
                challenge: "Blending physical models with digital environments seamlessly in real-time.",
                solution: "Used an LED Volume stage (Virtual Production) for perfect lighting integration.",
                result: "Viral campaign with highest engagement metrics of the season.",
                thumbnail: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2581&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2581&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1605218427306-635ba2439af2?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2620&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1614726365723-49faaa5bf3c6?q=80&w=2535&auto=format&fit=crop"
                ],
                productionRole: "VFX Supervisor",
                liveUrl: "https://youtube.com", // Placeholder
                testimonial: {
                    quote: "Visually stunning. Captured the exact noir aesthetic we were aiming for.",
                    author: { name: "Demna G.", role: "Creative Director" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new ObjectId(),
                category: "visual_storytelling",
                title: "Blue Horizon",
                slug: "blue-horizon",
                clientName: "OceanX",
                isConfidential: false,
                industry: "Non-Profit",
                status: "published",
                featured: false,
                completedAt: new Date("2024-06-08"),
                summary: "Ocean conservation impact film.",
                description: "An emotionally charged short film about coral bleaching events in the Great Barrier Reef.",
                challenge: "Filming bleaching events that only happen for a few days a year underwater.",
                solution: "Rapid deploy team stationed on a research vessel for 3 weeks waiting for the event.",
                result: "Raised $1.5M in donations for reef restoration.",
                thumbnail: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop",
                gallery: [
                    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=2670&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1569263979104-36576f1f3a52?q=80&w=2574&auto=format&fit=crop"
                ],
                productionRole: "Underwater Cinematographer",
                testimonial: {
                    quote: "The footage was heartbreakingly beautiful. It moved our donors to action.",
                    author: { name: "Dr. Sylvia E.", role: "Founder" }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        await db.collection('projects').insertMany(projects);

        return NextResponse.json({ message: "Seed successful", count: projects.length });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
    }
}
