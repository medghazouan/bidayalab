'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSettings } from '@/app/actions/settings';

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
    <footer className="relative bg-black py-6 overflow-hidden font-louis">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">

        {/* Single Row: Contact, Socials, Copyright - All inline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 pb-4 border-b border-zinc-900/50">

          {/* Left: Contact + Socials together */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="text-sm md:text-base text-white hover:text-[#beff01] transition-colors font-light">{settings.email}</a>
            )}
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="text-sm md:text-base text-zinc-400 hover:text-white transition-colors font-light">{settings.phone}</a>
            )}
            {/* Social Links */}
            {settings.linkedinUrl && (
              <Link
                href={settings.linkedinUrl}
                target="_blank"
                className="text-zinc-400 hover:text-white uppercase tracking-wider text-xs flex items-center gap-1.5 group"
              >
                LinkedIn
                <ArrowUpRight size={12} className="group-hover:text-[#beff01] transition-colors" />
              </Link>
            )}
            {settings.instagramUrl && (
              <Link
                href={settings.instagramUrl}
                target="_blank"
                className="text-zinc-400 hover:text-white uppercase tracking-wider text-xs flex items-center gap-1.5 group"
              >
                Instagram
                <ArrowUpRight size={12} className="group-hover:text-[#beff01] transition-colors" />
              </Link>
            )}
          </div>

          {/* Right: Copyright */}
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">© {currentYear} Bidayalab</p>
        </div>

      </div>
    </footer>
  );
}
