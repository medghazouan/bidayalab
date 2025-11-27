// app/api/contact/route.ts - OPTIMIZED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendEmailAsync } from '@/lib/email-service';

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

    const result = await db.collection('contact').insertOne(newContact);

    // Send email asynchronously (non-blocking)
    const emailUser = process.env.EMAIL_USER;
    if (emailUser) {
      const emailHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 40px 20px;">
          <table role="presentation" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #beff01 0%, #8bc500 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #000000; font-size: 32px; font-weight: 900; letter-spacing: -1px;">
                  💌 New Contact Message
                </h1>
                <p style="margin: 10px 0 0 0; color: rgba(0,0,0,0.7); font-size: 14px; font-weight: 600;">
                  Someone wants to connect with you!
                </p>
              </td>
            </tr>
            
            <!-- Timestamp Badge -->
            <tr>
              <td style="padding: 30px 30px 0 30px;">
                <div style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  📅 ${new Date().toLocaleString('en-US', {
        timeZone: 'Africa/Casablanca',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
                </div>
              </td>
            </tr>
            
            <!-- Contact Details -->
            <tr>
              <td style="padding: 30px;">
                <!-- Name -->
                <div style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #f5f5f5 0%, #e9ecef 100%); border-radius: 12px; border-left: 4px solid #beff01;">
                  <div style="font-size: 11px; color: #666666; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    👤 Full Name
                  </div>
                  <div style="font-size: 18px; color: #1a1a1a; font-weight: 700;">
                    ${name}
                  </div>
                </div>
                
                <!-- Email -->
                <div style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; border-left: 4px solid #2196F3;">
                  <div style="font-size: 11px; color: #1976d2; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    📧 Email Address
                  </div>
                  <div style="font-size: 18px; color: #0d47a1; font-weight: 700;">
                    <a href="mailto:${email}" style="color: #0d47a1; text-decoration: none;">
                      ${email}
                    </a>
                  </div>
                </div>
                
                <!-- Phone -->
                <div style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
                  <div style="font-size: 11px; color: #388e3c; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    📱 Phone Number
                  </div>
                  <div style="font-size: 18px; color: #1b5e20; font-weight: 700;">
                    <a href="tel:${phone}" style="color: #1b5e20; text-decoration: none;">
                      ${phone}
                    </a>
                  </div>
                </div>
                
                ${message ? `
                <!-- Message -->
                <div style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
                  <div style="font-size: 11px; color: #e65100; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                    💬 Message
                  </div>
                  <div style="font-size: 15px; color: #424242; line-height: 1.6; font-weight: 500;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                ` : ''}
              </td>
            </tr>
            
            <!-- Quick Action Button -->
            <tr>
              <td style="padding: 0 30px 30px 30px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4); transition: all 0.3s;">
                  ✉️ Reply Now
                </a>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; font-weight: 600;">
                  🚀 Bidayalab - Digital Growth Partner
                </p>
                <p style="margin: 0; color: #999999; font-size: 12px;">
                  This message was sent from your website contact form
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
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