// app/api/testimonials/route.ts - OPTIMIZED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);

    const db = await getDatabase();

    // Optimized projection - fetch only needed fields
    const projection = {
      name: 1,
      company: 1,
      content: 1,
      rating: 1,
      image: 1,
      createdAt: 1,
    };

    const testimonials = await db
      .collection('testimonials')
      .find({}, { projection })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json(
      testimonials.map((t) => ({
        ...t,
        _id: t._id.toString(),
      })),
      {
        headers: {
          // Long caching since testimonials don't change often
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const testimonial = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection('testimonials').insertOne(testimonial);

    return NextResponse.json(
      { 
        success: true, 
        id: result.insertedId.toString() 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}