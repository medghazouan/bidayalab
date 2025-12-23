import { getProjects, deleteProject } from "@/app/actions/projects";
import { IProject } from "@/models/Project";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Calendar, Layers } from "lucide-react";
import Image from "next/image";

export default async function ProjectsPage() {
    const projects = await getProjects();

    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Projects</h1>
                    <p className="text-zinc-400">Manage your portfolio content.</p>
                </div>
                <Link href="/dashboard/projects/new" className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
                    <Plus size={20} /> Add New Project
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project: IProject) => (
                    <div key={String(project._id)} className="group bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden hover:border-[#beff01]/30 transition-all duration-300 flex flex-col">
                        {/* Image Preview */}
                        <div className="relative h-48 w-full bg-zinc-800 overflow-hidden">
                            {project.image ? (
                                <Image
                                    src={getAssetUrl(project.image)}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                    <Layers size={32} />
                                </div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${project.status === 'published' ? 'bg-[#beff01]/20 text-[#beff01] border-[#beff01]/20' :
                                    project.status === 'draft' ? 'bg-black/50 text-zinc-300 border-white/10' :
                                        'bg-red-500/20 text-red-400 border-red-500/20'
                                    }`}>
                                    {project.status || 'published'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4 flex-1">
                                <div className="text-xs font-bold text-[#beff01] mb-2 uppercase tracking-wider">{project.category}</div>
                                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{project.title}</h3>
                                <p className="text-sm text-zinc-400 line-clamp-1">{project.client}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                <div className="text-xs text-zinc-500 flex items-center gap-2">
                                    <Calendar size={14} />
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link href={`/works/${project.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="View Live">
                                        <Eye size={18} />
                                    </Link>
                                    <Link href={`/dashboard/projects/${String(project._id)}`} className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-[#beff01] transition-colors" title="Edit">
                                        <Pencil size={18} />
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteProject(String(project._id));
                                    }}>
                                        <button type="submit" className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="col-span-full p-12 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-3xl">
                        No projects found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
