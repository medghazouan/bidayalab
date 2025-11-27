// models/Project.ts
import mongoose, { Schema, Document } from 'mongoose';

// --- Interfaces & Types ---

export type ProjectCategory =
  | 'creative-studio'
  | 'digital-development'
  | 'ai-automation'
  | 'digital-marketing'
  | 'visual-storytelling';

export interface IResult {
  metric: string;
  value: string;
  change?: string;     // e.g. "+25%"
  description: string; // Context for the metric
}

export interface IAdCreative {
  type: string;     // e.g. "Video", "Carousel"
  platform: string; // e.g. "Instagram Reels"
  description: string;
}

export interface IProject extends Document {
  // Universal Fields
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  client: string;
  year: string;
  duration: string;
  image: string;        // Main Hero Image
  images: string[];     // Gallery
  technologies: string[]; // General tags/tools/services
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  order: number;

  // Category: Creative Studio
  brandColors?: string[];   // Hex codes
  brandStrategy?: string;
  deliverables?: string[];

  // Category: Digital Development
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  challenge?: string;
  solution?: string;

  // Category: AI & Automation
  aiModels?: string[];         // e.g., "GPT-4", "Claude"
  automationType?: string;     // e.g., "Customer Service Bot"
  integrations?: string[];     // e.g., "Zapier", "Salesforce"
  workflowDescription?: string;
  timeSaved?: string;          // e.g., "20 hours/week"

  // Category: Digital Marketing
  platforms?: string[];        // e.g., "Google Ads", "TikTok"
  budget?: string;
  targetAudience?: string;
  strategy?: string;
  adCreatives?: IAdCreative[];

  // Category: Visual Storytelling
  shootingStyle?: string;     // "Cinematic", "Documentary"
  location?: string;
  postProduction?: string;
  videoUrl?: string;          // YouTube/Vimeo link
  equipment?: string[];

  // Shared Results
  results?: IResult[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// --- Schemas ---

const ResultSchema = new Schema({
  metric: { type: String },
  value: { type: String },
  change: { type: String },
  description: { type: String }
}, { _id: false });

const AdCreativeSchema = new Schema({
  type: { type: String },
  platform: { type: String },
  description: { type: String }
}, { _id: false });

const ProjectSchema = new Schema<IProject>({
  // Core Fields
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'creative-studio',
      'digital-development',
      'ai-automation',
      'digital-marketing',
      'visual-storytelling'
    ]
  },
  client: { type: String, required: true },
  year: { type: String, required: true },
  duration: { type: String },
  image: { type: String, required: true },
  images: [{ type: String }],
  technologies: [{ type: String }], // Can function as "Services Included" list
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  order: { type: Number, default: 0 },

  // Creative Studio Specifics
  brandColors: [{ type: String }],
  brandStrategy: { type: String },
  deliverables: [{ type: String }],

  // Digital Dev Specifics
  liveUrl: { type: String },
  githubUrl: { type: String },
  features: [{ type: String }],
  challenge: { type: String },
  solution: { type: String },

  // AI Specifics
  aiModels: [{ type: String }],
  automationType: { type: String },
  integrations: [{ type: String }],
  workflowDescription: { type: String },
  timeSaved: { type: String },

  // Marketing Specifics
  platforms: [{ type: String }],
  budget: { type: String },
  targetAudience: { type: String },
  strategy: { type: String },
  adCreatives: [AdCreativeSchema],

  // Visual Specifics
  shootingStyle: { type: String },
  location: { type: String },
  postProduction: { type: String },
  videoUrl: { type: String },
  equipment: [{ type: String }],

  // Universal Results
  results: [ResultSchema],

}, { timestamps: true });

// Model Export
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);