// app/api/projects/[id]/route.ts - OPTIMIZED VERSION
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get single project by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDatabase();

    // Build query to check both ObjectId and slug in single query
    interface MongoQuery {
      $or: Array<{ _id?: ObjectId; slug?: string }>;
    }
    const query: MongoQuery = { $or: [] };
    
    // If valid ObjectId, add to query
    if (ObjectId.isValid(id) && id.length === 24) {
      query.$or.push({ _id: new ObjectId(id) });
    }
    
    // Also search by slug
    query.$or.push({ slug: id });

    const project = await db.collection('projects').findOne(query);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: {
          ...project,
          _id: project._id.toString(),
        }
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const db = await getDatabase();

    const result = await db.collection('projects').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...body, 
          updatedAt: new Date() 
        } 
      },
      { 
        returnDocument: 'after',
        projection: {
          title: 1,
          slug: 1,
          description: 1,
          image: 1,
          category: 1,
          featured: 1,
          order: 1,
          createdAt: 1,
          updatedAt: 1,
        }
      }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const updatedProject = result.value;
    return NextResponse.json({ 
      success: true, 
      data: {
        ...updatedProject,
        _id: updatedProject._id.toString(),
      }
    });
  } catch (error) {
    console.error('❌ Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db.collection('projects').deleteOne({ 
      _id: new ObjectId(id) 
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: { deleted: true } 
    });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}