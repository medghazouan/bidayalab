// app/api/contact/route.ts - OPTIMIZED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendEmailAsync } from '@/lib/email-service';
import { CONTACT_COLLECTION, Contact } from '@/models/Contact';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, email, and phone are required' 
        },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const db = await getDatabase();
    const newContact = {
      name,
      email,
      phone,
      message: message || '',
      status: 'new' as const,
      createdAt: new Date(),
    };

    const result = await db.collection(CONTACT_COLLECTION).insertOne(newContact);

    // Send email asynchronously (non-blocking)
    const emailUser = process.env.EMAIL_USER;
    if (emailUser) {
      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">🔥 New Contact Message</h2>
          <p><strong>Received:</strong> ${new Date().toLocaleString('en-US', { 
            timeZone: 'Africa/Casablanca',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit'
          })}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
            </tr>
          </table>
          
          ${message ? `<div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #2196F3;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0 0 0;">${message}</p>
          </div>` : ''}
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;">
            Reply directly to: <a href="mailto:${email}">${email}</a>
          </p>
        </div>
      `;

      sendEmailAsync({
        from: `"${name}" <${emailUser}>`,
        to: 'medelkechchad@gmail.com',
        subject: `🔥 New Contact from ${name}`,
        html: emailHTML,
      });
    }

    // Return success immediately (don't wait for email)
    return NextResponse.json(
      {
        success: true,
        contactId: result.insertedId.toString(),
        message: 'Contact message received successfully',
      },
      { 
        status: 201,
        headers: {
          'Cache-Control': 'no-store',
        }
      }
    );
  } catch (error) {
    console.error('❌ Error creating contact:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save contact message',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}