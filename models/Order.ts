import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  // Contact Information
  name: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;

  // Plan Details
  plan: string;
  planId: string;
  price?: number;
  currency: string;

  // Business Context
  businessType?: string; // e.g., "E-commerce", "SaaS", "Agency", "Local Business"
  projectDescription?: string;
  timeline?: string; // e.g., "ASAP", "1-2 weeks", "1 month", "Flexible"
  budget?: string; // e.g., "< 10k MAD", "10-25k MAD", "25-50k MAD", "50k+ MAD"
  goals?: string; // What they want to achieve

  // Additional Info
  howDidYouFindUs?: string;
  message?: string;

  // Status
  status: 'pending' | 'contacted' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string; // Internal notes from admin

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },

  // Contact Information
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  website: { type: String },

  // Plan Details
  plan: { type: String, required: true },
  planId: { type: String, required: true },
  price: { type: Number },
  currency: { type: String, default: 'MAD' },

  // Business Context
  businessType: { type: String },
  projectDescription: { type: String },
  timeline: { type: String },
  budget: { type: String },
  goals: { type: String },

  // Additional Info
  howDidYouFindUs: { type: String },
  message: { type: String },

  // Status
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);