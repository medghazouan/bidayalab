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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Order Received</h2>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
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
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Customer</strong></td>
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
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Plan</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${plan}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Price</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${price} ${currency}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Status</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;"><span style="background: #ffc107; color: #000; padding: 3px 8px; border-radius: 3px;">PENDING</span></td>
            </tr>
          </table>
          
          ${message ? `<div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #2196F3;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0 0 0;">${message}</p>
          </div>` : ''}
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;">
            <strong>MED ELKECHCHAD - Order Management System</strong><br>
            Reply directly to customer: <a href="mailto:${email}">${email}</a>
          </p>
        </div>
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