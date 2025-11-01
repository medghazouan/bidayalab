// components/sections/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "HOME", href: "/home" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "WORKS", href: "/works" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [animateLogo, setAnimateLogo] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      if (isScrollingDown && currentScrollY > 100 && !scrolled) {
        setScrolled(true);
        setAnimateLogo(true);
        setTimeout(() => setAnimateLogo(false), 1500);
      }

      if (isScrollingUp && currentScrollY < 50 && scrolled) {
        setScrolled(false);
        setAnimateLogo(true);
        setTimeout(() => setAnimateLogo(false), 1500);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrolled]);

  useEffect(() => {
    setAnimateLogo(true);
    setTimeout(() => setAnimateLogo(false), 1500);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/home" className="relative z-50" prefetch={true}>
            <Image
              src="/assets/icons/MEDDIGITAL.svg"
              alt="Med Digital"
              width={50}
              height={50}
              priority
              className={`transition-all duration-300 ${
                animateLogo ? 'scale-110 rotate-12' : 'scale-100'
              }`}
            />
            {animateLogo && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 border-2 border-[#beff01] rounded-full"
              />
            )}
          </Link>

          {/* Desktop Navigation - CENTERED */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`text-sm font-bold tracking-wider transition-colors ${
                  pathname === link.href
                    ? "text-[#beff01]"
                    : "text-white hover:text-[#beff01]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            prefetch={true}
            className="hidden md:block bg-[#beff01] hover:bg-[#a8e600] text-black px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
          >
            LET'S TALK
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:text-[#beff01] transition-colors z-10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-zinc-900 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-[#beff01] transition-colors p-2"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            {/* Menu Content */}
            <div className="flex flex-col items-center justify-center min-h-full px-8 py-24 space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-center text-3xl font-bold uppercase transition-colors ${
                    pathname === link.href
                      ? "text-[#beff01]"
                      : "text-white hover:text-[#beff01]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                href="/contact"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[#beff01] hover:bg-[#a8e600] text-black px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 uppercase"
              >
                LET'S TALK
              </Link>

              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#beff01] to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </motion.nav>
  );
}