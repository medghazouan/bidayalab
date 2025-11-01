import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  featured: boolean;
  date: Date;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  image: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  text: { type: String, required: true },
  featured: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);