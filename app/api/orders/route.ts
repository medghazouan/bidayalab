// app/api/orders/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  console.log('✅ Order API route hit');
  
  try {
    // Parse request body
    const body = await request.json();
    console.log('📦 Request received for plan:', body.plan);
    
    const { 
      name, 
      email, 
      phone, 
      message,
      plan,
      planId,
      price,
      currency 
    } = body;

    // ✅ VALIDATION
    if (!name || !email || !phone || !plan) {
      console.error('❌ Validation failed');
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, email, phone, and plan are required' 
        },
        { status: 400 }
      );
    }

    // ✅ Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // ✅ SAVE TO MONGODB
    console.log('💾 Saving to database...');
    const client = await clientPromise;
    const db = client.db('meddigital');
    
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
      createdAt: new Date()
    };

    const result = await db.collection('orders').insertOne(newOrder);
    console.log('✅ Order saved! ID:', result.insertedId);

    // ✅ SEND EMAIL - SYNCHRONOUSLY WITH BETTER ERROR HANDLING
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    console.log('🔍 Email Config Check:', {
      emailUserExists: !!emailUser,
      emailPassExists: !!emailPass,
      emailUserValue: emailUser,
      emailPassLength: emailPass?.length || 0
    });

    if (!emailUser || !emailPass) {
      console.error('❌ EMAIL CREDENTIALS MISSING!');
      return NextResponse.json(
        { 
          success: true, 
          orderNumber,
          message: 'Order saved but email notification failed - credentials missing',
          warning: 'Email not configured'
        },
        { status: 200 }
      );
    }

    try {
      console.log('📧 Creating email transporter...');
      
      // Create transporter with explicit configuration
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: emailUser,
          pass: emailPass,
        },
        tls: {
          rejectUnauthorized: false // For development
        }
      });

      console.log('🔄 Verifying SMTP connection...');
      
      // Verify connection configuration
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully!');

      const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #beff01 0%, #9ed600 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #000; margin: 0; font-size: 28px;">🎉 NEW ORDER RECEIVED!</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 2px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #beff01; margin-top: 0;">Order #${orderNumber}</h2>
            <p style="font-size: 14px; color: #666;">Received: ${new Date().toLocaleString('en-US', { 
              timeZone: 'Africa/Casablanca',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #beff01; padding-bottom: 10px;">📦 Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #000;">Plan:</td>
                <td style="padding: 10px 0; color: #666;">${plan}</td>
              </tr>
              ${price ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #000;">Price:</td>
                <td style="padding: 10px 0; color: #666;">${price} ${currency}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #000;">Status:</td>
                <td style="padding: 10px 0;"><span style="background: #ff6b35; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">PENDING</span></td>
              </tr>
            </table>
          </div>

          <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #beff01; padding-bottom: 10px;">👤 Customer Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #000;">Name:</td>
                <td style="padding: 10px 0; color: #666;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #000;">Email:</td>
                <td style="padding: 10px 0; color: #666;"><a href="mailto:${email}" style="color: #beff01; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #000;">Phone:</td>
                <td style="padding: 10px 0; color: #666;"><a href="tel:${phone}" style="color: #beff01; text-decoration: none;">${phone}</a></td>
              </tr>
            </table>
          </div>

          ${message ? `
          <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #beff01; padding-bottom: 10px;">💬 Project Details</h3>
            <p style="color: #666; line-height: 1.6;">${message}</p>
          </div>
          ` : ''}

          <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <p style="color: #999; font-size: 12px; margin: 0;">MED ELKECHCHAD - Order Management System</p>
            <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">Reply directly to customer: <a href="mailto:${email}" style="color: #beff01;">${email}</a></p>
          </div>
        </div>
      </body>
      </html>
      `;

      console.log('📤 Sending email to:', emailUser);
      
      const mailOptions = {
        from: `"MEO Digital Orders" <${emailUser}>`,
        to: emailUser,
        replyTo: email,
        subject: `🔥 NEW ORDER #${orderNumber} - ${plan} Plan`,
        html: emailHTML,
        text: `
NEW ORDER RECEIVED!

Order Number: ${orderNumber}
Plan: ${plan}
${price ? `Price: ${price} ${currency}` : ''}

Customer Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

${message ? `Project Details:\n${message}` : ''}

Reply to customer: ${email}
        `
      };

      const info = await transporter.sendMail(mailOptions);
      
      console.log('✅ EMAIL SENT SUCCESSFULLY!');
      console.log('📧 Message ID:', info.messageId);
      console.log('📬 Response:', info.response);

    } catch (emailError: any) {
      console.error('❌ EMAIL ERROR:', emailError);
      console.error('Error Code:', emailError.code);
      console.error('Error Message:', emailError.message);
      console.error('Error Stack:', emailError.stack);
      
      // Return success but with warning
      return NextResponse.json(
        { 
          success: true, 
          orderNumber,
          message: 'Order saved successfully',
          warning: `Email failed to send: ${emailError.message}`
        },
        { status: 200 }
      );
    }

    // ✅ SUCCESS RESPONSE
    return NextResponse.json(
      { 
        success: true, 
        orderNumber,
        message: 'Order received successfully! Email notification sent. I will contact you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Order API Error:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to process order' 
      },
      { status: 500 }
    );
  }
}