"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog } from "@/app/actions/blogs";
import { Loader2, Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import FileUpload from "./FileUpload";

interface BlogFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(initialData?.image || "");

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            if (isEditing) {
                await updateBlog(initialData._id, formData);
            } else {
                await createBlog(formData);
            }
            router.push("/dashboard/blogs");
        } catch (error) {
            console.error("Error saving blog:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/blogs" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-white">{isEditing ? "Edit Blog Post" : "Create Blog Post"}</h1>
                        <p className="text-zinc-400">Share your thoughts with the world.</p>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50">
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Save Post</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Title</label>
                            <input name="title" defaultValue={initialData?.title} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Post Title" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Slug</label>
                            <input name="slug" defaultValue={initialData?.slug} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="post-slug" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Content</label>
                            <textarea name="text" defaultValue={initialData?.text} required rows={12} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors font-mono text-sm" placeholder="Write your content here..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Excerpt</label>
                            <textarea name="excerpt" defaultValue={initialData?.excerpt} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Brief summary..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Settings</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Category</label>
                            <select
                                name="category"
                                defaultValue={initialData?.category || "creative-studio"}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                <option value="creative-studio">Creative Studio</option>
                                <option value="digital-development">Digital Development</option>
                                <option value="ai-automation">AI Automation</option>
                                <option value="digital-marketing">Digital Marketing</option>
                                <option value="visual-storytelling">Visual Storytelling</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Author</label>
                            <input name="author" defaultValue={initialData?.author || "Admin"} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" />
                        </div>
                    </div>

                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Featured Image</h2>
                        <FileUpload
                            value={image}
                            onChange={(url) => {
                                setImage(url);
                                const input = document.getElementById('blog-image-input') as HTMLInputElement;
                                if (input) input.value = url;
                            }}
                            label="Cover Image"
                        />
                        <input type="hidden" name="image" id="blog-image-input" value={image} />
                    </div>
                </div>
            </div>
        </form>
    );
}
