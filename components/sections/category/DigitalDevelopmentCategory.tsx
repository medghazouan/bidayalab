"use client";

import Link from "next/link";
import Image from "next/image";
import { Code2 } from "lucide-react";
import { IProject } from "@/models/Project";

export default function DigitalDevelopmentCategory({ projects }: { projects: IProject[] }) {
    return (
        <div className="min-h-screen bg-[#050507] text-white pt-24 md:pt-36 lg:pt-40 px-6 pb-16 md:pb-24 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-blue-400 mb-4 font-mono text-sm">
                    <Code2 size={16} /> Engineering & Web
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Code That Actually <br /><span className="text-zinc-600">Prints Money.</span></h1>
                <p className="text-xl text-zinc-400 max-w-2xl mb-8">Most agencies build pretty websites that do nothing. We build digital assets engineered to convert visitors into paying customers. Fast, secure, and built for growth.</p>
                <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-bold mb-16">
                    Stop losing sales to slow load times and confusing layouts.
                </div>

                <div className="grid gap-8">
                    {projects.map((project) => (
                        <Link href={`/works/${project.slug}`} key={String(project._id)} className="group relative block bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 rounded-2xl p-6 md:p-8 transition-all">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono mb-4">{project.year}</div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-100 transition-colors">{project.title}</h2>
                                    <p className="text-zinc-400 mb-6 max-w-lg line-clamp-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.slice(0, 4).map((t, i) => (
                                            <span key={i} className="text-xs font-mono text-zinc-500 border border-zinc-700 px-2 py-1 rounded bg-zinc-950">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                                    <Image src={project.image} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}