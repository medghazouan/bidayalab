// app/api/blogs/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET - Get single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = await getDatabase();

    // Search by slug
    const blog = await db.collection('blogs').findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        blog: {
          id: blog._id.toString(),
          title: blog.title,
          slug: blog.slug,
          image: blog.image,
          publicationDate: blog.publicationDate.toISOString(),
          category: blog.category,
          text: blog.text,
          excerpt: blog.excerpt || '',
          createdAt: blog.createdAt.toISOString(),
          updatedAt: blog.updatedAt.toISOString(),
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT - Update blog by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const db = await getDatabase();

    // Don't allow slug changes through this endpoint
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { slug: newSlug, ...updateData } = body;

    const result = await db.collection('blogs').findOneAndUpdate(
      { slug },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: 'after',
        projection: {
          title: 1,
          slug: 1,
          image: 1,
          publicationDate: 1,
          category: 1,
          text: 1,
          excerpt: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    const updatedBlog = result.value;
    return NextResponse.json({
      success: true,
      blog: {
        id: updatedBlog._id.toString(),
        title: updatedBlog.title,
        slug: updatedBlog.slug,
        image: updatedBlog.image,
        publicationDate: updatedBlog.publicationDate.toISOString(),
        category: updatedBlog.category,
        text: updatedBlog.text,
        excerpt: updatedBlog.excerpt || '',
      },
    });
  } catch (error) {
    console.error('❌ Error updating blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update blog',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog by slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = await getDatabase();

    const result = await db.collection('blogs').deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { deleted: true },
    });
  } catch (error) {
    console.error('❌ Error deleting blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete blog',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
