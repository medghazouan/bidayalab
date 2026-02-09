// app/api/contact/route.ts - SECURED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendEmailAsync } from '@/lib/email-service';
import { headers } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const { name, businessName, email, phone, message, services, website_url } = await request.json();

    // 1. HONEYPOT CHECK (Anti-Spam)
    if (website_url) {
      // If the hidden field is filled, it's a bot.
      // Return success to trick the bot, but do nothing.
      return NextResponse.json({ success: true, message: 'Message sent' });
    }

    // 2. RATE LIMITING (Brute Force Protection)
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';
    if (!rateLimit({ ip, limit: 3, windowMs: 60 * 1000 })) { // 3 requests per minute per IP
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

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
      businessName: businessName || '',
      email,
      phone,
      message: message || '',
      services: services || [],
      status: 'new' as const,
      createdAt: new Date(),
    };

    const result = await db.collection('contact').insertOne(newContact);

    // Send email asynchronously (non-blocking)
    const emailUser = process.env.EMAIL_USER;
    if (emailUser) {
      // Service Labels Mapping for Email
      const serviceLabels: Record<string, string> = {
        'ai-automation': 'AI Automation',
        'web-dev': 'Web Development',
        'visual-storytelling': 'Visual Storytelling',
      };

      const readableServices = Array.isArray(services)
        ? services.map(s => serviceLabels[s] || s)
        : [];

      const emailHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Project Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #000000; color: #ffffff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #000000;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #111111; border: 1px solid #333333; border-radius: 16px; overflow: hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #222222;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #ffffff;">
                        New <span style="color: #beff01;">Inquiry</span>
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #888888; font-size: 14px;">
                        Received via Bidayalab Website
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      
                      <!-- Intro -->
                      <div style="margin-bottom: 30px;">
                        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          You have received a new contact request. Here are the details:
                        </p>
                      </div>

                      <!-- Client Details Section -->
                      <div style="margin-bottom: 30px;">
                        <h3 style="margin: 0 0 15px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #beff01; letter-spacing: 1px;">
                          Client Details
                        </h3>
                        
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #888888; font-size: 14px; width: 120px;">Name</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 14px; font-weight: 500;">${name}</td>
                          </tr>
                          ${businessName ? `
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #888888; font-size: 14px;">Business</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 14px; font-weight: 500;">${businessName}</td>
                          </tr>` : ''}
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #888888; font-size: 14px;">Email</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #beff01; font-size: 14px; font-weight: 500;">
                                <a href="mailto:${email}" style="color: #beff01; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #888888; font-size: 14px;">Phone</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 14px; font-weight: 500;">
                                <a href="tel:${phone}" style="color: #ffffff; text-decoration: none;">${phone}</a>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <!-- Services Section -->
                      ${readableServices.length > 0 ? `
                      <div style="margin-bottom: 30px;">
                        <h3 style="margin: 0 0 15px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #beff01; letter-spacing: 1px;">
                          Interested Services
                        </h3>
                        <div>
                          ${readableServices.map(service => `
                            <span style="display: inline-block; background-color: #222222; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-right: 6px; margin-bottom: 6px; border: 1px solid #333333;">
                              ${service}
                            </span>
                          `).join('')}
                        </div>
                      </div>` : ''}

                      <!-- Message Section -->
                      <div style="margin-bottom: 30px;">
                        <h3 style="margin: 0 0 15px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #beff01; letter-spacing: 1px;">
                          Message
                        </h3>
                        <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #333333; color: #cccccc; font-size: 14px; line-height: 1.6;">
                          ${message ? message.replace(/\n/g, '<br>') : '<i style="color: #666">No message provided</i>'}
                        </div>
                      </div>

                      <!-- Action Button -->
                      <div style="text-align: center; margin-top: 40px;">
                        <a href="mailto:${email}" style="display: inline-block; background-color: #beff01; color: #000000; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                          Reply to Client
                        </a>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px; text-align: center; background-color: #0a0a0a; border-top: 1px solid #222222;">
                      <p style="margin: 0; color: #444444; font-size: 12px;">
                        &copy; ${new Date().getFullYear()} Bidayalab. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Timestamp -->
                <p style="margin-top: 20px; color: #444444; font-size: 11px;">
                  Sent: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Casablanca' })}
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      sendEmailAsync({
        from: `"${name}" <${emailUser}>`,
        to: 'support@bidayalab.com',
        subject: `🔥 New Contact: ${businessName || name}`,
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