// models/PricingPlan.ts

export interface PricingPlan {
  _id?: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  isCustom: boolean;
  createdAt?: Date;
}

export const PRICING_PLAN_COLLECTION = 'pricing_plans';
