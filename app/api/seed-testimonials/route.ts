
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Testimonial from '@/models/Testimonial';

export async function GET() {
    try {
        await connectToDatabase();

        const count = await Testimonial.countDocuments();
        if (count > 0) {
            return NextResponse.json({ message: 'Testimonials already exist', count });
        }

        const dummyTestimonials = [
            {
                name: "Sarah Johnson",
                position: "CEO, TechStart",
                content: "Bidayalab didn't just build a website; they built a revenue engine. The psychological triggers in the copy increased our conversion rate by 200%.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            },
            {
                name: "Michael Chen",
                position: "Founder, GrowthAI",
                content: "The creative grid layout completely set us apart from competitors. It's not just design; it's a statement. Highly recommended.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
            },
            {
                name: "Emma Davis",
                position: "Marketing Director, Solns",
                content: "We needed a partner who understood user psychology. Bidayalab proved that design affects trust. Our bounce rate dropped significantly.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
            },
            {
                name: "David Wilson",
                position: "CTO, NextLevel",
                content: "Fast, professional, and insanely creative. The 3D elements and fluid animations make our site feel alive. True digital magic.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
            },
            {
                name: "Jessica Lee",
                position: "Product Manager, Innovate",
                content: "Working with Bidayalab was a game-changer. They don't just take orders; they provide strategic insights that improved our product positioning.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
            }
        ];

        await Testimonial.insertMany(dummyTestimonials);

        return NextResponse.json({ message: 'Testimonials seeded successfully', count: dummyTestimonials.length });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to seed testimonials', details: error }, { status: 500 });
    }
}
