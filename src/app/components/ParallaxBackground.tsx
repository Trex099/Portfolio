"use client";
import React, { useEffect, useRef } from "react";

// Parallax background that moves with scroll
const ParallaxBackground = () => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Move gradient slower (background effect)
      if (gradientRef.current) {
        gradientRef.current.style.backgroundPosition = `center ${-scrollY * 0.15}px`;
      }
      // Move stars faster (foreground effect)
      if (starsRef.current) {
        starsRef.current.style.backgroundPosition = `center ${-scrollY * 0.35}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Set initial position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      {/* Layer 1: slow gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] via-[#232946] to-[#0a0a0a] opacity-80"
        style={{ backgroundSize: "100% 200%", backgroundPosition: "center 0px" }}
      />
      {/* Layer 2: fast moving stars */}
      <div
        ref={starsRef}
        className="absolute inset-0 w-full h-full bg-[url('/stars.svg')] opacity-20"
        style={{ backgroundSize: "cover", backgroundPosition: "center 0px" }}
      />
    </div>
  );
};

export default ParallaxBackground;
