// app/api/projects/route.ts - OPTIMIZED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const skip = (page - 1) * limit;

    const db = await getDatabase();

    // Build query object
    const query: any = {};
    if (featured === 'true') {
      query.featured = true;
    }
    if (category) {
      query.category = category;
    }

    // Optimized projection - fetch only needed fields
    const projection = {
      title: 1,
      slug: 1,
      description: 1,
      image: 1,
      category: 1,
      featured: 1,
      order: 1,
      createdAt: 1,
    };

    // Use aggregation pipeline for better performance (single query)
    const result = await db
      .collection('projects')
      .aggregate([
        { $match: query },
        { $sort: { order: 1, createdAt: -1 } },
        {
          $facet: {
            metadata: [{ $count: 'total' }],
            data: [
              { $skip: skip },
              { $limit: limit },
              { $project: projection },
            ],
          },
        },
      ])
      .toArray();

    const total = result[0]?.metadata[0]?.total || 0;
    const projects = result[0]?.data || [];

    // Return response with pagination metadata
    return NextResponse.json(
      {
        success: true,
        projects: projects.map((project: { _id: { toString: () => any; }; }) => ({
          ...project,
          _id: project._id.toString(),
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: skip + limit < total,
          hasPrevPage: page > 1,
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}