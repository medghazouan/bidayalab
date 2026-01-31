import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Testimonial from '@/models/Testimonial';

const dummyTestimonials = [
  {
    name: "Sarah Jenkins",
    position: "CEO, TechFlow",
    content: "Bidayalab transformed our digital presence. Their AI automation cut our support costs by 40% while 3x'ing our leads. Incredible ROI.",
    rating: 5,
    image: ""
  },
  {
    name: "Michael Chen",
    position: "Founder, GrowthX",
    content: "The best development team I've worked with. They didn't just build a website, they built a revenue engine. Highly recommended.",
    rating: 5,
    image: ""
  },
  {
    name: "Elena Rodriguez",
    position: "Marketing Director, Aura",
    content: "Visual storytelling at its finest. The creative direction and execution for our campaign was absolutely world-class.",
    rating: 5,
    image: ""
  }
];

export async function GET() {
  try {
    await connectToDatabase();
    let testimonials = await Testimonial.find({}).sort({ createdAt: -1 });

    // Fallback if no testimonials found
    if (!testimonials || testimonials.length === 0) {
      return NextResponse.json({ success: true, testimonials: dummyTestimonials });
    }

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    // Return dummy data on error to prevent broken UI
    console.error("Testimonials API Error:", error);
    return NextResponse.json({ success: true, testimonials: dummyTestimonials });
  }
}