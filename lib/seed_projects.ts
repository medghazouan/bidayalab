import mongoose from 'mongoose';
import Project from '@/models/Project';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// 12 Projects: 4 Web Dev, 4 AI, 4 Visual Storytelling
// Using Unsplash placeholder images for each category
const projects = [
    // ============ WEB DEVELOPMENT (digital-development) ============
    {
        title: 'E-Commerce Platform Redesign',
        slug: 'ecommerce-platform-redesign',
        description: 'Complete e-commerce platform overhaul with modern UI, optimized checkout flow, and 40% faster load times.',
        category: 'digital-development',
        client: 'Fashion Startup',
        year: '2024',
        duration: '3 months',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'MongoDB'],
        featured: true,
        status: 'published',
        order: 1,
        liveUrl: 'https://example.com',
        features: ['Custom checkout', 'Real-time inventory', 'Multi-currency support'],
        challenge: 'Legacy codebase with poor performance',
        solution: 'Full rewrite with modern stack and performance optimization',
    },
    {
        title: 'SaaS Dashboard Application',
        slug: 'saas-dashboard-application',
        description: 'Feature-rich analytics dashboard with real-time data visualization and user management.',
        category: 'digital-development',
        client: 'Tech Startup',
        year: '2024',
        duration: '4 months',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        images: [],
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
        featured: true,
        status: 'published',
        order: 2,
        liveUrl: 'https://example.com',
        features: ['Real-time analytics', 'Role-based access', 'Custom reports'],
        challenge: 'Complex data visualization requirements',
        solution: 'Custom chart components with optimized rendering',
    },
    {
        title: 'Healthcare Booking Portal',
        slug: 'healthcare-booking-portal',
        description: 'Patient management system with appointment scheduling, telemedicine integration, and medical records.',
        category: 'digital-development',
        client: 'Medical Clinic',
        year: '2024',
        duration: '5 months',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Twilio', 'AWS'],
        featured: true,
        status: 'published',
        order: 3,
        liveUrl: 'https://example.com',
        features: ['Video consultations', 'Prescription management', 'Insurance integration'],
        challenge: 'HIPAA compliance and data security',
        solution: 'End-to-end encryption with compliant infrastructure',
    },
    {
        title: 'Real Estate Marketplace',
        slug: 'real-estate-marketplace',
        description: 'Property listing platform with virtual tours, mortgage calculator, and agent dashboards.',
        category: 'digital-development',
        client: 'Property Agency',
        year: '2024',
        duration: '4 months',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Next.js', 'Mapbox', 'Cloudinary', 'MongoDB', 'Vercel'],
        featured: true,
        status: 'published',
        order: 4,
        liveUrl: 'https://example.com',
        features: ['360° virtual tours', 'Advanced search filters', 'Agent CRM'],
        challenge: 'Large image assets and map performance',
        solution: 'Progressive loading with CDN optimization',
    },

    // ============ AI & AUTOMATION (ai-automation) ============
    {
        title: 'AI Customer Support Bot',
        slug: 'ai-customer-support-bot',
        description: 'Intelligent chatbot handling 80% of customer inquiries automatically with multi-language support.',
        category: 'ai-automation',
        client: 'E-commerce Brand',
        year: '2024',
        duration: '2 months',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        images: [],
        technologies: ['OpenAI GPT-4', 'LangChain', 'Python', 'FastAPI'],
        featured: true,
        status: 'published',
        order: 5,
        aiModels: ['GPT-4', 'Custom Fine-tuned Model'],
        automationType: 'Customer Service Automation',
        integrations: ['Zendesk', 'Shopify', 'Slack'],
        workflowDescription: 'Automated ticket routing and response generation',
        timeSaved: '40 hours/week',
    },
    {
        title: 'Document Processing Pipeline',
        slug: 'document-processing-pipeline',
        description: 'Automated document extraction and classification system processing 10,000+ documents daily.',
        category: 'ai-automation',
        client: 'Legal Firm',
        year: '2024',
        duration: '3 months',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Python', 'AWS Textract', 'OpenAI', 'PostgreSQL'],
        featured: true,
        status: 'published',
        order: 6,
        aiModels: ['Claude 3', 'AWS Textract'],
        automationType: 'Document Processing',
        integrations: ['Dropbox', 'Google Drive', 'Salesforce'],
        workflowDescription: 'Automated OCR, classification, and data extraction',
        timeSaved: '60 hours/week',
    },
    {
        title: 'Sales Lead Scoring System',
        slug: 'sales-lead-scoring-system',
        description: 'ML-powered lead qualification system increasing conversion rates by 35%.',
        category: 'ai-automation',
        client: 'B2B SaaS Company',
        year: '2024',
        duration: '2 months',
        image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Python', 'Scikit-learn', 'HubSpot API', 'PostgreSQL'],
        featured: true,
        status: 'published',
        order: 7,
        aiModels: ['Custom ML Model', 'GPT-4 for insights'],
        automationType: 'Sales Automation',
        integrations: ['HubSpot', 'Salesforce', 'Slack'],
        workflowDescription: 'Automatic lead scoring and priority routing',
        timeSaved: '20 hours/week',
    },
    {
        title: 'Content Generation Workflow',
        slug: 'content-generation-workflow',
        description: 'AI-powered content creation system generating SEO-optimized articles and social media posts.',
        category: 'ai-automation',
        client: 'Marketing Agency',
        year: '2024',
        duration: '1 month',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
        images: [],
        technologies: ['OpenAI GPT-4', 'Zapier', 'Airtable', 'Buffer'],
        featured: true,
        status: 'published',
        order: 8,
        aiModels: ['GPT-4', 'DALL-E 3'],
        automationType: 'Content Automation',
        integrations: ['WordPress', 'Buffer', 'Airtable'],
        workflowDescription: 'End-to-end content creation and publishing',
        timeSaved: '30 hours/week',
    },

    // ============ VISUAL STORYTELLING (visual-storytelling) ============
    {
        title: 'Corporate Brand Documentary',
        slug: 'corporate-brand-documentary',
        description: 'Cinematic brand story capturing company culture, values, and vision for investor presentations.',
        category: 'visual-storytelling',
        client: 'Tech Corporation',
        year: '2024',
        duration: '6 weeks',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Sony FX6', 'DaVinci Resolve', 'After Effects'],
        featured: true,
        status: 'published',
        order: 9,
        shootingStyle: 'Cinematic Documentary',
        location: 'New York, USA',
        postProduction: 'Color grading, motion graphics, sound design',
        equipment: ['Sony FX6', 'DJI RS3', 'Aputure 600d'],
        testimonial: {
            quote: 'The video captured our essence perfectly.',
            author: 'CEO',
            position: 'Tech Corporation',
        },
    },
    {
        title: 'Product Launch Campaign',
        slug: 'product-launch-campaign',
        description: 'High-energy product reveal video with dynamic visuals and compelling storytelling.',
        category: 'visual-storytelling',
        client: 'Consumer Electronics',
        year: '2024',
        duration: '4 weeks',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',
        images: [],
        technologies: ['RED Komodo', 'Premiere Pro', 'After Effects'],
        featured: true,
        status: 'published',
        order: 10,
        shootingStyle: 'Commercial Style',
        location: 'Los Angeles, USA',
        postProduction: 'VFX, motion tracking, sound design',
        equipment: ['RED Komodo', 'Ronin 4D', 'ARRI Skypanel'],
        testimonial: {
            quote: 'Sales exceeded expectations after launch.',
            author: 'Marketing Director',
            position: 'Consumer Electronics',
        },
    },
    {
        title: 'Restaurant Food Photography',
        slug: 'restaurant-food-photography',
        description: 'Premium food photography and styling for menu design and social media content.',
        category: 'visual-storytelling',
        client: 'Fine Dining Restaurant',
        year: '2024',
        duration: '2 weeks',
        image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Canon R5', 'Lightroom', 'Capture One'],
        featured: true,
        status: 'published',
        order: 11,
        shootingStyle: 'Editorial Food Photography',
        location: 'Local Studio',
        postProduction: 'Color correction, retouching, compositing',
        equipment: ['Canon R5', 'Profoto D2', 'Various props'],
        testimonial: {
            quote: 'Our reservations increased by 50%.',
            author: 'Head Chef',
            position: 'Fine Dining Restaurant',
        },
    },
    {
        title: 'Wedding Cinematography',
        slug: 'wedding-cinematography',
        description: 'Emotional wedding film with cinematic storytelling, capturing every precious moment.',
        category: 'visual-storytelling',
        client: 'Private Client',
        year: '2024',
        duration: '3 weeks',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        images: [],
        technologies: ['Sony A7S III', 'DaVinci Resolve', 'Final Cut Pro'],
        featured: true,
        status: 'published',
        order: 12,
        shootingStyle: 'Cinematic Wedding Film',
        location: 'Various Venues',
        postProduction: 'Color grading, audio mixing, delivery',
        equipment: ['Sony A7S III', 'DJI Mavic 3', 'Atomos Ninja'],
        testimonial: {
            quote: 'We cry every time we watch it.',
            author: 'Bride & Groom',
            position: 'Happy Couple',
        },
    },
];

async function seedProjects() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected!');

        // Delete all existing projects
        console.log('Deleting existing projects...');
        const deleteResult = await Project.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing projects.`);

        // Insert new projects
        console.log('Inserting 12 new projects...');
        const insertResult = await Project.insertMany(projects);
        console.log(`Inserted ${insertResult.length} new projects!`);

        console.log('✅ Database seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedProjects();
