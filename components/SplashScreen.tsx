// components/SplashScreen.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [connectionSpeed, setConnectionSpeed] = useState<"slow" | "medium" | "fast">("medium");
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Detect Connection Speed
    const detectConnectionSpeed = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const connection = (navigator as any).connection || 
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (navigator as any).mozConnection || 
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (navigator as any).webkitConnection;

      if (connection) {
        const effectiveType = connection.effectiveType;
        
        // Map connection types to speed
        if (effectiveType === "slow-2g" || effectiveType === "2g") {
          setConnectionSpeed("slow");
        } else if (effectiveType === "3g") {
          setConnectionSpeed("medium");
        } else if (effectiveType === "4g") {
          setConnectionSpeed("fast");
        }

        // Also check downlink speed (Mbps)
        if (connection.downlink) {
          if (connection.downlink < 1) {
            setConnectionSpeed("slow");
          } else if (connection.downlink < 5) {
            setConnectionSpeed("medium");
          } else {
            setConnectionSpeed("fast");
          }
        }
      }
    };

    detectConnectionSpeed();

    // Set animation duration based on connection speed
    const getDuration = () => {
      switch (connectionSpeed) {
        case "slow": return 4000; // 4 seconds for slow
        case "medium": return 2500; // 2.5 seconds for medium
        case "fast": return 1500; // 1.5 seconds for fast
        default: return 2000;
      }
    };

    const duration = getDuration();

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [connectionSpeed]);

  // Animation durations based on connection speed
  const animationDuration = {
    slow: 2.5,
    medium: 1.5,
    fast: 1.0,
  }[connectionSpeed];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: animationDuration * 3, repeat: Infinity }}
            />
          </div>

          {/* Logo Animation Container */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [180, 0, 0],
                opacity: [0, 1, 1]
              }}
              transition={{ 
                duration: animationDuration,
                times: [0, 0.6, 1],
                ease: "easeOut"
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: animationDuration * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/assets/icons/MEDDIGITAL.svg"
                  alt="MEDDIGITAL"
                  width={200}
                  height={60}
                  priority
                  className="w-48 md:w-64 h-auto"
                />
              </motion.div>
            </motion.div>

            {/* Glow Effect Around Logo */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: animationDuration * 2,
                repeat: Infinity,
              }}
            >
              <div className="w-64 h-64 bg-red-500/30 rounded-full mx-auto" />
            </motion.div>

            {/* Loading Bar */}
            <div className="w-64 md:w-80 mt-8">
              <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Loading Percentage */}
              <motion.p
                className="text-center text-gray-400 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {Math.round(loadingProgress)}%
              </motion.p>
            </div>

            {/* Connection Speed Indicator (Optional - for testing) */}
            {/* <div className="text-xs text-gray-500 mt-4">
              Connection: {connectionSpeed}
            </div> */}

            {/* Loading Text */}
            <motion.p
              className="text-gray-400 text-sm mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: animationDuration, repeat: Infinity }}
            >
              Loading your experience...
            </motion.p>
          </div>

          {/* Particles Effect (Optional) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-500/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: animationDuration * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
