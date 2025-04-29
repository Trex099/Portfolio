"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure mainRef.current exists
    if (!mainRef.current) return;
    
    // Elements to animate
    const sections = mainRef.current.querySelectorAll('section');
    const footer = document.querySelector('footer');
    
    // Create initial state - elements start from slightly below with opacity 0
    gsap.set(sections, { 
      y: 80, 
      opacity: 0 
    });
    
    gsap.set(footer, { 
      y: 40, 
      opacity: 0 
    });
    
    // Create timeline for smooth staggered animations
    const tl = gsap.timeline({ 
      defaults: { 
        ease: "power3.out" 
      } 
    });
    
    // Animate sections with staggered delay
    tl.to(sections, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      clearProps: "all"
    });
    
    // Animate footer
    tl.to(footer, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      clearProps: "all"
    }, "-=0.3");
    
    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#171c27] to-[#0a2a25] text-white overflow-x-hidden">
      <Navbar />
      <main ref={mainRef} className="flex flex-col items-center justify-center w-full">
        <Hero />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <footer className="w-full py-8 flex flex-col items-center text-xs text-white/40">
        <span>© {new Date().getFullYear()} Arsh Gour. All rights reserved.</span>
      </footer>
    </div>
  );
}
