import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');

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

    // Fetch projects from MongoDB
    const projects = await db
      .collection('projects')
      .find(query)
      .sort({ order: 1, createdAt: -1 }) // Sort by order first, then by date
      .toArray();

    console.log('✅ Found projects:', projects.length);

    // Return response
    return NextResponse.json({
      success: true,
      projects: projects.map(project => ({
        ...project,
        _id: project._id.toString() // Convert ObjectId to string
      }))
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
