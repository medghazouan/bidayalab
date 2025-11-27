'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error(error);
        }
        // TODO: Log to error reporting service in production
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 flex items-center justify-center">
                    <AlertCircle size={48} className="text-red-400" />
                </div>

                <h1 className="text-3xl font-black text-white mb-3">Something went wrong!</h1>

                <p className="text-zinc-400 mb-8">
                    We encountered an unexpected error. Please try again or return to the homepage.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                        <RefreshCw size={20} />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-colors border border-white/10"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>
                </div>

                {process.env.NODE_ENV === 'development' && error.message && (
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-left">
                        <p className="text-xs font-mono text-red-400 break-all">
                            {error.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
