"use client";

import Link from "next/link";
import Image from "next/image";
import { IProject } from "@/models/Project";

export default function VisualStorytellingCategory({ projects }: { projects: IProject[] }) {
  return (
    <div className="min-h-screen bg-[#000] text-white pt-32 px-6 pb-24">
        <div className="max-w-[1800px] mx-auto">
             <div className="flex items-end justify-between mb-24 border-b border-white/20 pb-8">
                 <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Visual<br/>Production</h1>
                 <div className="hidden md:block text-right font-mono text-sm text-zinc-500 mb-2">
                     FILM / PHOTO / ART
                 </div>
             </div>

             <div className="space-y-24">
                 {projects.map((project, index) => (
                     <Link href={`/works/${project.slug}`} key={project._id} className="block group relative">
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