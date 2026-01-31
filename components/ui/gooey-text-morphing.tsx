"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
    texts: { text: string; className?: string }[];
    morphTime?: number;
    cooldownTime?: number;
    className?: string; // Container class
}

export function GooeyText({
    texts,
    morphTime = 1,
    cooldownTime = 0.25,
    className,
}: GooeyTextProps) {
    const text1Ref = React.useRef<HTMLSpanElement>(null);
    const text2Ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;

        const setMorph = (fraction: number) => {
            // Cubic Ease Out for smooth deceleration
            const eased = 1 - Math.pow(1 - fraction, 3);

            if (text1Ref.current && text2Ref.current) {
                // INCOMING TEXT (Text 2)
                // Slides UP from bottom (20px -> 0)
                // Blur fades OUT (10px -> 0)
                text2Ref.current.style.filter = `blur(${(1 - eased) * 8}px)`;
                text2Ref.current.style.opacity = `${eased * 100}%`;
                text2Ref.current.style.transform = `translate3d(0, ${(1 - eased) * 20}px, 0)`;

                // OUTGOING TEXT (Text 1)
                // Slides UP to top (0 -> -20px)
                // Blur fades IN (0 -> 8px)
                text1Ref.current.style.filter = `blur(${eased * 8}px)`;
                text1Ref.current.style.opacity = `${(1 - eased) * 100}%`;
                text1Ref.current.style.transform = `translate3d(0, ${eased * -20}px, 0)`;
            }
        };

        const doCooldown = () => {
            morph = 0;
            if (text1Ref.current && text2Ref.current) {
                text2Ref.current.style.filter = "";
                text2Ref.current.style.opacity = "100%";
                text2Ref.current.style.transform = ""; // Reset transform

                text1Ref.current.style.filter = "";
                text1Ref.current.style.opacity = "0%";
                text1Ref.current.style.transform = ""; // Reset transform
            }
        };

        const doMorph = () => {
            morph -= cooldown;
            cooldown = 0;
            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        };

        function animate() {
            requestAnimationFrame(animate);
            const newTime = new Date();
            const shouldIncrementIndex = cooldown > 0;
            const dt = (newTime.getTime() - time.getTime()) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex = (textIndex + 1) % texts.length;
                    const currentItem = texts[textIndex % texts.length];
                    const nextItem = texts[(textIndex + 1) % texts.length];

                    if (text1Ref.current && text2Ref.current) {
                        text1Ref.current.textContent = currentItem.text;
                        text2Ref.current.textContent = nextItem.text;

                        // Dynamic Class Update
                        text1Ref.current.className = cn("absolute inline-block select-none text-center transform-gpu", currentItem.className);
                        text2Ref.current.className = cn("absolute inline-block select-none text-center transform-gpu", nextItem.className);
                    }
                }
                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();

        return () => {
            // Cleanup function if needed
        };
    }, [texts, morphTime, cooldownTime]);

    // Initial render setup
    const initialData = texts[texts.length - 1];

    return (
        <div className={cn("relative", className)}>
            <div className="flex items-center justify-center w-full">
                <span
                    ref={text1Ref}
                    className={cn(
                        "absolute inline-block select-none text-center transform-gpu",
                        initialData.className
                    )}
                >
                    {initialData.text}
                </span>
                <span
                    ref={text2Ref}
                    className={cn(
                        "absolute inline-block select-none text-center transform-gpu",
                        texts[0].className
                    )}
                >
                    {texts[0].text}
                </span>
            </div>
        </div>
    );
}
