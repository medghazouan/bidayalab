// app/api/projects/route.ts - TYPE-SAFE VERSION

import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// Define proper interfaces instead of using 'any'
interface ProjectQuery {
  featured?: boolean;
  category?: string;
}

interface MongoProject {
  _id: { toString: () => string };
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

interface ProjectResponse {
  success: boolean;
  projects: Omit<MongoProject, '_id'>[] & { _id: string };
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

    // Handle diverse featured - get one project from each category
    if (featured === 'diverse') {
      const diverseProjects = await db
        .collection('works')
        .aggregate([
          // Group by category and get one project from each
          { $sort: { order: 1, createdAt: -1 } },
          {
            $group: {
              _id: '$category',
              project: { $first: '$$ROOT' }
            }
          },
          { $replaceRoot: { newRoot: '$project' } },
          { $limit: limit },
          {
            $project: {
              title: 1,
              slug: 1,
              description: 1,
              image: 1,
              category: 1,
              client: 1,
              featured: 1,
              order: 1,
              createdAt: 1,
            }
          },
        ])
        .toArray();

      return NextResponse.json({
        success: true,
        projects: diverseProjects.map((project: MongoProject) => ({
          ...project,
          _id: project._id.toString(),
        })),
        pagination: {
          page: 1,
          limit,
          total: diverseProjects.length,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      });
    }

    // Build query object with proper typing
    const query: ProjectQuery = {};
    if (featured === 'true') {
      query.featured = true;
    }
    if (category) {
      query.category = category;
    }

    // Optimized projection
    const projection = {
      title: 1,
      slug: 1,
      description: 1,
      image: 1,
      category: 1,
      client: 1,
      featured: 1,
      order: 1,
      createdAt: 1,
    };

    // Use aggregation pipeline
    const result = await db
      .collection('works')
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
