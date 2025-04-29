"use client";
// Updated Navbar component with optimized animations and hover effects
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import "./NavbarHover.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);
  const animationRef = useRef<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ 
    width: 0, 
    transform: 'translateX(0px)' 
  });

  // Determine active link by current path
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const idx = navLinks.findIndex(link => link.href === path);
      setActiveIdx(idx === -1 ? 0 : idx);
      
      // Immediately set pill position without delay
      updatePillPosition(idx === -1 ? 0 : idx);
    }
  }, []);

  // Update pill position based on index - optimized for performance
  const updatePillPosition = (idx: number) => {
    // Cancel any pending animation frames
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Use requestAnimationFrame for smoother animations
    animationRef.current = requestAnimationFrame(() => {
      if (listRef.current) {
        const listItem = listRef.current.children[idx] as HTMLElement;
        if (listItem) {
          const width = listItem.offsetWidth;
          const translateX = listItem.offsetLeft;
          
          setPillStyle({
            width,
            transform: `translateX(${translateX}px)`
          });
        }
      }
    });
  };

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Move pill on hover or active change - with optimized event handling
  useEffect(() => {
    const targetIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
    updatePillPosition(targetIdx);
  }, [hoveredIdx, activeIdx]);

  // Handle mouse enter with debounce to prevent rapid firing
  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center items-center py-6 bg-transparent">
      <div className="relative rounded-full border border-white/20 bg-white/5 shadow backdrop-blur overflow-hidden">
        {/* Moving pill element with will-change for performance */}
        <div 
          className={`pill-highlight ${hoveredIdx !== null ? 'pill-visible' : ''}`}
          style={{
            width: `${pillStyle.width}px`,
            transform: pillStyle.transform,
          }}
        />
        
        {/* Navigation links */}
        <ul 
          ref={listRef}
          className="flex items-center"
        >
          {navLinks.map((link, idx) => (
            <li
              key={link.href}
              className="px-3 py-2"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className={`relative z-10 ${activeIdx === idx ? 'text-white' : 'text-white/70'}`}
                prefetch={false}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
