'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { BsTiktok } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 md:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <Link href="/home">
            <Image
              src="/assets/icons/newlogo.png"
              alt="Bidaya Lab"
              width={150}
              height={150}
              className="hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <Link
              href="https://linkedin.com/company/bidayalab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#beff01] transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://instagram.com/bidayalab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#beff01] transition-colors duration-300"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://facebook.com/bidayalab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#beff01] transition-colors duration-300"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://tiktok.com/@bidayalab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#beff01] transition-colors duration-300"
            >
              <BsTiktok className="w-5 h-5" />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © Bidayalab {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
}
