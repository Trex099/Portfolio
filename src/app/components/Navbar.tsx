"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./NavbarHover.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  
  // Determine active link by current path
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const idx = navLinks.findIndex(link => link.href === path);
      setActiveIdx(idx === -1 ? 0 : idx);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center items-center py-6 bg-transparent">
      <div className="relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-2 py-3 shadow backdrop-blur flex items-center">
        {/* Animated pill background (now relative to navbar container) */}
        <div
          className={`navbar-pill${hoveredIdx !== null ? ' navbar-pill-visible' : ''}`}
          style={{
            transform: `translateX(${hoveredIdx !== null ? hoveredIdx * 100 : 0}%)`
          }}
        />
        <ul className="navbar-list text-white/80 font-medium text-base w-full h-full">
          {navLinks.map((link, idx) => (
            <li
              key={link.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative py-2 text-center"
            >
              <Link
                href={link.href}
                className={`navbar-link transition-colors${activeIdx === idx ? " navbar-link-active" : ""}`}
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
