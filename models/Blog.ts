import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  image: string;
  publicationDate: Date;
  category: string;
  text: string;
  excerpt?: string;
  /**
   * Content language. Used for /blogs (en) and /fr/blogs (fr) listings,
   * for hreflang alternates, and for BlogPosting schema `inLanguage`.
   * Defaults to 'en' for backwards compatibility with existing posts.
   */
  lang?: 'en' | 'fr';
  /**
   * Slug of the same article in the other language (for hreflang alternates).
   * Optional — empty string means no translation exists.
   */
  alternateSlug?: string;
  /**
   * Optional FAQ block surfaced as FAQPage JSON-LD on the post page.
   * Each item is a question/answer pair.
   */
  faq?: Array<{ q: string; a: string }>;
  /**
   * Optional named author (defaults to the BidayaLab Organization).
   */
  authorName?: string;
  /**
   * Optional reading-time hint, in minutes.
   */
  readingTime?: number;
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
      enum: [
        'creative-studio',
        'digital-development',
        'ai-automation',
        'digital-marketing',
        'visual-storytelling'
      ],
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
    lang: {
      type: String,
      enum: ['en', 'fr'],
      default: 'en',
      index: true,
    },
    alternateSlug: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    faq: [
      {
        q: { type: String, required: true },
        a: { type: String, required: true },
      },
    ],
    authorName: { type: String, trim: true, default: '' },
    readingTime: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ publicationDate: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ lang: 1, publicationDate: -1 });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
