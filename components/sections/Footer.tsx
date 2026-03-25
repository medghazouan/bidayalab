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

  const pageLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/works' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="relative bg-black py-10 overflow-hidden font-louis">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">

        {/* Top Row: Page Links */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-6 border-b border-zinc-900/50">
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 md:gap-6">
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white uppercase tracking-wider transition-colors font-light"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Row: Contact, Socials, Legal, Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 pt-6">

          {/* Left: Contact + Socials */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="text-sm md:text-base text-white hover:text-[#beff01] transition-colors font-light">{settings.email}</a>
            )}
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="text-sm md:text-base text-zinc-400 hover:text-white transition-colors font-light">{settings.phone}</a>
            )}
            {settings.linkedinUrl && (
              <Link
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
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
                rel="noopener noreferrer"
                aria-label="Instagram (opens in new tab)"
                className="text-zinc-400 hover:text-white uppercase tracking-wider text-xs flex items-center gap-1.5 group"
              >
                Instagram
                <ArrowUpRight size={12} className="group-hover:text-[#beff01] transition-colors" />
              </Link>
            )}
          </div>

          {/* Right: Legal + Copyright */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-400 hover:text-zinc-300 uppercase tracking-wider transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">© {currentYear} BidayaLab</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
