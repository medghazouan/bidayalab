// models/Contact.ts

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

export const CONTACT_COLLECTION = 'contact';
