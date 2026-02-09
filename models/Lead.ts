import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    industry: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "lost"],
        default: "new",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
