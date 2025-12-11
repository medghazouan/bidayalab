"use client";

import Link from "next/link";
import Image from "next/image";
import { TrendingUp, ArrowUpRight } from "lucide-react";

import { IProject } from "@/models/Project";

export default function DigitalMarketingCategory({ projects }: { projects: IProject[] }) {
    return (
        <div className="pt-24 md:pt-36 lg:pt-40 px-6 pb-16 md:pb-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white tracking-tighter">
                        GROWTH & <br /> <span className="text-green-500">MARKETING</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl">
                        Performance driven campaigns with measurable ROI.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link href={`/works/${project.slug}`} key={String(project._id)} className="block bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-green-500/50 transition-all group">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-2">
                                        {project.platforms?.slice(0, 2).map((p, i) => (<span key={i} className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] uppercase font-bold">{p}</span>))}
                                    </div>
                                    <ArrowUpRight className="text-zinc-500 group-hover:text-green-500 transition-colors" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                                {project.results && project.results[0] && (
                                    <div className="inline-flex items-center gap-3 bg-black/40 rounded-lg px-4 py-2 border border-zinc-700/50">
                                        <TrendingUp size={16} className="text-green-500" />
                                        <span className="font-mono font-bold">{project.results[0].value}</span>
                                        <span className="text-xs text-zinc-500 uppercase">{project.results[0].metric}</span>
                                    </div>
                                )}
                            </div>
                            <div className="relative aspect-[21/9] grayscale group-hover:grayscale-0 transition-all duration-500">
                                <Image src={project.image} alt={project.title} fill className="object-cover" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}