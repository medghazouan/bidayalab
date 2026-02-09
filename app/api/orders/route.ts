// app/api/orders/route.ts - SECURED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendEmailAsync } from '@/lib/email-service';
import { headers } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const {
      name, email, phone, company, website,
      message, plan, planId, price, currency,
      businessType, projectDescription, timeline, budget, goals, howDidYouFindUs,
      website_url
    } = body;

    // 1. HONEYPOT CHECK (Anti-Spam)
    if (website_url) {
      // Silent failure for bots
      return NextResponse.json({ success: true, message: 'Order created' });
    }

    // 2. RATE LIMITING
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';
    if (!rateLimit({ ip, limit: 2, windowMs: 60 * 60 * 1000 })) { // 2 orders per hour per IP (stricter)
      return NextResponse.json(
        { success: false, error: 'Too many order attempts. Please contact support.' },
        { status: 429 }
      );
    }

    // Validation
    if (!name || !email || !phone || !plan) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, phone, and plan are required'
        },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Save to MongoDB
    const db = await getDatabase();
    const newOrder = {
      orderNumber,
      name,
      email,
      phone,
      company: company || '',
      website: website || '',
      message: message || '',
      plan,
      planId: planId || '',
      price: price || null,
      currency: currency || 'MAD',
      businessType: businessType || '',
      projectDescription: projectDescription || '',
      timeline: timeline || '',
      budget: budget || '',
      goals: goals || '',
      howDidYouFindUs: howDidYouFindUs || '',
      status: 'pending',
      createdAt: new Date(),
    };

    const result = await db.collection('orders').insertOne(newOrder);

    // Send email asynchronously (non-blocking)
    const emailUser = process.env.EMAIL_USER;
    if (emailUser) {
      const dateStr = new Date().toLocaleString('en-US', {
        timeZone: 'Africa/Casablanca',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const emailHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order - ${plan}</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a;">
          <table role="presentation" style="width: 100%; max-width: 640px; margin: 0 auto; background-color: #0a0a0a;">
            
            <!-- Header -->
            <tr>
              <td style="padding: 40px 32px 24px;">
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td>
                      <span style="color: #beff01; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">New Order</span>
                    </td>
                    <td style="text-align: right;">
                      <span style="color: #525252; font-size: 12px;">${dateStr}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Order Number & Plan -->
            <tr>
              <td style="padding: 0 32px 32px;">
                <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 32px; font-weight: 700;">${plan} Plan</h1>
                <p style="margin: 0; color: #71717a; font-size: 14px;">Order ID: <span style="color: #a1a1aa; font-family: monospace;">${orderNumber}</span></p>
              </td>
            </tr>

            <!-- Price Card -->
            <tr>
              <td style="padding: 0 32px 24px;">
                <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #beff01 0%, #9fdf00 100%); border-radius: 12px;">
                  <tr>
                    <td style="padding: 24px;">
                      <span style="color: #000000; font-size: 14px; font-weight: 600; opacity: 0.7;">Total Amount</span>
                      <div style="margin-top: 4px; color: #000000; font-size: 36px; font-weight: 800;">
                        ${price ? `${price.toLocaleString()} ${currency}` : 'Custom Quote'}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Customer Details Section -->
            <tr>
              <td style="padding: 0 32px 24px;">
                <table role="presentation" style="width: 100%; background-color: #18181b; border-radius: 12px; border: 1px solid #27272a;">
                  <tr>
                    <td style="padding: 24px;">
                      <h2 style="margin: 0 0 20px; color: #beff01; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Customer Details</h2>
                      
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                            <span style="color: #71717a; font-size: 12px;">Full Name</span>
                            <div style="color: #ffffff; font-size: 15px; font-weight: 600; margin-top: 4px;">${name}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                            <span style="color: #71717a; font-size: 12px;">Email</span>
                            <div style="margin-top: 4px;">
                              <a href="mailto:${email}" style="color: #beff01; font-size: 15px; font-weight: 600; text-decoration: none;">${email}</a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                            <span style="color: #71717a; font-size: 12px;">Phone</span>
                            <div style="margin-top: 4px;">
                              <a href="tel:${phone}" style="color: #beff01; font-size: 15px; font-weight: 600; text-decoration: none;">${phone}</a>
                            </div>
                          </td>
                        </tr>
                        ${company ? `
                        <tr>
                          <td style="padding: 12px 0;">
                            <span style="color: #71717a; font-size: 12px;">Company</span>
                            <div style="color: #ffffff; font-size: 15px; font-weight: 600; margin-top: 4px;">${company}</div>
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Business Context Section -->
            ${businessType || timeline || projectDescription || goals ? `
            <tr>
              <td style="padding: 0 32px 24px;">
                <table role="presentation" style="width: 100%; background-color: #18181b; border-radius: 12px; border: 1px solid #27272a;">
                  <tr>
                    <td style="padding: 24px;">
                      <h2 style="margin: 0 0 20px; color: #beff01; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Business Context</h2>
                      
                      <table role="presentation" style="width: 100%;">
                        ${businessType ? `
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                            <span style="color: #71717a; font-size: 12px;">Business Type</span>
                            <div style="margin-top: 4px;">
                              <span style="display: inline-block; background-color: #27272a; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${businessType}</span>
                            </div>
                          </td>
                        </tr>
                        ` : ''}
                        ${timeline ? `
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                            <span style="color: #71717a; font-size: 12px;">Timeline</span>
                            <div style="margin-top: 4px;">
                              <span style="display: inline-block; background-color: #beff01; color: #000000; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 700;">${timeline}</span>
                            </div>
                          </td>
                        </tr>
                        ` : ''}
                        ${projectDescription ? `
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                            <span style="color: #71717a; font-size: 12px;">Project Description</span>
                            <div style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin-top: 8px;">${projectDescription.replace(/\n/g, '<br>')}</div>
                          </td>
                        </tr>
                        ` : ''}
                        ${goals ? `
                        <tr>
                          <td style="padding: 12px 0;">
                            <span style="color: #71717a; font-size: 12px;">Goals</span>
                            <div style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin-top: 8px;">${goals.replace(/\n/g, '<br>')}</div>
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ` : ''}

            <!-- Quick Actions -->
            <tr>
              <td style="padding: 0 32px 32px;">
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="padding-right: 8px; width: 50%;">
                      <a href="mailto:${email}" style="display: block; background-color: #beff01; color: #000000; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; text-align: center;">
                        ✉️ Reply via Email
                      </a>
                    </td>
                    <td style="padding-left: 8px; width: 50%;">
                      <a href="tel:${phone}" style="display: block; background-color: #27272a; color: #ffffff; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; text-align: center; border: 1px solid #3f3f46;">
                        📞 Call Now
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding: 0 32px;">
                <div style="height: 1px; background-color: #27272a;"></div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 32px; text-align: center;">
                <p style="margin: 0 0 8px; color: #ffffff; font-size: 16px; font-weight: 700;">Bidayalab</p>
                <p style="margin: 0; color: #71717a; font-size: 13px;">Your Digital Growth Partner</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      sendEmailAsync({
        from: `"Bidayalab Orders" <${emailUser}>`,
        to: 'support@bidayalab.com',
        subject: `🎯 New Order: ${plan} Plan - ${name}`,
        html: emailHTML,
      });
    }

    // Return success immediately (don't wait for email)
    return NextResponse.json(
      {
        success: true,
        orderNumber,
        orderId: result.insertedId.toString(),
        message: 'Order created successfully',
      },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store', // Orders should never be cached
        }
      }
    );
  } catch (error) {
    console.error('❌ Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}