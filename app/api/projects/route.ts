import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100); // Max 100 per page
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db('meddigital');

    // Build query object
    let query: any = {};

    if (featured === 'true') {
      query.featured = true;
    }

    if (category) {
      query.category = category;
    }

    // Projection to fetch only needed fields (reduce payload size)
    const projection = {
      title: 1,
      slug: 1,
      description: 1,
      image: 1,
      category: 1,
      featured: 1,
      order: 1,
      createdAt: 1,
      _id: 1
    };

    // Fetch projects with pagination, timeout, and projection
    const projects = await Promise.race([
      db
        .collection('projects')
        .find(query, { projection })
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      )
    ]) as any[];

    // Get total count for pagination metadata (with timeout)
    const total = await Promise.race([
      db.collection('projects').countDocuments(query),
      new Promise<number>((_, reject) =>
        setTimeout(() => reject(new Error('Count timeout')), 5000)
      )
    ]) as number;

    console.log('✅ Found projects:', projects.length, 'out of', total);

    // Return response with pagination metadata
    return NextResponse.json({
      success: true,
      projects: projects.map(project => ({
        ...project,
        _id: project._id.toString()
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        hasPrevPage: page > 1
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
