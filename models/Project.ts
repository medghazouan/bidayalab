// models/Project.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Interfaces & Types ---

export type ProjectCategory = 'web_development' | 'ai_automation' | 'visual_storytelling';
export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface ITestimonial {
  quote: string;
  author: {
    name: string;
    role: string;
  };
  isVideo?: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface IProject extends Document {
  // Basics
  title: string;
  slug: string;
  category: ProjectCategory;
  clientName: string;
  isConfidential: boolean;
  industry: string;

  // Status
  status: ProjectStatus;
  featured: boolean;
  completedAt: Date;

  // Content
  summary: string;       // 1-2 sentences
  description: string;   // Full text
  challenge: string;
  solution: string;
  result: string;        // Key outcome/metric line

  // Media
  thumbnail: string;     // Cover image
  gallery: string[];     // Array of URLs

  // Category-specific
  techStack?: string[];      // Web
  aiTools?: string[];        // AI
  productionRole?: string;   // Visual

  // Links
  liveUrl?: string;
  caseStudyUrl?: string;

  // Testimonial
  testimonial?: ITestimonial;

  // System
  createdAt: Date;
  updatedAt: Date;
}

// --- Schemas ---

const TestimonialSchema = new Schema({
  quote: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    role: { type: String, required: true }
  },
  isVideo: { type: Boolean, default: false },
  videoUrl: { type: String },
  thumbnailUrl: { type: String }
}, { _id: false });

const ProjectSchema = new Schema<IProject>({
  // Classification
  category: {
    type: String,
    required: true,
    enum: ['web_development', 'ai_automation', 'visual_storytelling']
  },

  // Basics
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  isConfidential: { type: Boolean, default: false },
  industry: { type: String },

  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  featured: { type: Boolean, default: false },
  completedAt: { type: Date },

  // Content
  summary: { type: String, required: true },
  description: { type: String, required: true },
  challenge: { type: String },
  solution: { type: String },
  result: { type: String },

  // Media
  thumbnail: { type: String, required: true },
  gallery: [{ type: String }],

  // Category Specifics
  techStack: [{ type: String }],
  aiTools: [{ type: String }],
  productionRole: { type: String },

  // Links
  liveUrl: { type: String },
  caseStudyUrl: { type: String },

  // Testimonial
  testimonial: TestimonialSchema

}, {
  timestamps: true,
  collection: 'projects' // Strict collection mapping
});

// Prevent overwrite on hot reload
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;