"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "@/app/actions/testimonials";
import { Loader2, Save, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

interface TestimonialFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function TestimonialForm({ initialData, isEditing = false }: TestimonialFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(initialData?.rating || 5);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            if (isEditing) {
                await updateTestimonial(initialData._id, formData);
            } else {
                await createTestimonial(formData);
            }
            router.push("/dashboard/testimonials");
        } catch (error) {
            console.error("Error saving testimonial:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/testimonials" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-white">{isEditing ? "Edit Testimonial" : "Add Testimonial"}</h1>
                        <p className="text-zinc-400">What are clients saying?</p>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50">
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Save Testimonial</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Client Name</label>
                            <input name="name" defaultValue={initialData?.name} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="John Doe" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Position & Company</label>
                            <input name="position" defaultValue={initialData?.position} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="CEO, TechStart" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Testimonial Content</label>
                            <textarea name="content" defaultValue={initialData?.content} required rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="They did an amazing job..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Rating</h2>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`transition-colors ${rating >= star ? 'text-[#beff01]' : 'text-zinc-700 hover:text-zinc-500'}`}
                                >
                                    <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                                </button>
                            ))}
                            <input type="hidden" name="rating" value={rating} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
