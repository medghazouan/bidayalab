import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="relative mx-auto mb-8">
                    <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#beff01] to-[#a8e600] leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 blur-3xl bg-[#beff01]/20 -z-10"></div>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                    Page Not Found
                </h2>

                <p className="text-zinc-400 mb-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>

                    <Link
                        href="/projects"
                        className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-colors border border-white/10"
                    >
                        <Search size={20} />
                        Browse Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
