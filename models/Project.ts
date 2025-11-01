import mongoose, { Schema, Document } from 'mongoose';

// Interface for nested objects
export interface IResult {
  metric: string;
  value: string;
  change: string;
}

export interface IMetric {
  followers?: string;
  engagement?: string;
  reach?: string;
}

export interface ISamplePost {
  image: string;
  caption: string;
  likes: string;
  engagement: string;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  client: string;
  year: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  featured?: boolean;

  // Web Dev specific
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];

  // Paid Ads specific
  platform?: string[];
  budget?: string;
  duration?: string;
  results?: IResult[];

  // Social Media specific
  platforms?: string[];
  contentTypes?: string[];
  metrics?: IMetric;
  samplePosts?: ISamplePost[];

  createdAt: Date;
}

const ResultSchema: Schema = new Schema({
  metric: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
});

const MetricSchema: Schema = new Schema({
  followers: { type: String },
  engagement: { type: String },
  reach: { type: String },
});

const SamplePostSchema: Schema = new Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  likes: { type: String, required: true },
  engagement: { type: String, required: true },
});

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  client: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  technologies: [{ type: String }],
  featured: { type: Boolean, default: false },

  // Web Dev specific
  liveUrl: { type: String },
  githubUrl: { type: String },
  features: [{ type: String }],

  // Paid Ads specific
  platform: [{ type: String }],
  budget: { type: String },
  duration: { type: String },
  results: [ResultSchema],

  // Social Media specific
  platforms: [{ type: String }],
  contentTypes: [{ type: String }],
  metrics: MetricSchema,
  samplePosts: [SamplePostSchema],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
