// app/api/contact/route.ts

import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";
import { CONTACT_COLLECTION, Contact } from "@/models/Contact";

export async function POST(request: Request) {
  console.log("✅ API route hit");
  
  try {
    const { name, email, phone, message } = await request.json();
    console.log("📧 Data received:", { name, email, phone });

    // ✅ SAVE TO MONGODB - meddigital database
    const client = await clientPromise;
    const db = client.db("meddigital");
    
    const newContact: Contact = {
      name,
      email,
      phone,
      message,
      status: 'new',
      createdAt: new Date(),
    };

    const result = await db.collection(CONTACT_COLLECTION).insertOne(newContact);
    console.log("✅ Saved to database:", result.insertedId);

    // ✅ SEND EMAIL NOTIFICATION ASYNC (non-blocking)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Send email in background without blocking the response
    if (emailUser && emailPass) {
      // Don't await - send in background
      (async () => {
        try {
          console.log("📤 Creating transporter...");
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: emailUser,
              pass: emailPass,
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          console.log("📨 Sending email...");
          await transporter.sendMail({
            from: `"${name}" <${emailUser}>`,
            to: "medelkechchad@gmail.com",
            subject: `🔥 New Contact from ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
                  <h2 style="color: #ef4444; margin-bottom: 20px;">🔥 New Contact Message</h2>
                  
                  <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ef4444; margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                  </div>
                  
                  <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                    <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
                    <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                  </div>
                  
                  <p style="margin-top: 20px; color: #666; font-size: 12px;">
                    Sent from your portfolio contact form • ${new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            `,
          });

          console.log("✅ Email sent successfully");
        } catch (emailError) {
          console.error("❌ Email error (non-blocking):", emailError);
          // Email failure doesn't affect the response
        }
      })();
    }

    // Return response immediately without waiting for email
    return NextResponse.json({ 
      success: true,
      message: "Message sent and saved successfully",
      contactId: result.insertedId 
    });

  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
