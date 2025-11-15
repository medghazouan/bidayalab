// app/api/blogs/route.ts - TYPE-SAFE VERSION

import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Define interfaces for type safety
interface BlogQuery {
  category?: string;
}

interface MongoBlog {
  _id: { toString: () => string };
  title: string;
  slug: string;
  image: string;
  publicationDate: Date;
  category: string;
  excerpt?: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogsResponse {
  success: boolean;
  blogs: Array<
    Omit<MongoBlog, '_id'> & {
      id: string;
      publicationDate: string;
    }
  >;
  count: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 100);
    const category = searchParams.get('category');
    const skip = Math.max(parseInt(searchParams.get('skip') || '0', 10), 0);

    const db = await getDatabase();

    // Build query object
    const query: BlogQuery = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    // Optimized projection
    const projection = {
      title: 1,
      slug: 1,
      image: 1,
      publicationDate: 1,
      category: 1,
      excerpt: 1,
      createdAt: 1,
    };

    // Fetch blogs with aggregation pipeline
    const blogs = await db
      .collection('blogs')
      .aggregate([
        { $match: query },
        { $sort: { publicationDate: -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: projection },
      ])
      .toArray();

    // Transform response
    const response: BlogsResponse = {
      success: true,
      blogs: blogs.map((blog: any) => ({
        id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
        image: blog.image,
        publicationDate: blog.publicationDate.toISOString(),
        category: blog.category,
        excerpt: blog.excerpt || '',
      })),
      count: blogs.length,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('❌ Error fetching blogs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blogs',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, image, publicationDate, category, text, excerpt } = body;

    // Validation
    if (!title || !slug || !image || !category || !text) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: title, slug, image, category, text',
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if slug already exists
    const existingBlog = await db.collection('blogs').findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          error: 'A blog with this slug already exists',
        },
        { status: 400 }
      );
    }

    // Insert new blog
    const result = await db.collection('blogs').insertOne({
      title,
      slug,
      image,
      publicationDate: new Date(publicationDate || new Date()),
      category,
      text,
      excerpt: excerpt || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newBlog = await db
      .collection('blogs')
      .findOne({ _id: result.insertedId });

    return NextResponse.json(
      {
        success: true,
        blog: {
          id: newBlog._id.toString(),
          title: newBlog.title,
          slug: newBlog.slug,
          image: newBlog.image,
          publicationDate: newBlog.publicationDate.toISOString(),
          category: newBlog.category,
          text: newBlog.text,
          excerpt: newBlog.excerpt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error creating blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create blog',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
