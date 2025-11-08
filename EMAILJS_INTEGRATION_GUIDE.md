# 📧 EMAILJS INTEGRATION GUIDE - COMPLETE IMPLEMENTATION

## 🎯 OVERVIEW

This guide shows you **exactly** how to replace your Next.js API routes with EmailJS for form submissions.

---

## 📋 STEP 1: EMAILJS ACCOUNT SETUP

### **1.1 Create Account**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (300 emails/month free)
3. Verify your email address

### **1.2 Add Email Service**
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred provider)
4. Connect your email account (med.elkechchad@gmail.com)
5. Copy the **Service ID** (e.g., `service_abc123`)

### **1.3 Create Email Templates**

#### **Template 1: Contact Form**
1. Go to **Email Templates** → **Create New Template**
2. **Template Name:** `contact_form`
3. **Template Content:**

```html
Subject: 🔥 New Contact from {{from_name}}

<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #beff01 0%, #8bc900 100%); padding: 30px; text-align: center;">
    <h1 style="color: #000; margin: 0;">New Contact Message</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px;">
    <h2 style="color: #333;">Contact Details</h2>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p><strong>Name:</strong> {{from_name}}</p>
      <p><strong>Email:</strong> {{from_email}}</p>
      <p><strong>Phone:</strong> {{from_phone}}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <h3 style="color: #333; margin-top: 0;">Message:</h3>
      <p style="white-space: pre-wrap;">{{message}}</p>
    </div>
  </div>
  
  <div style="background: #333; color: white; padding: 20px; text-align: center;">
    <p style="margin: 0;">Reply to: {{from_email}}</p>
  </div>
</div>
```

4. **Template Variables:**
   - `{{from_name}}` - Contact's name
   - `{{from_email}}` - Contact's email
   - `{{from_phone}}` - Contact's phone
   - `{{message}}` - Contact's message

5. **Save Template** and copy **Template ID** (e.g., `template_xyz789`)

---

#### **Template 2: Order Form**
1. Create another template: `order_form`
2. **Template Content:**

```html
Subject: 🔥 NEW ORDER - {{plan_name}} Plan

<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #beff01 0%, #8bc900 100%); padding: 30px; text-align: center;">
    <h1 style="color: #000; margin: 0;">New Order Received!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #beff01; margin-top: 0;">{{plan_name}}</h2>
      <p style="font-size: 24px; font-weight: bold; color: #333;">{{plan_price}} {{plan_currency}}</p>
    </div>
    
    <h3 style="color: #333;">Customer Information</h3>
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p><strong>Name:</strong> {{customer_name}}</p>
      <p><strong>Email:</strong> {{customer_email}}</p>
      <p><strong>Phone:</strong> {{customer_phone}}</p>
    </div>
    
    <h3 style="color: #333;">Project Details</h3>
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <p style="white-space: pre-wrap;">{{project_message}}</p>
    </div>
  </div>
  
  <div style="background: #333; color: white; padding: 20px; text-align: center;">
    <p style="margin: 0;">Reply to: {{customer_email}}</p>
  </div>
</div>
```

3. **Template Variables:**
   - `{{plan_name}}` - Selected plan name
   - `{{plan_price}}` - Plan price
   - `{{plan_currency}}` - Currency (MAD)
   - `{{customer_name}}` - Customer name
   - `{{customer_email}}` - Customer email
   - `{{customer_phone}}` - Customer phone
   - `{{project_message}}` - Project details

4. **Save Template** and copy **Template ID**

---

### **1.4 Get Public Key**
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_abc123xyz`)

---

## 🔧 STEP 2: INSTALL EMAILJS

```bash
npm install @emailjs/browser
```

---

## 📝 STEP 3: CREATE EMAILJS SERVICE

Create `src/services/emailjs.ts`:

```typescript
import emailjs from '@emailjs/browser';

