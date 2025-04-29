"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const workExperience = [
  {
    company: "FrontEnd Web Developer (Private Company, Personal)",
    role: "",
    date: "Jan 2021 - Present",
    description: "Web Design, Web Development, Wordpress, Dashboards, E-commerce.",
  },
  {
    company: "BackEnd Developer (Private Company, Personal)",
    role: "",
    date: "Aug 2020 - Present",
    description: "Database, Server-Side Logic, API Development, Authentication & Authorization, Performance Optimization, Security",
  },
  {
    company: "App Developer (Private Company, Personal Projects)",
    role: "",
    date: "July 2020 - Present",
    description: "UI/UX Implementation, Feature Development, API Integration, State Management, Testing and Debugging, Performance Optimization, Publishing & Updates, Device Compatibility, Android and IOS.",
  },
];

const studies = [
  {
    company: "Nios (Open Schooling)",
    role: "Senior Secondary school",
    date: "April 2025-present",
    description: "",
  },
  {
    company: "Mount Litera School",
    role: "Junior year",
    date: "May 2024-April 2025",
    description: "",
  },
  {
    company: "Seventh Day inter College School",
    role: "Secondary School Certificate",
    date: "April 2009- May 2024",
    description: "",
  },
];


const Experience = () => {
  const [tab, setTab] = useState<'work' | 'studies'>('work');
  const boxRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize all animations after component mounts 
  useEffect(() => {
    if (!ulRef.current || typeof window === "undefined") return;
    
    // Get all timeline items
    const timelineItems = ulRef.current.querySelectorAll('li');
    const title = document.querySelector('#experience h2');
    const tabsContainer = document.querySelector('#experience .rounded-full');
    
    // Initial states
    gsap.set(title, { y: 20, opacity: 0 });
    gsap.set(tabsContainer, { y: 20, opacity: 0 });
    gsap.set(timelineItems, { x: 20, opacity: 0 });
    
    // Create timeline for immediate animations without scroll dependency
    const tl = gsap.timeline({
      defaults: {
        duration: 0.4,
        ease: "power2.out"
      }
    });
    
    // Animate section title and tabs immediately
    tl.to(title, { y: 0, opacity: 1 })
      .to(tabsContainer, { y: 0, opacity: 1 }, "-=0.2");
    
    // Animate the first 3 items immediately with a short stagger
    const visibleItems = Array.from(timelineItems).slice(0, 3);
    tl.to(visibleItems, {
      x: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.5
    }, "-=0.1");
    
    // Only use ScrollTrigger for items that might be below the fold
    if (timelineItems.length > 3) {
      const belowFoldItems = Array.from(timelineItems).slice(3);
      belowFoldItems.forEach((item, index) => {
        gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.05 * index, // Reduced delay
          scrollTrigger: {
            trigger: item,
            start: "top 90%", // Trigger earlier (higher in the viewport)
            toggleActions: "play none none none"
          }
        });
      });
    }
    
    return () => {
      // Clean up all ScrollTriggers and timelines
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [tab]); // Re-run when tab changes

  return (
    <section id="experience" className="w-full flex flex-col items-center justify-center py-16 bg-transparent">
      <h2 className="text-2xl font-bold text-white mb-8 w-full max-w-2xl mx-auto">Experience</h2>
      {/* Tabs in their own pill box */}
      <div className="w-full max-w-2xl mx-auto flex justify-center mb-2">
        <div className="flex w-full bg-black/60 border border-white/20 rounded-full shadow p-1 gap-0">
          <button
            className={`flex-1 py-2 rounded-full font-semibold text-base transition ${tab === 'work' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
            onClick={() => setTab('work')}
          >
            Work
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-semibold text-base transition ${tab === 'studies' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
            onClick={() => setTab('studies')}
          >
            Studies
          </button>
        </div>
      </div>
      {/* Timeline/content box below */}
      <div
        ref={boxRef}
        className="w-full max-w-2xl mx-auto bg-black/40 border border-white/20 rounded-xl p-2 shadow-lg mt-2"
      >
        {/* Timeline with single continuous line like reference image */}
        <div className="relative" style={{paddingTop: '2px', paddingBottom: '2px'}}>
          {/* Single continuous thin vertical line exactly like reference */}
          <div 
            className="absolute bg-white" 
            style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              bottom: 0,
              width: '1px', /* Thin white line matching reference */
              zIndex: 1
            }}
          ></div>
          
          {/* Timeline entries */}
          <ul 
            ref={ulRef} 
            className="m-0 p-0" 
            style={{
              listStyle: 'none'
            }}
          >
            {(tab === 'work' ? workExperience : studies).map((item, idx, arr) => (
              <li 
                key={idx} 
                className="flex items-start" 
                style={{
                  marginBottom: idx === arr.length - 1 ? '0' : '24px', /* Natural spacing exactly like reference */
                  position: 'relative',
                  paddingLeft: '0'
                }}
              >
                {/* Simple avatar circle positioned over the continuous line */}
                <div style={{width: '48px', position: 'relative', display: 'flex', justifyContent: 'center', marginRight: '16px'}}>
                  {/* White background cover to hide the line behind the circle */}
                  <div className="absolute bg-black" style={{
                    width: '20px',
                    height: '100%',
                    left: '14px',
                    zIndex: 1
                  }}></div>
                  
                  {/* Avatar circle positioned exactly over the continuous line */}
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-white overflow-hidden" style={{
                    zIndex: 2, 
                    position: 'relative'
                  }}>
                    {/* Use logo if available, otherwise initial */}
                    {item.company === 'Digital Perspective' && (
                      <img src="/digitalperspective.svg" alt="Digital Perspective" className="w-10 h-10 object-contain" />
                    )}
                    {item.company === 'Bitlink' && (
                      <img src="/bitlink.svg" alt="Bitlink" className="w-10 h-10 object-contain" />
                    )}
                    {!['Digital Perspective', 'Bitlink'].includes(item.company) && (
                      <span className="text-lg font-bold text-gray-700">{item.company[0]}</span>
                    )}
                  </div>
                </div>
                {/* Content */}
                <div>
                  <div className="text-white/60 text-xs mb-1">{item.date}</div>
                  <div className="font-semibold text-white">{item.company}</div>
                  {/* Only show role if it exists and we're in studies tab */}
                  {tab === 'studies' && item.role && (
                    <div className="text-white/60 text-sm">{item.role}</div>
                  )}
                  <div className="text-white/80 text-sm mt-1">{item.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
