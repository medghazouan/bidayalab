import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  image: string;
  publicationDate: Date;
  category: string;
  text: string;
  excerpt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a blog title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    publicationDate: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    text: {
      type: String,
      required: [true, 'Please provide blog content'],
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot be more than 300 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ publicationDate: -1 });
BlogSchema.index({ category: 1 });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
