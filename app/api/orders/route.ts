// app/api/orders/route.ts - OPTIMIZED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendEmailAsync } from '@/lib/email-service';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, phone, message, plan, planId, price, currency } = body;

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
      message: message || '',
      plan,
      planId: planId || '',
      price: price || null,
      currency: currency || 'MAD',
      status: 'pending',
      createdAt: new Date(),
    };

    const result = await db.collection('orders').insertOne(newOrder);

    // Send email asynchronously (non-blocking)
    const emailUser = process.env.EMAIL_USER;
    if (emailUser) {
      const emailHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Received</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); min-height: 100vh; padding: 40px 20px;">
          <table role="presentation" style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
            <!-- Header with Order Number -->
            <tr>
              <td style="background: linear-gradient(135deg, #beff01 0%, #8bc500 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #000000; font-size: 36px; font-weight: 900; letter-spacing: -1px;">
                  🎯 New Order Received!
                </h1>
                <p style="margin: 10px 0 0 0; color: rgba(0,0,0,0.7); font-size: 14px; font-weight: 600;">
                  A customer just placed an order
                </p>
              </td>
            </tr>
            
            <!-- Order Number Badge -->
            <tr>
              <td style="padding: 30px 30px 20px 30px; text-align: center;">
                <div style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #ffffff; padding: 12px 24px; border-radius: 25px; font-size: 16px; font-weight: 900; letter-spacing: 1px;">
                  📦 ${orderNumber}
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: #999999;">
                  ${new Date().toLocaleString('en-US', {
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
            
            <!-- Status Badge -->
            <tr>
              <td style="padding: 0 30px 20px 30px; text-align: center;">
                <span style="background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color: #000000; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                  ⏳ Pending
                </span>
              </td>
            </tr>
            
            <!-- Order Details -->
            <tr>
              <td style="padding: 20px 30px;">
                <!-- Customer Info -->
                <div style="margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%); border-radius: 15px;">
                  <h3 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                    👤 Customer Details
                  </h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                        <span style="color: #666666; font-size: 12px; font-weight: 700; text-transform: uppercase;">Name</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                        <span style="color: #1a1a1a; font-size: 15px; font-weight: 700;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                        <span style="color: #666666; font-size: 12px; font-weight: 700; text-transform: uppercase;">Email</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                        <a href="mailto:${email}" style="color: #2196F3; font-size: 14px; font-weight: 600; text-decoration: none;">
                          ${email}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <span style="color: #666666; font-size: 12px; font-weight: 700; text-transform: uppercase;">Phone</span>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <a href="tel:${phone}" style="color: #4caf50; font-size: 14px; font-weight: 600; text-decoration: none;">
                          ${phone}
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- Plan & Pricing -->
                <div style="margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 15px; border: 2px solid #4caf50;">
                  <h3 style="margin: 0 0 20px 0; color: #1b5e20; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                    💎 Selected Plan
                  </h3>
                  
                  <div style="margin-bottom: 15px;">
                    <div style="color: #388e3c; font-size: 24px; font-weight: 900; margin-bottom: 5px;">
                      ${plan}
                    </div>
                    ${planId ? `<div style="color: #66bb6a; font-size: 12px; font-weight: 600;">Plan ID: ${planId}</div>` : ''}
                  </div>
                  
                  <div style="display: inline-block; background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%); color: #ffffff; padding: 15px 30px; border-radius: 50px;">
                    <span style="font-size: 14px; font-weight: 600; opacity: 0.9; margin-right: 8px;">Total:</span>
                    <span style="font-size: 28px; font-weight: 900;">
                      ${price} <span style="font-size: 18px;">${currency}</span>
                    </span>
                  </div>
                </div>
                
                ${message ? `
                <!-- Customer Message -->
                <div style="margin-bottom: 20px; padding: 25px; background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-radius: 15px; border-left: 5px solid #ff9800;">
                  <h3 style="margin: 0 0 15px 0; color: #e65100; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                    💬 Customer Message
                  </h3>
                  <div style="font-size: 15px; color: #424242; line-height: 1.7; font-weight: 500;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                ` : ''}
              </td>
            </tr>
            
            <!-- Quick Actions -->
            <tr>
              <td style="padding: 0 30px 30px 30px;">
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="padding: 10px; text-align: center;">
                      <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);">
                        ✉️ Reply to Customer
                      </a>
                    </td>
                    <td style="padding: 10px; text-align: center;">
                      <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); color: #ffffff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);">
                        📞 Call Now
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; text-align: center; border-top: 2px solid #e0e0e0;">
                <p style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">
                  🚀 Bidayalab Order Management
                </p>
                <p style="margin: 0 0 12px 0; color: #666666; font-size: 13px;">
                  Digital Growth Partner in Morocco
                </p>
                <p style="margin: 0; color: #999999; font-size: 11px;">
                  This is an automated notification from your order system
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
        subject: `🔥 New Order: ${plan} - ${orderNumber}`,
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