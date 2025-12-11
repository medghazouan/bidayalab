"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPricingPlan, updatePricingPlan } from "@/app/actions/pricing";
import { Loader2, Save, ArrowLeft, Plus, X, Layers, Clock, FileText, Monitor, Video } from "lucide-react";
import Link from "next/link";
import { IPricingPlan } from "@/models/PricingPlan";

interface PricingFormProps {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    initialData?: Partial<IPricingPlan> | any;
    isEditing?: boolean;
}

const CATEGORIES = [
    { id: 'creative-studio', label: 'Creative Studio', icon: Layers },
    { id: 'digital-development', label: 'Digital Development', icon: Monitor },
    { id: 'ai-automation', label: 'AI Automation', icon: FileText },
    { id: 'digital-marketing', label: 'Digital Marketing', icon: FileText },
    { id: 'visual-storytelling', label: 'Visual Storytelling', icon: Video },
];

export default function PricingForm({ initialData, isEditing = false }: PricingFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState<string[]>(initialData?.features || []);
    const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
    const [selectedCategory, setSelectedCategory] = useState(initialData?.category || 'digital-development');

    const handleFeatureAdd = () => setFeatures([...features, ""]);
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };
    const handleFeatureRemove = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    const handlePlatformAdd = () => setPlatforms([...platforms, ""]);
    const handlePlatformChange = (index: number, value: string) => {
        const newPlatforms = [...platforms];
        newPlatforms[index] = value;
        setPlatforms(newPlatforms);
    };
    const handlePlatformRemove = (index: number) => {
        const newPlatforms = platforms.filter((_, i) => i !== index);
        setPlatforms(newPlatforms);
    };

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            // Append array fields manually since FormData doesn't handle them well directly from inputs sometimes
            // Actually, hidden inputs work fine, but let's ensure category is set
            formData.set('category', selectedCategory);

            if (isEditing) {
                await updatePricingPlan(initialData._id, formData);
            } else {
                await createPricingPlan(formData);
            }
            router.push("/dashboard/pricing");
        } catch (error) {
            console.error("Error saving pricing plan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/pricing" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-white">{isEditing ? "Edit Pricing Plan" : "Add Pricing Plan"}</h1>
                        <p className="text-zinc-400">Define your service packages.</p>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50">
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Save Plan</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Plan Details</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Category</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${selectedCategory === cat.id
                                            ? 'bg-[#beff01]/10 border-[#beff01] text-white'
                                            : 'bg-black/50 border-white/10 text-zinc-400 hover:bg-white/5'
                                            }`}
                                    >
                                        <cat.icon size={20} className={selectedCategory === cat.id ? 'text-[#beff01]' : ''} />
                                        <span className="font-bold text-sm">{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Plan Name</label>
                            <input name="name" defaultValue={initialData?.name} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Basic, Pro, Enterprise" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Price</label>
                                <input name="price" type="number" defaultValue={initialData?.price} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="999" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Period</label>
                                <input name="period" defaultValue={initialData?.period || "project"} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="project, month, year" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Tagline</label>
                            <input name="tagline" defaultValue={initialData?.tagline} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Best for small businesses" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Description</label>
                            <textarea name="description" defaultValue={initialData?.description} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Plan details..." />
                        </div>
                    </div>

                    {/* Category Specific Fields */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-[#beff01]" /> Specific Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Delivery Time</label>
                                <input name="deliveryTime" defaultValue={initialData?.deliveryTime} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. 2 weeks" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Revisions</label>
                                <input name="revisions" defaultValue={initialData?.revisions} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. Unlimited" />
                            </div>
                        </div>

                        {/* Web Development Specific */}
                        {selectedCategory === 'digital-development' && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Number of Pages</label>
                                <input name="pages" type="number" defaultValue={initialData?.pages} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. 5" />
                            </div>
                        )}

                        {/* Visual Storytelling Specific */}
                        {selectedCategory === 'visual-storytelling' && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Duration</label>
                                <input name="duration" defaultValue={initialData?.duration} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. 60 seconds" />
                            </div>
                        )}

                        {/* Digital Marketing Specific */}
                        {selectedCategory === 'digital-marketing' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Platforms</label>
                                    <button type="button" onClick={handlePlatformAdd} className="text-xs font-bold text-[#beff01] uppercase tracking-wider hover:underline flex items-center gap-1">
                                        <Plus size={14} /> Add Platform
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {platforms.map((platform, i) => (
                                        <div key={i} className="relative group">
                                            <input
                                                value={platform}
                                                onChange={(e) => handlePlatformChange(i, e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                                placeholder="e.g. Instagram, LinkedIn"
                                            />
                                            <button type="button" onClick={() => handlePlatformRemove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-red-400 transition-colors">
                                                <X size={16} />
                                            </button>
                                            <input type="hidden" name="platforms" value={platform} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Features */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Features</h2>
                            <button type="button" onClick={handleFeatureAdd} className="text-xs font-bold text-[#beff01] uppercase tracking-wider hover:underline flex items-center gap-1">
                                <Plus size={14} /> Add Feature
                            </button>
                        </div>
                        <div className="space-y-3">
                            {features.map((feature, i) => (
                                <div key={i} className="relative group">
                                    <input
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(i, e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                        placeholder="Feature description"
                                    />
                                    <button type="button" onClick={() => handleFeatureRemove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-red-400 transition-colors">
                                        <X size={16} />
                                    </button>
                                    <input type="hidden" name="features" value={feature} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Options</h2>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="popular" id="popular" defaultChecked={initialData?.popular} className="w-5 h-5 rounded border-white/10 bg-black/50 text-[#beff01] focus:ring-[#beff01]" />
                            <label htmlFor="popular" className="text-sm font-medium text-zinc-300">Mark as Popular</label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="isCustom" id="isCustom" defaultChecked={initialData?.isCustom} className="w-5 h-5 rounded border-white/10 bg-black/50 text-[#beff01] focus:ring-[#beff01]" />
                            <label htmlFor="isCustom" className="text-sm font-medium text-zinc-300">Custom Plan (Contact Us)</label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
