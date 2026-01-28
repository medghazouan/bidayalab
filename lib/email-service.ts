// lib/email-service.ts - NEW FILE (SINGLETON EMAIL TRANSPORTER)
import nodemailer, { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

/**
 * Get or create singleton email transporter
 * Reuses the same transporter across all requests for better performance
 */
export function getEmailTransporter(): Transporter | null {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('⚠️ Email credentials not configured');
    return null;
  }

  // Return existing transporter if already created
  if (transporter) {
    return transporter;
  }

  // Create new transporter
  try {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false, // For development
      },
      pool: true, // Use connection pooling
      maxConnections: 5, // Limit concurrent connections
      maxMessages: 100, // Max messages per connection
    });

    console.log('✅ Email transporter initialized');
    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error);
    return null;
  }
}

/**
 * Send email without blocking the response
 * Handles errors gracefully and logs them
 */
export async function sendEmailAsync(
  mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }
): Promise<void> {
  const transporter = getEmailTransporter();

  if (!transporter) {
    console.error('❌ Email transporter not available');
    return;
  }

  // Send in background without blocking
  setImmediate(async () => {
    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      // TODO: Implement retry logic or queue for failed emails
    }
  });
}

/**
 * Close email transporter (call on app shutdown)
 */
export function closeEmailTransporter(): void {
  if (transporter) {
    transporter.close();
    transporter = null;
    console.log('📧 Email transporter closed');
  }
}