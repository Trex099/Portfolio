"use client";
import React, { useEffect, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import gsap from 'gsap';

const IronLogProject = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Function to handle navigation and scrolling
  const handleBackToProjects = () => {
    // Use direct window.location navigation with hash for a complete refresh
    window.location.href = '/#projects';
  };
  
  useEffect(() => {
    if (!pageRef.current) return;
    
    const elements = pageRef.current.querySelectorAll('.animate-fade-in');
    
    // Set initial state
    gsap.set(elements, { y: 30, opacity: 0 });
    
    // Create animation timeline
    const tl = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: "power2.out"
      }
    });
    
    // Animate elements with stagger
    tl.to(elements, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div 
      ref={pageRef}
      className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,119,198,0.3),transparent)]"></div>
      
      <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <div className="mb-12 animate-fade-in">
          <a 
            onClick={handleBackToProjects}
            className="cursor-pointer"
          >
            <div className="inline-block transition-colors rounded-md py-3 px-4 -ml-4">
              <div className="flex items-center">
                <FiArrowLeft className="mr-2 text-white/80" size={18} />
                <span className="text-white/80 hover:text-white">Back to projects</span>
              </div>
            </div>
          </a>
        </div>
        
        <div className="flex flex-col gap-12">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
              IronLog
            </h1>
            <p className="text-xl text-white/70">Personal Fitness Tracking App</p>
          </div>
          
          <div className="rounded-xl bg-black/40 border border-white/10 p-6 md:p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <p className="text-white/70 leading-relaxed">
              Coming soon - Detailed project information will be available here.
            </p>
          </div>
          
          <div className="rounded-xl bg-black/40 border border-white/10 p-6 md:p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-white/20">
                Swift
              </span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-white/20">
                SwiftUI
              </span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-white/20">
                Firebase
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IronLogProject; 