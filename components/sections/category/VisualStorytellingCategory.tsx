"use client";

import Link from "next/link";
import Image from "next/image";
import { IProject } from "@/models/Project";

export default function VisualStorytellingCategory({ projects }: { projects: IProject[] }) {
    return (
        <div className="min-h-screen bg-[#000] text-white pt-24 md:pt-36 lg:pt-40 px-6 pb-16 md:pb-24">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 border-b border-white/20 pb-8 gap-8">
                    <div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">Stories That<br />Build Cults.</h1>
                        <p className="text-xl text-zinc-400 max-w-2xl">People don&apos;t buy products; they buy stories. We produce cinematic content that connects emotionally and drives action.</p>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="inline-block px-4 py-2 bg-[#FF2600]/10 border border-[#FF2600]/20 rounded-lg text-[#FF2600] text-sm font-bold">
                            Turn viewers into superfans.
                        </div>
                    </div>
                </div>

                <div className="space-y-24">
                    {projects.map((project) => (
                        <Link href={`/works/${project.slug}`} key={String(project._id)} className="block group relative">
                            <div className="relative w-full aspect-[16/7] overflow-hidden grayscale-[50%] group-hover:grayscale-0 transition-all duration-700">
                                <Image src={project.image} alt={project.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
                                    <div className="text-[#FF2600] font-bold text-sm uppercase tracking-widest mb-2">{project.client}</div>
                                    <h2 className="text-4xl md:text-7xl font-black uppercase leading-none">{project.title}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}