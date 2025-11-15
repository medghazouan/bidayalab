// components/sections/Navbar.tsx

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "HOME", href: "/home" },
  
  { name: "SERVICES", href: "/services" },
  { name: "WORKS", href: "/works" },
  { name: "CONTACT", href: "/contact" },
];

// Optimized throttle utility function - uses requestAnimationFrame for smooth updates
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let rafId: number | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    } else {
      // Use requestAnimationFrame for smooth throttled updates
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        lastCall = Date.now();
        func.apply(this, args);
      });
    }
  };
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollYRef = useRef(0);
  const [animateLogo, setAnimateLogo] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      // Update ref immediately for next comparison
      lastScrollYRef.current = currentScrollY;

      // Only update state when threshold crossed (avoids unnecessary re-renders)
      if (isScrollingDown && currentScrollY > 100) {
        setScrolled((prev) => {
          if (!prev) {
            setAnimateLogo(true);
            setTimeout(() => setAnimateLogo(false), 1500);
            return true;
          }
          return prev;
        });
      } else if (isScrollingUp && currentScrollY < 50) {
        setScrolled((prev) => {
          if (prev) {
            setAnimateLogo(true);
            setTimeout(() => setAnimateLogo(false), 1500);
            return false;
          }
          return prev;
        });
      }
    };

    // Throttle scroll handler to run max once per 16ms (~60fps)
    const throttledHandleScroll = throttle(handleScroll, 16);

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []); // Empty dependencies - using refs to avoid re-registration

  useEffect(() => {
    setAnimateLogo(true);
    setTimeout(() => setAnimateLogo(false), 1500);
  }, []);

  // Lock body scroll when mobile menu is open - optimized to avoid layout thrashing
  useEffect(() => {
    if (mobileMenuOpen) {
      // Batch DOM reads and writes
      const scrollY = window.scrollY;
      // Use requestAnimationFrame to batch style updates
      requestAnimationFrame(() => {
        document.body.style.setProperty('position', 'fixed', 'important');
        document.body.style.setProperty('top', `-${scrollY}px`, 'important');
        document.body.style.setProperty('width', '100%', 'important');
      });
    } else {
      // Batch DOM reads
      const scrollY = document.body.style.top;
      const scrollYValue = scrollY ? parseInt(scrollY || '0', 10) * -1 : 0;
      
      requestAnimationFrame(() => {
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        if (scrollYValue !== 0) {
          window.scrollTo(0, scrollYValue);
        }
      });
    }

    return () => {
      // Cleanup on unmount
      requestAnimationFrame(() => {
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
      });
    };
  }, [mobileMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/95 shadow-xl' : 'bg-transparent'
      }`}
      style={{
        // Use CSS will-change for better performance
        willChange: scrolled ? 'background-color' : 'auto',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/home" className="relative z-50" prefetch={true}>
            <Image
              src="/assets/icons/newlogo.png"
              alt="Med Digital"
              width={150}
              height={150}
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
          {/* Backdrop - Removed expensive backdrop-blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-40"
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