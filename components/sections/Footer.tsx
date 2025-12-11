'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram } from 'lucide-react';
import { getSettings } from '@/app/actions/settings';

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState({ linkedinUrl: "", instagramUrl: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      if (data) {
        setSocialLinks({
          linkedinUrl: data.linkedinUrl || "",
          instagramUrl: data.instagramUrl || ""
        });
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="relative bg-transparent border-t border-white/5 py-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#beff01]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 md:px-8 z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <Link href="/home" className="group relative">
            <div className="absolute inset-0 bg-[#beff01]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <Image
              src="/assets/icons/newlogo.png"
              alt="Bidaya Lab"
              width={160}
              height={160}
              className="relative transform transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { icon: Linkedin, href: socialLinks.linkedinUrl },
              { icon: Instagram, href: socialLinks.instagramUrl },
            ].map((social, index) => {
              if (!social.href) return null;
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#beff01]/50 hover:shadow-[0_0_20px_rgba(190,255,1,0.3)]"
                >
                  <div className="absolute inset-0 bg-[#beff01] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Icon className="w-5 h-5 text-zinc-400 relative z-10 group-hover:text-black transition-colors duration-300" />
                </Link>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="pt-8 mt-8 border-t border-white/5 w-full max-w-md">
            <p className="text-sm text-zinc-600 font-medium tracking-wide">
              © Bidayalab {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
