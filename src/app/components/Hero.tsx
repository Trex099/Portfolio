"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HeroShine.css";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const profileSection = heroRef.current.querySelector('.profile-section');
    const title1 = heroRef.current.querySelector('.hero-title-1');
    const title2 = heroRef.current.querySelector('.hero-title-2');
    const socials = heroRef.current.querySelector('.socials-row');
    const contactBtn = heroRef.current.querySelector('.contact-btn');

    // Set initial states
    gsap.set([profileSection, title1, title2, socials, contactBtn], { 
      y: 30, 
      opacity: 0 
    });

    // Create timeline for entrance animation
    const tl = gsap.timeline({ 
      defaults: { 
        ease: "power2.out",
        duration: 0.6
      } 
    });

    // Animate elements in sequence
    tl.to(profileSection, { y: 0, opacity: 1 })
      .to(title1, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
      .to(title2, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .to(socials, { y: 0, opacity: 1 }, "-=0.4")
      .to(contactBtn, { y: 0, opacity: 1 }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="flex flex-col items-center justify-center min-h-[80vh] sm:min-h-[70vh] pt-20 pb-12 text-center sm:pt-20 sm:pb-10">
      {/* Profile info with horizontal layout */}
      <div className="profile-section flex flex-row items-center mb-3 sm:mb-4">
        <div className="avatar-container w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/30 shadow-lg mr-4 sm:mr-5 overflow-hidden relative">
          <img 
            src="/profile.jpg" 
            alt="Arsh Gour"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-start text-left">
          <h2 className="hero-name text-xl sm:text-2xl font-semibold tracking-wide text-white/80">Arsh Gour</h2>
          <p className="hero-location text-sm sm:text-base text-white">🇮🇳 Based in India</p>
        </div>
      </div>
      <div className="flex flex-col w-full items-center px-4 sm:px-0">
        <div className="w-full max-w-2xl sm:max-w-4xl flex flex-col items-center mb-8 sm:mb-8">
          <div className="w-full flex justify-center">
            <span className="hero-title-1 text-4xl xs:text-5xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-center w-full leading-tight tracking-tight">FULLSTACK</span>
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-0">
            <span className="hero-title-2 text-4xl xs:text-5xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-center" style={{minWidth: '0.1em'}}>
              DEVELOPER
            </span>
            {/* Socials row directly under DEVELOPER */}
            <div className="socials-row flex flex-row items-center justify-center gap-5 sm:gap-6 mt-6 mb-3 sm:mt-4 sm:mb-2">
              <a href="#" className="shine-hover w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-white">
                {/* LinkedIn (Heroicons outline) */}
                <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 sm:w-5 sm:h-5">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11v5m0-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 5v-3a2 2 0 0 1 4 0v3m-4-3v3m4-3v3"/>
                </svg>
              </a>
              <a href="https://github.com/Trex099" target="_blank" rel="noopener noreferrer" className="shine-hover w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-white">
                {/* GitHub (simple outline) */}
                <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.166 6.84 9.49.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.7.12 2.5.35 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z"/>
                </svg>
              </a>
              <a href="#" className="shine-hover w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-white">
                {/* Document (Heroicons outline) */}
                <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"/>
                  <polyline points="16 3 16 8 21 8"/>
                </svg>
              </a>
            </div>
            <a
              href="mailto:arshgour16@gmail.com?subject=Portfolio%20Inquiry"
              className="contact-btn shine-hover mt-4 sm:mt-2 px-6 py-2.5 sm:px-7 border border-white text-white rounded-full flex items-center gap-2 text-base sm:text-lg font-semibold hover:bg-white/10 transition shadow-lg whitespace-nowrap align-middle"
              style={{
                height: 'fit-content'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-7-7 18-2-7-7-2z" /></svg>
              <span>Contact me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
