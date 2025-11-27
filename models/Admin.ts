import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'editor';
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
