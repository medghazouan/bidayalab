'use client';

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 md:py-32 bg-[#beff01] text-black relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 md:px-8">

        {/* Creative Grid Layout */}
        <div className="border-t-2 border-black">

          {/* Top Row: Main Headline */}
          <div className="border-b-2 border-black py-12 md:py-20 lg:py-24 px-4 md:px-0">
            <h2 className="font-black tracking-tighter leading-[0.85] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl max-w-7xl">
              Ready to stop guessing <br className="hidden md:block" />
              and start dominating?
            </h2>
          </div>

          {/* Bottom Row: Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">

            {/* Left Col: Secondary Headline */}
            <div className="border-b-2 md:border-b-0 md:border-r-2 border-black py-12 md:py-20 px-4 md:px-12 flex items-center">
              <p className="font-black tracking-tighter leading-[0.9] text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-xl">
                Let&apos;s build your <br />
                unfair advantage.
              </p>
            </div>

            {/* Right Col: CTA Area */}
            <div className="py-12 md:py-20 px-4 md:px-12 flex flex-col justify-center items-start md:items-end">
              <div className="flex flex-col gap-6">
                <Link href="/contact" className="group relative inline-flex items-center justify-between gap-6 px-8 py-6 bg-black text-[#beff01] hover:text-white transition-colors overflow-hidden rounded-full md:rounded-none md:rounded-tl-3xl md:rounded-br-3xl w-full md:w-auto min-w-[300px]">
                  <span className="text-xl md:text-2xl font-bold uppercase tracking-widest relative z-10">Start the Conversation</span>
                  <ArrowUpRight className="w-8 h-8 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <span className="text-xs font-mono uppercase tracking-widest opacity-60 text-left md:text-right w-full block">
                  Available for new projects
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}