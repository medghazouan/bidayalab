import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingPlan extends Document {
  name: string;
  tagline: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  category: 'creative-studio' | 'digital-development' | 'ai-automation' | 'digital-marketing' | 'visual-storytelling';
  // Specific fields
  deliveryTime?: string;
  revisions?: string;
  pages?: number;
  platforms?: string[];
  duration?: string;

  popular: boolean;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const PRICING_PLAN_COLLECTION = 'pricing_plans';

const PricingPlanSchema = new Schema<IPricingPlan>({
  name: { type: String, required: true },
  tagline: { type: String },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  period: { type: String, default: 'project' },
  description: { type: String },
  features: [{ type: String }],
  category: {
    type: String,
    required: true,
    enum: ['creative-studio', 'digital-development', 'ai-automation', 'digital-marketing', 'visual-storytelling'],
    default: 'digital-development'
  },

  // Specific fields
  deliveryTime: { type: String },
  revisions: { type: String },
  pages: { type: Number },
  platforms: [{ type: String }],
  duration: { type: String },

  popular: { type: Boolean, default: false },
  isCustom: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.PricingPlan || mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema, 'pricing_plans');
