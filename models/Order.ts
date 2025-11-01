// models/Order.ts
export interface Order {
  _id?: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  plan: string;
  planId: string;
  price?: number | null;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}
export const ORDER_COLLECTION = 'orders';