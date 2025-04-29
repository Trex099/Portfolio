import React from "react";
import Image from "next/image";
import "./HeroShine.css";

const Hero = () => {
  return (
    <section id="home" className="flex flex-col items-center justify-center min-h-[60vh] pt-24 pb-10 text-center">
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-lg mb-6">
        <Image src="/profile.jpg" alt="Profile" width={112} height={112} className="object-cover w-full h-full" />
      </div>
      <h2 className="text-lg font-semibold tracking-wide text-white/80">Arsh Gour</h2>
      <p className="text-sm text-white mb-2">🇮🇳 Based in India</p>
      {/* Heading and Contact button in a single flex row */}
      <div className="flex flex-col w-full items-center">
        {/* Custom heading block for pixel-perfect alignment */}
        <div className="w-full max-w-4xl flex flex-col items-center mb-8">
          <div className="w-full flex justify-center">
            <span className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-center w-full leading-tight tracking-tight">FULLSTACK</span>
          </div>
          <div className="w-full flex flex-row items-center justify-center mt-0">
            <span className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-left" style={{minWidth: '0.1em'}}>
              DEVELOPER
            </span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=arshgour16@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shine-hover ml-4 px-7 py-2 border border-white text-white rounded-full flex items-center gap-2 text-lg font-semibold hover:bg-white/10 transition shadow-lg whitespace-nowrap align-middle"
              style={{height: 'fit-content'}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-7-7 18-2-7-7-2z" /></svg>
              Contact me
            </a>
          </div>
        </div>
        {/* Socials row */}
        <div className="flex flex-row items-center justify-center gap-8 mt-2">
          <a href="#" className="shine-hover w-14 h-14 flex items-center justify-center rounded-full border-2 border-white">
            {/* LinkedIn (Heroicons outline) */}
            <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-7 h-7">
              <rect width="18" height="18" x="3" y="3" rx="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11v5m0-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 5v-3a2 2 0 0 1 4 0v3m-4-3v3m4-3v3"/>
            </svg>
          </a>
          <a href="#" className="shine-hover w-14 h-14 flex items-center justify-center rounded-full border-2 border-white">
            {/* Instagram (simple outline) */}
            <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-7 h-7">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17" cy="7" r="1.5" fill="white"/>
            </svg>
          </a>
          <a href="#" className="shine-hover w-14 h-14 flex items-center justify-center rounded-full border-2 border-white">
            {/* GitHub (simple outline) */}
            <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.166 6.84 9.49.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.7.12 2.5.35 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z"/>
            </svg>
          </a>
          <a href="#" className="shine-hover w-14 h-14 flex items-center justify-center rounded-full border-2 border-white">
            {/* Calendar (Heroicons outline) */}
            <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-7 h-7">
              <rect x="3" y="5" width="18" height="16" rx="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4m-5 4h18"/>
            </svg>
          </a>
          <a href="#" className="shine-hover w-14 h-14 flex items-center justify-center rounded-full border-2 border-white">
            {/* Document (Heroicons outline) */}
            <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"/>
              <polyline points="16 3 16 8 21 8"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
