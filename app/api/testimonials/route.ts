import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('meddigital'); // Changed from 'portfolio' to 'meddigital'
    
    const testimonials = await db.collection('testimonials')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('meddigital'); // Changed from 'portfolio' to 'meddigital'
    const body = await request.json();
    
    const testimonial = {
      ...body,
      createdAt: new Date(),
    };
    
    const result = await db.collection('testimonials').insertOne(testimonial);
    
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
