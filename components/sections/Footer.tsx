'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, ArrowUpRight, Mail, Phone, MapPin, Send } from 'lucide-react';
import { getSettings } from '@/app/actions/settings';
import { motion } from 'framer-motion';

export default function Footer() {
  const [settings, setSettings] = useState({
    linkedinUrl: "",
    instagramUrl: "",
    email: "",
    phone: "",
    whatsapp: ""
  });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      if (data) {
        setSettings({
          linkedinUrl: data.linkedinUrl || "",
          instagramUrl: data.instagramUrl || "",
          email: data.email || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || ""
        });
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="relative bg-black pt-20 md:pt-32 pb-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      <div className="absolute -top-[600px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#beff01]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">



        {/* Main Grid: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Column 1: Brand (Span 4) */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/home" className="block w-fit">
              <Image
                src="/assets/icons/newlogo.png"
                alt="Bidayalab"
                width={140}
                height={48}
                className="opacity-100"
              />
            </Link>
            <p className="text-zinc-500 leading-relaxed font-medium max-w-xs">
              A digital powerhouse based in Marrakech. We blend strategy, design, and technology to build world-class brands for the future.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: settings.linkedinUrl },
                { icon: Instagram, href: settings.instagramUrl },
              ].map((social, idx) => (
                social.href ? (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#beff01] hover:border-[#beff01] transition-all duration-300"
                  >
                    <social.icon size={20} />
                  </Link>
                ) : null
              ))}
            </div>
          </div>

          {/* Column 2: Navigation (Span 2) */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#beff01]">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/home' },
                { name: 'Projects', path: '/works' },
                { name: 'Services', path: '/services' },
                { name: 'Blogs', path: '/blogs' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Span 3) */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#beff01]">Services</h4>
            <ul className="space-y-4">
              {[
                { name: 'Brand Identity', path: '/services#brand-identity' },
                { name: 'Digital Development', path: '/services#digital-development' },
                { name: 'Growth Marketing', path: '/services#growth-marketing' },
                { name: 'Creative Content', path: '/services#creative-content' },
                { name: 'AI Automation', path: '/services#ai-automation' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium block w-fit">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (Span 3) */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#beff01]">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-zinc-400 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#beff01]/10 group-hover:text-[#beff01] transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium leading-relaxed">Marrakech, Morocco <br /> Serving Clients Worldwide</span>
              </div>

              {settings.email && (
                <div className="flex items-center gap-4 text-zinc-400 group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#beff01]/10 group-hover:text-[#beff01] transition-colors">
                    <Mail size={18} />
                  </div>
                  <a href={`mailto:${settings.email}`} className="text-sm font-medium hover:text-white transition-colors">{settings.email}</a>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-center gap-4 text-zinc-400 group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#beff01]/10 group-hover:text-[#beff01] transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm font-medium">{settings.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom: Big Typo & Copyright */}
        <div className="border-t border-white/10 pt-12">
          {/* Massive Typo */}
          <div className="w-full overflow-hidden mb-12 opacity-20 select-none pointer-events-none">
            <h1 className="text-[12vw] sm:text-[13.5vw] font-black text-center text-white leading-none tracking-tight">
              BIDAYALAB
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-xs font-medium text-zinc-600 uppercase tracking-wider pb-8">
            <p>© {currentYear} Bidayalab. All rights reserved.</p>
            <p>© {currentYear} Bidayalab. All rights reserved.</p>
            {/* Links removed as per request */}
          </div>
        </div>
      </div>
    </footer>
  );
}
