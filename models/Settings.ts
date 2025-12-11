import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
    linkedinUrl: string;
    instagramUrl: string;
}

const SettingsSchema = new Schema<ISettings>(
    {
        linkedinUrl: { type: String, default: "" },
        instagramUrl: { type: String, default: "" },
    },
    { timestamps: true }
);

export const Settings: Model<ISettings> =
    mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
