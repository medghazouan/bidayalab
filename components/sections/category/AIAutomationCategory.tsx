"use client";

import Link from "next/link";
import { Bot, ArrowRight, Cpu } from "lucide-react";
import { IProject } from "@/models/Project";

export default function AIAutomationCategory({ projects }: { projects: IProject[] }) {
    return (
        <div className="min-h-screen bg-[#030014] text-white pt-24 md:pt-36 lg:pt-40 px-6 pb-16 md:pb-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-indigo-800/20 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300 mb-6">
                    Work Less. Earn More. <br />Let Robots Handle the Boring Stuff.
                </h1>
                <p className="text-xl text-indigo-200/60 max-w-2xl mb-8">Your team is wasting hours on repetitive tasks. We build custom AI systems that automate the busywork so you can focus on strategy and sales.</p>
                <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-300 text-sm font-bold mb-20">
                    Scale your operations without hiring more people.
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link href={`/works/${project.slug}`} key={String(project._id)} className="group bg-white/5 border border-white/5 hover:border-indigo-500 hover:bg-indigo-500/10 rounded-2xl p-8 transition-all backdrop-blur-sm flex flex-col justify-between min-h-[300px]">
                            <div>
                                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-6 text-indigo-300">
                                    {project.category.includes("AI") ? <Bot /> : <Cpu />}
                                </div>
                                <h2 className="text-2xl font-bold mb-4 leading-tight group-hover:text-indigo-200 transition-colors">{project.title}</h2>
                                <p className="text-sm text-zinc-400 line-clamp-3">{project.description}</p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-sm font-mono text-indigo-300">
                                <span>VIEW CASE</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}