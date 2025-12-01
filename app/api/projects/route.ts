// app/api/projects/route.ts - TYPE-SAFE VERSION

import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// Define proper interfaces instead of using 'any'
interface ProjectQuery {
  featured?: boolean;
  categorySlug?: string;  // ✅ CHANGED: from 'category' to 'categorySlug'
}

interface MongoProject {
  _id: { toString: () => string };
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  categorySlug: string;  // ✅ ADDED: Include categorySlug field
  featured: boolean;
  order: number;
  createdAt: Date;
}

interface ProjectResponse {
  success: boolean;
  projects: (Omit<MongoProject, '_id'> & { _id: string })[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const skip = (page - 1) * limit;

    const db = await getDatabase();

    // Build query object with proper typing
    const query: ProjectQuery = {};

    if (featured === 'true') {
      query.featured = true;
    }

    if (category) {
      query.categorySlug = category;  // ✅ CHANGED: from 'query.category' to 'query.categorySlug'
    }

    // Optimized projection
    const projection = {
      title: 1,
      slug: 1,
      description: 1,
      image: 1,
      category: 1,
      categorySlug: 1,  // ✅ ADDED: Include categorySlug in projection
      featured: 1,
      order: 1,
      createdAt: 1,
    };

    // Use aggregation pipeline
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

    // Properly type the response
    const response: ProjectResponse = {
      success: true,
      projects: projects.map((project: MongoProject) => ({
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
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
      },
    });
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
