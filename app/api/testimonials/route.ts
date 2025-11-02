import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100); // Max 100
    
    const client = await clientPromise;
    const db = client.db('meddigital');
    
    // Projection to fetch only needed fields
    const projection = {
      name: 1,
      company: 1,
      content: 1,
      rating: 1,
      image: 1,
      createdAt: 1,
      _id: 1
    };

    // Fetch with timeout protection
    const testimonials = await Promise.race([
      db.collection('testimonials')
        .find({}, { projection })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      )
    ]) as any[];
    
    return NextResponse.json(testimonials.map(t => ({
      ...t,
      _id: t._id.toString()
    })), {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
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
