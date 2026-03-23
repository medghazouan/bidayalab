'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface ProjectCardProps {
    project: {
        title: string;
        category: string;
        image: string;
        slug: string;
        client?: string; // Optional because API might return clientName
        clientName?: string; // Some APIs return clientName
        year?: string;
        createdAt?: string | Date;
        description?: string;
    };
    index: number;
}

const getCategoryDisplay = (category: string) => {
    const categoryMap: Record<string, string> = {
        'creative-studio': 'Branding',
        'web_development': 'Development',
        'digital-development': 'Development',
        'digital-marketing': 'Marketing',
        'visual_storytelling': 'Visual Media',
        'visual-storytelling': 'Visual Media',
        'ai_automation': 'AI & Automation',
        'ai-automation': 'AI & Automation',
    };
    return categoryMap[category] || category.replace(/_/g, ' ');
};

const getYearFromDate = (dateString?: string | Date) => {
    if (!dateString) return new Date().getFullYear().toString();
    return new Date(dateString).getFullYear().toString();
};

export default function CreativeProjectCard({ project, index }: ProjectCardProps) {
    const getAssetUrl = (path: string) => {
        if (!path) return null;
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    const assetUrl = getAssetUrl(project.image);
    // Handle both 'client' and 'clientName' property variations
    const clientName = project.client || project.clientName || project.title;
    const year = project.year || getYearFromDate(project.createdAt);
    const description = project.description || '';

    return (
        <Link href={`/works/${project.slug}`} className="block h-full w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative w-full h-full min-h-[400px] md:min-h-[500px] overflow-hidden bg-zinc-900 cursor-pointer border border-white/5 hover:border-[#beff01]/20 transition-colors duration-500"
            >
                {/* Project Image with creative parallax + rotation effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 transition-all duration-[1.2s] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.15] group-hover:rotate-[2deg]">
                        {assetUrl ? (
                            <Image
                                src={assetUrl}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                <span className="text-zinc-600 font-bold text-2xl uppercase">{clientName}</span>
                            </div>
                        )}
                    </div>

                    {/* Dark overlay - cinematic vignette effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/40 transition-all duration-700" />

                    {/* Strong Noise/Grain overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                {/* Category Badge - Top Left (always visible) */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block bg-white text-black text-xs font-louis font-medium uppercase tracking-wider px-3 py-1.5">
                        {getCategoryDisplay(project.category)}
                    </span>
                </div>

                {/* Year - Top Right */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="text-white/70 text-sm font-louis font-medium">
                        /{year}
                    </span>
                </div>

                {/* Client Name - Centered (hides on hover with creative effect) */}
                <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
                    {/* Main client name - fades and scales on hover */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-louis font-black text-white tracking-tight text-center px-6 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-0 group-hover:scale-75 group-hover:blur-md group-hover:-translate-y-8">
                        {clientName}
                    </h3>
                </div>

                {/* Bottom Content - Project Title moves up on hover, Description slides in */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
                    {/* Project Title - Moves up on hover with creative motion */}
                    <h4
                        className="text-xl md:text-2xl font-louis font-bold text-white mb-2 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-[-8px] group-hover:scale-[1.02]"
                    >
                        {project.title}
                    </h4>

                    {/* Separator Line - expands from left on hover */}
                    <div
                        className="h-[2px] bg-[#beff01] mb-3 w-12 group-hover:w-20 transition-all duration-500 ease-out origin-left"
                    />

                    {/* Description - slides up and fades in with blur effect on hover */}
                    {description && (
                        <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                            <p
                                className="text-zinc-300 text-sm md:text-base font-louis leading-relaxed line-clamp-2 translate-y-[20px] opacity-0 blur-[4px] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0 transition-all duration-700 delay-150 ease-[cubic-bezier(0.33,1,0.68,1)]"
                            >
                                {description}
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
