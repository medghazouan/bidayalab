"use client";

import { Menu, User } from "lucide-react";

interface DashboardHeaderProps {
    onMenuClick: () => void;
    userName: string;
}

export default function DashboardHeader({ onMenuClick, userName }: DashboardHeaderProps) {
    return (
        <header className="h-16 bg-black/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-6 flex items-center justify-between">
            {/* Creative Mobile Menu Button */}
            <button
                onClick={onMenuClick}
                className="md:hidden group relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#beff01]/20 to-[#beff01]/5 hover:from-[#beff01]/30 hover:to-[#beff01]/10 border border-[#beff01]/20 hover:border-[#beff01]/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
                <div className="relative">
                    <Menu size={20} className="text-[#beff01] transition-transform duration-300 group-hover:rotate-90" />
                    <div className="absolute inset-0 bg-[#beff01]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </button>

            {/* Welcome Message */}
            <div className="hidden md:block text-sm text-zinc-500">
                Welcome back, <span className="text-white font-bold">{userName}</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#beff01]/20 to-[#beff01]/5 border border-[#beff01]/20 flex items-center justify-center text-[#beff01] hover:from-[#beff01]/30 hover:to-[#beff01]/10 transition-all duration-300 cursor-pointer hover:scale-105">
                    <User size={18} className="md:w-5 md:h-5" />
                </div>
            </div>
        </header>
    );
}
