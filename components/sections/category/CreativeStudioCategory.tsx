"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { IProject } from "@/models/Project";

export default function CreativeStudioCategory({ projects }: { projects: IProject[] }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-black pt-24 md:pt-36 lg:pt-40 px-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6">Design So Good,<br />They Can&apos;t Ignore You.</h1>
        <p className="text-xl text-zinc-600 max-w-2xl mb-8">In a crowded market, blending in is a death sentence. We craft visual identities that demand attention and build instant trust.</p>
        <div className="inline-block px-4 py-2 bg-pink-600/10 border border-pink-600/20 rounded-lg text-pink-600 text-sm font-bold mb-16">
          Make your brand unforgettable.
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link href={`/works/${project.slug}`} key={String(project._id)} className="group block">
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