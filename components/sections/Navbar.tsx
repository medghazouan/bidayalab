"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Twitter, ArrowUpRight, AlignRight } from "lucide-react";
import { getSettings } from "@/app/actions/settings";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Projects", href: "/works" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>({
    linkedinUrl: "",
    instagramUrl: "",
    email: "",
    phone: "",
    whatsapp: ""
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const chatbot = document.getElementById('bidayalab-assistant-widget');
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (chatbot) chatbot.style.display = 'none';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = "unset";
      if (chatbot) chatbot.style.display = 'block';
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.style.overflow = "unset";
      if (chatbot) chatbot.style.display = 'block';
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Social Media Configuration mapping
  const socialConfig = [
    { key: 'linkedinUrl', label: 'LinkedIn' },
    { key: 'instagramUrl', label: 'Instagram' },
    { key: 'twitterUrl', label: 'Twitter' },
  ];

  const menuVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <>
      <style jsx global>{`
        body.menu-open #bidayalab-assistant-widget {
            display: none !important;
        }
      `}</style>

      {/* MINIMAL HEADER - Scrolls with page */}
      <header className="relative top-0 left-0 right-0 z-[60] px-4 md:px-8 py-2 md:py-4 pointer-events-none">
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
          <Link href="/home" className="pointer-events-auto relative z-[70]">
            <Image
              src="/assets/icons/newlogo.png"
              alt="Bidayalab"
              width={180}
              height={60}
              priority
              className="h-14 md:h-20 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>

          <button onClick={toggleMenu} className="pointer-events-auto relative z-[70] group flex items-center justify-center">
            {isOpen ? (
              <span className="text-white font-medium text-lg uppercase tracking-wider hover:text-zinc-300 transition-colors border-b border-white pb-0.5">
                CLOSE
              </span>
            ) : (
              <div className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-sm flex justify-center items-center group-hover:bg-white group-hover:text-black transition-all duration-300 hover:scale-110">
                <AlignRight size={32} strokeWidth={1.5} />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black z-[50] w-full h-[100dvh] flex flex-col pt-32 pb-8 px-4 md:px-8 overflow-hidden"
          >
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col md:flex-row w-full h-full max-w-[1920px] mx-auto relative"
            >
              {/* LEFT COLUMN: LINKS + SOCIALS */}
              <div className="flex-1 flex flex-col justify-between h-full pb-4">

                {/* NAV LINKS CONTAINER */}
                <div className="flex flex-col items-start gap-4 md:gap-2 mt-4 md:mt-8">
                  {navLinks.map((link, index) => (
                    <div key={index} className="overflow-visible relative group">
                      <motion.div variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={toggleMenu}
                          className={`text-[13vw] md:text-[7vw] leading-[0.85] font-normal tracking-tight hover:text-[#beff01] transition-colors duration-300 block ${pathname === link.href ? 'text-[#beff01]' : 'text-zinc-200'}`}
                          style={{ fontFamily: 'var(--font-survalia)' }}
                        >
                          {link.name}
                          <span className="text-sm md:text-lg align-top ml-2 md:ml-4 opacity-50 font-mono tracking-widest text-zinc-500">
                            /0{index + 1}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* SOCIALS - DYNAMIC FETCH FROM DB (GENERIC ARROW STYLE) */}
                <motion.div variants={itemVariants} className="flex gap-6 md:gap-10 pt-8 mt-auto z-20">
                  {socialConfig.map((social) => {
                    const url = settings[social.key];
                    if (!url) return null;

                    return (
                      <a
                        key={social.key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white uppercase tracking-wider text-xs md:text-sm flex items-center gap-2"
                      >
                        {social.label}
                        {/* Reverted to Generic Arrow Icon as requested */}
                        <ArrowUpRight size={14} className="md:w-4 md:h-4" />
                      </a>
                    );
                  })}
                </motion.div>
              </div>

              {/* RIGHT COLUMN: DESCRIPTION + CONTACT */}
              <div className="hidden md:flex flex-1 flex-col justify-between items-end text-right h-full pt-4">
                <motion.div variants={itemVariants} className="max-w-md mt-6 text-right w-full ml-auto">
                  <p className="text-2xl md:text-3xl font-light text-zinc-300 leading-tight">
                    {/* Updated Text: Removed 'Moroccan' */}
                    Turning businesses into digital powerhouses through AI automation and world-class platforms.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="text-right pb-4">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-widest">Get in touch</p>
                  <div className="flex flex-col items-end gap-1">
                    <a href={`mailto:${settings.email}`} className="text-white text-2xl md:text-4xl hover:text-[#beff01] transition-colors font-light block">
                      {settings.email}
                    </a>
                    {settings.phone && (
                      /* Matched Phone Size to Email Size */
                      <a href={`tel:${settings.phone}`} className="text-zinc-400 text-2xl md:text-4xl hover:text-white transition-colors font-light block">
                        {settings.phone}
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}