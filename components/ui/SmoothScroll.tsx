'use client';

import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [enabled, setEnabled] = useState(false);

    // Defer Lenis activation until after page is interactive
    useEffect(() => {
        const timer = setTimeout(() => setEnabled(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!enabled) return <>{children}</>;

    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
