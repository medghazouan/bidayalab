"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { IProject } from "@/models/Project";

export default function CreativeStudioCategory({ projects }: { projects: IProject[] }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-black pt-32 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Creative<br/>Studio</h1>
            <div className="h-2 w-24 bg-pink-600 mb-16" />
            
            <div className="grid md:grid-cols-2 gap-12">
                {projects.map((project, i) => (
                    <Link href={`/works/${project.slug}`} key={project._id} className="group block">
                        <div className="aspect-[4/5] relative overflow-hidden bg-zinc-200 mb-6">
                             <Image 
                               src={project.image} alt={project.title} fill 
                               className="object-cover transition-transform duration-700 group-hover:scale-105" 
                             />
                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex justify-between items-start border-t border-black/10 pt-4">
                             <div>
                                 <div className="text-sm font-mono uppercase text-zinc-500 mb-1">{project.client}</div>
                                 <h2 className="text-3xl font-bold leading-none group-hover:text-pink-600 transition-colors">{project.title}</h2>
                             </div>
                             <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
}