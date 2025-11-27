import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  position: string; // Was role
  content: string;  // Was text
  rating: number;
  image?: string;
  createdAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  image: { type: String },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);