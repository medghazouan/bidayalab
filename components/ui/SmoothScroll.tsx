'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Lerp 0.1 gives a nice "heavy" feel without being sluggish.
    // Duration 1.5 ensures momentum carries on.
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