// ⚠️ REPLACE THESE WITH YOUR ACTUAL IDS FROM EMAILJS DASHBOARD
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',        // e.g., 'service_abc123'
  contactTemplateId: 'YOUR_CONTACT_TEMPLATE_ID',  // e.g., 'template_xyz789'
  orderTemplateId: 'YOUR_ORDER_TEMPLATE_ID',      // e.g., 'template_order123'
  publicKey: 'YOUR_PUBLIC_KEY',        // e.g., 'user_abc123xyz'
};

// Initialize EmailJS (call this once in your app)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Contact Form Submission
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone || 'Not provided',
      message: formData.message,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.contactTemplateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Email sent successfully:', response);
    return { success: true, response };
  } catch (error: any) {
    console.error('❌ Email send failed:', error);
    return { success: false, error: error.text || error.message };
  }
};

// Order Form Submission
export const sendOrderEmail = async (orderData: {
  name: string;
  email: string;
  phone: string;
  message: string;
  plan: string;
  price: number | string;
  currency: string;
}) => {
  try {
    const templateParams = {
      customer_name: orderData.name,
      customer_email: orderData.email,
      customer_phone: orderData.phone,
      project_message: orderData.message || 'No additional details provided',
      plan_name: orderData.plan,
      plan_price: orderData.price,
      plan_currency: orderData.currency,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.orderTemplateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Order email sent successfully:', response);
    return { success: true, response };
  } catch (error: any) {
    console.error('❌ Order email send failed:', error);
    return { success: false, error: error.text || error.message };
  }
};
```

---

## 🔄 STEP 4: UPDATE CONTACT FORM

Update `src/components/sections/contact/ContactSection.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactEmail } from '@/services/emailjs';  // ✅ NEW IMPORT

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ UPDATED SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // ✅ REPLACE API CALL WITH EMAILJS
      const result = await sendContactEmail(formData);

      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      setStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
      }, 3000);
      
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ... rest of component (form JSX remains the same)
}
```

---

## 🛒 STEP 5: UPDATE ORDER MODAL

Update `src/components/sections/services/OrderModal.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendOrderEmail } from '@/services/emailjs';  // ✅ NEW IMPORT

export default function OrderModal({ isOpen, onClose, plan }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ UPDATED SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // ✅ REPLACE API CALL WITH EMAILJS
      const result = await sendOrderEmail({
        ...formData,
        plan: plan.name,
        price: plan.price,
        currency: plan.currency
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit order');
      }

      setStatus('success');
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component (form JSX remains the same)
}
```

---

## 🚀 STEP 6: INITIALIZE EMAILJS IN APP

Update `src/main.tsx` (or `src/App.tsx`):

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initEmailJS } from './services/emailjs';  // ✅ NEW IMPORT

// ✅ INITIALIZE EMAILJS
initEmailJS();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## ✅ TESTING CHECKLIST

### **Test Contact Form:**
1. Fill out all fields
2. Submit form
3. Check for success message
4. Verify email received in your inbox
5. Test with missing required fields
6. Test with invalid email format

### **Test Order Form:**
1. Select a pricing plan
2. Fill out order form
3. Submit order
4. Check for success message
5. Verify order email received
6. Confirm plan details are correct in email

---

## 🔒 SECURITY NOTES

✅ **Public Key is Safe:** EmailJS public key can be exposed in client-side code  
✅ **Rate Limiting:** EmailJS has built-in rate limiting (300 emails/month free)  
✅ **No Backend Needed:** All form data goes directly to your email  
⚠️ **No Data Storage:** Forms don't save to database (email only)

---

## 📊 EMAILJS FREE TIER LIMITS

- **300 emails/month** (free)
- **Unlimited templates**
- **Unlimited services**
- **Email delivery tracking**

For more emails, upgrade to paid plan ($15/month for 1000 emails).

---

## 🎉 MIGRATION COMPLETE!

After following this guide:
- ✅ Contact form sends emails via EmailJS
- ✅ Order form sends emails via EmailJS
- ✅ No backend/API routes needed
- ✅ All form validation preserved
- ✅ All UI/UX preserved

**Next Step:** Test both forms thoroughly!

