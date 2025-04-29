"use client";
import React from 'react';
import Link from 'next/link';

type NavLink = {
  label: string;
  href: string;
};

const navItems: NavLink[] = [
  { label: 'F', href: '#home' },
  { label: 'B', href: '#techstack' },
  { label: 'A', href: '#contact' },
];

const FloatingNav: React.FC = () => {
  return (
    <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50" aria-label="Quick navigation">
      {/* Connector line goes behind the buttons */}
      <div 
        className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30" 
        style={{ transform: 'translateX(-50%)', zIndex: 0 }}
      ></div>
      
      {/* Navigation circles */}
      <div className="relative flex flex-col items-center gap-8">
        {navItems.map((item, index) => (
          <div key={index} className="relative">
            {/* Each button has a white background to hide the line behind it */}
            <Link 
              href={item.href}
              className="w-10 h-10 rounded-full border-2 border-white bg-[#0a0a0a] flex items-center justify-center text-white font-medium text-sm relative z-10 transition-all hover:scale-110 focus:scale-110"
              style={{ zIndex: 10 }}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingNav; 