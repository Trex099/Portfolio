import React from "react";

// Simple Parallax background with layered gradients and stars
const ParallaxBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      {/* Layer 1: slow gradient */}
      <div
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] via-[#232946] to-[#0a0a0a] animate-parallax-slow opacity-80"
        style={{ backgroundSize: "100% 200%", animationDuration: "30s" }}
      />
      {/* Layer 2: fast moving stars */}
      <div
        className="absolute inset-0 w-full h-full bg-[url('/stars.svg')] opacity-20 animate-parallax-fast"
        style={{ backgroundSize: "cover", animationDuration: "10s" }}
      />
    </div>
  );
};

export default ParallaxBackground;
