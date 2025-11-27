"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardShell({ children, userName }: { children: React.ReactNode; userName: string }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans flex selection:bg-[#beff01]/30">
            <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 md:ml-72 min-h-screen flex flex-col transition-all duration-300">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} userName={userName} />
                <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
