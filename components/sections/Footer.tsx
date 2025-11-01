'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 md:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <Link href="/home">
            <Image
              src="/assets/icons/MEDDIGITAL.svg"
              alt="Med Digital"
              width={60}
              height={60}
              className="hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <Link
              href="https://linkedin.com/in/med-elkechchad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#beff01] transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://instagram.com/med.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#beff01] transition-colors duration-300"
            >
              <Instagram className="w-6 h-6" />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © MED ELKECHCHAD {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
}
