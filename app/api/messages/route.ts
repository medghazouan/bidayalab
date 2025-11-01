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
    const limit = parseInt(searchParams.get('limit') || '50');

    const query = status ? { status } : {};
    
    const contacts = await db
      .collection<Contact>(CONTACT_COLLECTION)
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    const total = await db
      .collection(CONTACT_COLLECTION)
      .countDocuments(query);

    return NextResponse.json({
      success: true,
      contacts,
      total,
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
