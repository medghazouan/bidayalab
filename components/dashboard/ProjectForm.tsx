"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/app/actions/projects";
import { Loader2, Plus, X, Save, ArrowLeft, Layers, Monitor, FileText, Video, Megaphone, Trash2 } from "lucide-react";
import Link from "next/link";
import FileUpload from "./FileUpload";

interface ProjectFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const CATEGORIES = [
    { id: 'creative-studio', label: 'Creative Studio', icon: Layers },
    { id: 'digital-development', label: 'Digital Development', icon: Monitor },
    { id: 'ai-automation', label: 'AI Automation', icon: FileText },
    { id: 'digital-marketing', label: 'Digital Marketing', icon: Megaphone },
    { id: 'visual-storytelling', label: 'Visual Storytelling', icon: Video },
];

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(initialData?.category || "creative-studio");

    // Arrays
    const [technologies, setTechnologies] = useState<string[]>(initialData?.technologies || []);
    const [images, setImages] = useState<string[]>(initialData?.images || []);

    // Category Specific Arrays
    const [brandColors, setBrandColors] = useState<string[]>(initialData?.brandColors || []);
    const [deliverables, setDeliverables] = useState<string[]>(initialData?.deliverables || []);
    const [features, setFeatures] = useState<string[]>(initialData?.features || []);
    const [aiModels, setAiModels] = useState<string[]>(initialData?.aiModels || []);
    const [integrations, setIntegrations] = useState<string[]>(initialData?.integrations || []);
    const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
    const [equipment, setEquipment] = useState<string[]>(initialData?.equipment || []);

    // Complex Objects
    const [results, setResults] = useState<any[]>(initialData?.results || []);
    const [adCreatives, setAdCreatives] = useState<any[]>(initialData?.adCreatives || []);

    // Helper for simple string arrays
    const handleArrayAdd = (setter: any, current: string[]) => setter([...current, ""]);
    const handleArrayChange = (setter: any, current: string[], index: number, value: string) => {
        const newArray = [...current];
        newArray[index] = value;
        setter(newArray);
    };
    const handleArrayRemove = (setter: any, current: string[], index: number) => {
        const newArray = current.filter((_, i) => i !== index);
        setter(newArray);
    };

    // Helper for Results
    const handleResultAdd = () => setResults([...results, { metric: "", value: "", description: "" }]);
    const handleResultChange = (index: number, field: string, value: string) => {
        const newResults = [...results];
        newResults[index] = { ...newResults[index], [field]: value };
        setResults(newResults);
    };
    const handleResultRemove = (index: number) => setResults(results.filter((_, i) => i !== index));

    // Helper for Ad Creatives
    const handleAdCreativeAdd = () => setAdCreatives([...adCreatives, { type: "", platform: "", description: "" }]);
    const handleAdCreativeChange = (index: number, field: string, value: string) => {
        const newCreatives = [...adCreatives];
        newCreatives[index] = { ...newCreatives[index], [field]: value };
        setAdCreatives(newCreatives);
    };
    const handleAdCreativeRemove = (index: number) => setAdCreatives(adCreatives.filter((_, i) => i !== index));

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            // Append complex data as JSON strings
            formData.set('technologies', JSON.stringify(technologies));
            formData.set('images', JSON.stringify(images));
            formData.set('results', JSON.stringify(results));

            // Category specific
            if (category === 'creative-studio') {
                formData.set('brandColors', JSON.stringify(brandColors));
                formData.set('deliverables', JSON.stringify(deliverables));
            }
            if (category === 'digital-development') {
                formData.set('features', JSON.stringify(features));
            }
            if (category === 'ai-automation') {
                formData.set('aiModels', JSON.stringify(aiModels));
                formData.set('integrations', JSON.stringify(integrations));
            }
            if (category === 'digital-marketing') {
                formData.set('platforms', JSON.stringify(platforms));
                formData.set('adCreatives', JSON.stringify(adCreatives));
            }
            if (category === 'visual-storytelling') {
                formData.set('equipment', JSON.stringify(equipment));
            }

            formData.set('category', category);

            if (isEditing) {
                await updateProject(initialData._id, formData);
            } else {
                await createProject(formData);
            }

            router.push('/dashboard/projects');
        } catch (error) {
            console.error("Error saving project:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-6xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/projects" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-white">{isEditing ? "Edit Project" : "Create Project"}</h1>
                        <p className="text-zinc-400">Showcase your best work.</p>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50">
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Save Project</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Core Info */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Core Information</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Category</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setCategory(cat.id)}
                                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${category === cat.id
                                            ? 'bg-[#beff01]/10 border-[#beff01] text-white'
                                            : 'bg-black/50 border-white/10 text-zinc-400 hover:bg-white/5'
                                            }`}
                                    >
                                        <cat.icon size={20} className={category === cat.id ? 'text-[#beff01]' : ''} />
                                        <span className="font-bold text-sm">{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Title</label>
                                <input name="title" defaultValue={initialData?.title} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Project Title" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Slug</label>
                                <input name="slug" defaultValue={initialData?.slug} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="project-slug" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Description</label>
                            <textarea name="description" defaultValue={initialData?.description} required rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Project description..." />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Client</label>
                                <input name="client" defaultValue={initialData?.client} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Client Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Year</label>
                                <input name="year" defaultValue={initialData?.year} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="2024" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Duration</label>
                                <input name="duration" defaultValue={initialData?.duration} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. 2 weeks" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Main Image</label>
                                <FileUpload
                                    value={initialData?.image}
                                    onChange={(url) => {
                                        const input = document.getElementById('main-image-input') as HTMLInputElement;
                                        if (input) input.value = url;
                                    }}
                                    label="Cover Image"
                                />
                                <input type="hidden" name="image" id="main-image-input" defaultValue={initialData?.image} />
                            </div>
                        </div>
                    </div>

                    {/* Category Specific Fields */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Layers size={20} className="text-[#beff01]" /> Specific Details
                        </h2>

                        {/* Creative Studio */}
                        {category === 'creative-studio' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Brand Strategy</label>
                                    <textarea name="brandStrategy" defaultValue={initialData?.brandStrategy} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Strategy details..." />
                                </div>
                                <ArrayInput label="Deliverables" values={deliverables} setter={setDeliverables} placeholder="e.g. Logo Design" />
                                <ArrayInput label="Brand Colors (Hex)" values={brandColors} setter={setBrandColors} placeholder="#000000" />
                            </>
                        )}

                        {/* Digital Development */}
                        {category === 'digital-development' && (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Live URL</label>
                                        <input name="liveUrl" defaultValue={initialData?.liveUrl} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="https://..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">GitHub URL</label>
                                        <input name="githubUrl" defaultValue={initialData?.githubUrl} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="https://github.com/..." />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Challenge</label>
                                    <textarea name="challenge" defaultValue={initialData?.challenge} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="The problem..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Solution</label>
                                    <textarea name="solution" defaultValue={initialData?.solution} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Our solution..." />
                                </div>
                                <ArrayInput label="Key Features" values={features} setter={setFeatures} placeholder="e.g. Dark Mode" />
                            </>
                        )}

                        {/* AI Automation */}
                        {category === 'ai-automation' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Automation Type</label>
                                    <input name="automationType" defaultValue={initialData?.automationType} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. Chatbot" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Workflow Description</label>
                                    <textarea name="workflowDescription" defaultValue={initialData?.workflowDescription} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="How it works..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Time Saved</label>
                                    <input name="timeSaved" defaultValue={initialData?.timeSaved} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. 20 hrs/week" />
                                </div>
                                <ArrayInput label="AI Models" values={aiModels} setter={setAiModels} placeholder="e.g. GPT-4" />
                                <ArrayInput label="Integrations" values={integrations} setter={setIntegrations} placeholder="e.g. Slack" />
                            </>
                        )}

                        {/* Digital Marketing */}
                        {category === 'digital-marketing' && (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Budget</label>
                                        <input name="budget" defaultValue={initialData?.budget} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="$5,000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Target Audience</label>
                                        <input name="targetAudience" defaultValue={initialData?.targetAudience} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. Gen Z" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Strategy</label>
                                    <textarea name="strategy" defaultValue={initialData?.strategy} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Campaign strategy..." />
                                </div>
                                <ArrayInput label="Platforms" values={platforms} setter={setPlatforms} placeholder="e.g. Instagram" />

                                {/* Ad Creatives */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Ad Creatives</label>
                                        <button type="button" onClick={handleAdCreativeAdd} className="text-xs font-bold text-[#beff01] uppercase tracking-wider hover:underline flex items-center gap-1">
                                            <Plus size={14} /> Add Creative
                                        </button>
                                    </div>
                                    {adCreatives.map((creative, i) => (
                                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/30 rounded-xl border border-white/5 relative group">
                                            <input value={creative.type} onChange={(e) => handleAdCreativeChange(i, 'type', e.target.value)} placeholder="Type (e.g. Video)" className="bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                            <input value={creative.platform} onChange={(e) => handleAdCreativeChange(i, 'platform', e.target.value)} placeholder="Platform" className="bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                            <input value={creative.description} onChange={(e) => handleAdCreativeChange(i, 'description', e.target.value)} placeholder="Description" className="bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                            <button type="button" onClick={() => handleAdCreativeRemove(i)} className="absolute -top-2 -right-2 bg-red-500/20 text-red-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Visual Storytelling */}
                        {category === 'visual-storytelling' && (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Shooting Style</label>
                                        <input name="shootingStyle" defaultValue={initialData?.shootingStyle} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. Cinematic" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Location</label>
                                        <input name="location" defaultValue={initialData?.location} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="e.g. New York" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Post Production</label>
                                    <textarea name="postProduction" defaultValue={initialData?.postProduction} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="Editing details..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Video URL</label>
                                    <input name="videoUrl" defaultValue={initialData?.videoUrl} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="https://youtube.com/..." />
                                </div>
                                <ArrayInput label="Equipment" values={equipment} setter={setEquipment} placeholder="e.g. Sony A7S III" />
                            </>
                        )}
                    </div>

                    {/* Results (Universal) */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Project Results</h2>
                            <button type="button" onClick={handleResultAdd} className="text-xs font-bold text-[#beff01] uppercase tracking-wider hover:underline flex items-center gap-1">
                                <Plus size={14} /> Add Result
                            </button>
                        </div>
                        <div className="space-y-3">
                            {results.map((result, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/30 rounded-xl border border-white/5 relative group">
                                    <input value={result.metric} onChange={(e) => handleResultChange(i, 'metric', e.target.value)} placeholder="Metric (e.g. Views)" className="bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                    <input value={result.value} onChange={(e) => handleResultChange(i, 'value', e.target.value)} placeholder="Value (e.g. 1M)" className="bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                    <input value={result.description} onChange={(e) => handleResultChange(i, 'description', e.target.value)} placeholder="Description" className="bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white" />
                                    <button type="button" onClick={() => handleResultRemove(i)} className="absolute -top-2 -right-2 bg-red-500/20 text-red-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Media */}
                <div className="space-y-8">
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Settings</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Status</label>
                            <select name="status" defaultValue={initialData?.status || 'draft'} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors appearance-none">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-5 h-5 rounded border-white/10 bg-black/50 text-[#beff01] focus:ring-[#beff01]" />
                            <label htmlFor="featured" className="text-sm font-medium text-zinc-300">Featured Project</label>
                        </div>
                    </div>

                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Common Tags</h2>
                        <ArrayInput label="Technologies" values={technologies} setter={setTechnologies} placeholder="e.g. React" />

                        {/* Gallery Images with File Upload */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Gallery Images</label>
                                <button type="button" onClick={() => setImages([...images, ""])} className="text-xs font-bold text-[#beff01] uppercase tracking-wider hover:underline flex items-center gap-1">
                                    <Plus size={14} /> Add Image
                                </button>
                            </div>
                            {images.map((img, i) => (
                                <div key={i} className="relative group p-4 bg-black/30 rounded-xl border border-white/5">
                                    <FileUpload
                                        value={img}
                                        onChange={(url) => {
                                            const newImages = [...images];
                                            newImages[i] = url;
                                            setImages(newImages);
                                        }}
                                        label={`Image ${i + 1}`}
                                    />
                                    <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

// Helper Component for Array Inputs
function ArrayInput({ label, values, setter, placeholder }: { label: string, values: string[], setter: any, placeholder: string }) {
    const handleAdd = () => setter([...values, ""]);
    const handleChange = (index: number, value: string) => {
        const newArray = [...values];
        newArray[index] = value;
        setter(newArray);
    };
    const handleRemove = (index: number) => setter(values.filter((_, i) => i !== index));

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">{label}</label>
                <button type="button" onClick={handleAdd} className="text-xs font-bold text-[#beff01] uppercase tracking-wider hover:underline flex items-center gap-1">
                    <Plus size={14} /> Add
                </button>
            </div>
            {values.map((val, i) => (
                <div key={i} className="relative group">
                    <input
                        value={val}
                        onChange={(e) => handleChange(i, e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                        placeholder={placeholder}
                    />
                    <button type="button" onClick={() => handleRemove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-red-400 transition-colors">
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}
