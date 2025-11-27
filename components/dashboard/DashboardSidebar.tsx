"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, Settings, FileText, ShoppingBag, Quote, DollarSign, X } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Overview" },
        { href: "/dashboard/projects", label: "Projects", icon: FolderKanban, section: "Management" },
        { href: "/dashboard/blogs", label: "Blogs", icon: FileText, section: "Management" },
        { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag, section: "Management" },
        { href: "/dashboard/testimonials", label: "Testimonials", icon: Quote, section: "Management" },
        { href: "/dashboard/pricing", label: "Pricing", icon: DollarSign, section: "Management" },
        { href: "/dashboard/messages", label: "Messages", icon: MessageSquare, section: "Management" },
        { href: "/dashboard/settings", label: "Settings", icon: Settings, section: "System" },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-black border-r border-white/5 z-50 transition-transform duration-300 ease-in-out flex flex-col
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            `}>
                {/* Logo Section - Optimized size */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between flex-shrink-0">
                    <Link href="/" className="flex items-center justify-center w-full">
                        <div className="w-20 h-20 md:w-24 md:h-24 relative">
                            <Image src="/assets/icons/newlogo.png" alt="Bidayalab" fill className="object-contain" />
                        </div>
                    </Link>
                    <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white transition-all hover:rotate-90 duration-300 absolute top-4 right-4">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation - Scrollable */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {links.map((link, index) => {
                        const isSectionStart = index === 0 || links[index - 1].section !== link.section;
                        return (
                            <div key={link.href}>
                                {isSectionStart && (
                                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-4 mb-2 mt-4">
                                        {link.section}
                                    </div>
                                )}
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group text-sm ${isActive(link.href)
                                        ? "bg-[#beff01]/10 text-[#beff01]"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <link.icon size={20} className={`${isActive(link.href) ? "text-[#beff01]" : "group-hover:text-[#beff01] transition-colors"}`} />
                                    <span className="font-medium">{link.label}</span>
                                </Link>
                            </div>
                        );
                    })}
                </nav>

                {/* Sign Out Button - Sticky at bottom */}
                <div className="p-4 border-t border-white/5 flex-shrink-0 bg-black">
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
