"use client";
import React, { useEffect, useRef } from "react";

// Parallax background that moves with scroll
const ParallaxBackground = () => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let ticking = false;

    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    const updateParallax = () => {
      currentScrollY = lerp(currentScrollY, targetScrollY, 0.08); // Smooth interpolation
      // Move gradient slower (background effect)
      if (gradientRef.current) {
        gradientRef.current.style.backgroundPosition = `center ${-currentScrollY * 0.15}px`;
      }
      // Move stars faster (foreground effect)
      if (starsRef.current) {
        starsRef.current.style.backgroundPosition = `center ${-currentScrollY * 0.35}px`;
      }
      if (Math.abs(currentScrollY - targetScrollY) > 0.2) {
        requestAnimationFrame(updateParallax);
      } else {
        ticking = false;
      }
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
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
