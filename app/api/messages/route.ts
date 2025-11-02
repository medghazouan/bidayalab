// app/api/messages/route.ts

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { CONTACT_COLLECTION, Contact } from "@/models/Contact";

// GET all messages
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("meddigital");

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100); // Max 100
    const skip = (page - 1) * limit;

    const query = status ? { status } : {};
    
    // Projection to fetch only needed fields
    const projection = {
      name: 1,
      email: 1,
      phone: 1,
      message: 1,
      status: 1,
      createdAt: 1,
      _id: 1
    };
    
    // Fetch with timeout protection
    const contacts = await Promise.race([
      db
        .collection<Contact>(CONTACT_COLLECTION)
        .find(query, { projection })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      )
    ]) as Contact[];

    // Get total count with timeout
    const total = await Promise.race([
      db
        .collection(CONTACT_COLLECTION)
        .countDocuments(query),
      new Promise<number>((_, reject) =>
        setTimeout(() => reject(new Error('Count timeout')), 5000)
      )
    ]) as number;

    return NextResponse.json({
      success: true,
      contacts: contacts.map(contact => ({
        ...contact,
        _id: contact._id.toString()
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
        'Cache-Control': 'private, max-age=60'
      }
    });

  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// UPDATE message status
export async function PATCH(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("meddigital");
    
    const { contactId, status } = await request.json();

    const result = await db
      .collection<Contact>(CONTACT_COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectId(contactId) },
        { $set: { status } },
        { returnDocument: 'after' }
      );

    return NextResponse.json({
      success: true,
      contact: result.value,
    });

  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

// DELETE message
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("meddigital");
    
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');

    if (!contactId) {
      return NextResponse.json(
        { error: "Contact ID required" },
        { status: 400 }
      );
    }

    await db
      .collection(CONTACT_COLLECTION)
      .deleteOne({ _id: new ObjectId(contactId) });

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
