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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const workListRef = useRef<HTMLUListElement>(null);
  const studiesListRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const workLineRef = useRef<HTMLDivElement>(null);
  const studiesLineRef = useRef<HTMLDivElement>(null);

  // Initialize animations only on component mount (not when tab changes)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const title = document.querySelector('#experience h2');
    const tabsContainer = document.querySelector('#experience .tabs-container');
    
    // Initial states
    gsap.set(title, { y: 20, opacity: 0 });
    gsap.set(tabsContainer, { y: 20, opacity: 0 });
    
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
    
    // Initial update of timeline line heights
    updateLineHeights();
    
    return () => {
      // Clean up all ScrollTriggers and timelines
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []); // Run only on initial mount
  
  // Separate effect for initializing the timeline items
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Set up animations for the current tab only
    const currentList = tab === 'work' ? workListRef.current : studiesListRef.current;
    if (!currentList) return;
    
    const timelineItems = currentList.querySelectorAll('li');
    
    // Initial states for items
    gsap.set(timelineItems, { x: 20, opacity: 0 });
    
    // Create timeline for immediate animations
    const tl = gsap.timeline({
      defaults: {
        duration: 0.4,
        ease: "power2.out"
      }
    });
    
    // Animate the first 3 items immediately with a short stagger
    const visibleItems = Array.from(timelineItems).slice(0, 3);
    tl.to(visibleItems, {
      x: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.5
    });
    
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
      // Only clean up ScrollTriggers related to this list
      ScrollTrigger.getAll().forEach(st => {
        if (currentList.contains(st.trigger as Element)) {
          st.kill();
        }
      });
      tl.kill();
    };
  }, []); // Only run once on initial mount

  // Function to update line heights
  const updateLineHeights = () => {
    // Update work line
    if (workListRef.current && workLineRef.current) {
      const workHeight = workListRef.current.offsetHeight;
      if (workHeight > 0) {
        workLineRef.current.style.height = `${workHeight}px`;
      }
    }
    
    // Update studies line
    if (studiesListRef.current && studiesLineRef.current) {
      const studiesHeight = studiesListRef.current.offsetHeight;
      if (studiesHeight > 0) {
        studiesLineRef.current.style.height = `${studiesHeight}px`;
      }
    }
  };

  // Effect to update timeline lines when tab changes
  useEffect(() => {
    // Get both lines ready immediately, regardless of which tab is active
    updateLineHeights();
    
    // Set up a resize observer to adjust line heights when content changes
    const resizeObserver = new ResizeObserver(() => {
      updateLineHeights();
    });
    
    // Observe both lists
    if (workListRef.current) {
      resizeObserver.observe(workListRef.current);
    }
    
    if (studiesListRef.current) {
      resizeObserver.observe(studiesListRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [tab]);
  
  // Handle tab switching with animation
  const handleTabChange = (newTab: 'work' | 'studies') => {
    if (tab === newTab || isTransitioning) return;
    
    setIsTransitioning(true);
    
    const currentList = tab === 'work' ? workListRef.current : studiesListRef.current;
    const newList = newTab === 'work' ? workListRef.current : studiesListRef.current;
    
    if (currentList && newList) {
      // Fade out current list
      gsap.to(currentList, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
          // Update state
          setTab(newTab);
          
          // Hide current list
          gsap.set(currentList, { display: 'none' });
          
          // Show new list and ensure line is visible immediately
          gsap.set(newList, { 
            display: 'block', 
            opacity: 0,
            x: 20
          });
          
          // Update line heights immediately before the fade in animation
          updateLineHeights();
          
          // Fade in new list
          gsap.to(newList, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            onComplete: () => {
              setIsTransitioning(false);
              // Update line heights again after animation completes
              updateLineHeights();
            }
          });
        }
      });
    } else {
      // Fallback if refs aren't available
      setTab(newTab);
      setIsTransitioning(false);
    }
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center py-16 bg-transparent"
    >
      <div className="w-full max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6 text-left">Experience</h2>
        
        {/* Tabs in their own pill box - full width */}
        <div className="w-full mb-4 tabs-container">
          <div className="w-full bg-black/60 border border-white/20 rounded-full shadow p-1">
            <button
              className={`w-1/2 py-2 px-6 rounded-full font-semibold text-sm md:text-base transition ${tab === 'work' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
              onClick={() => handleTabChange('work')}
              disabled={isTransitioning}
            >
              Work
            </button>
            <button
              className={`w-1/2 py-2 px-6 rounded-full font-semibold text-sm md:text-base transition ${tab === 'studies' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
              onClick={() => handleTabChange('studies')}
              disabled={isTransitioning}
            >
              Studies
            </button>
          </div>
        </div>
        
        {/* Timeline/content box below */}
        <div
          ref={boxRef}
          className="w-full bg-black/40 border border-white/20 rounded-xl p-4 md:p-5 shadow-xl backdrop-blur-sm"
        >
          {/* Timeline container with line */}
          <div 
            ref={timelineRef}
            className="relative"
          >
            {/* Work experience list - always rendered but conditionally displayed */}
            <ul 
              ref={workListRef} 
              className="m-0 p-0 relative" 
              style={{
                listStyle: 'none',
                display: tab === 'work' ? 'block' : 'none'
              }}
            >
              {/* Vertical line for work list */}
              <div 
                ref={workLineRef}
                className="absolute bg-white" 
                style={{
                  width: '1px',
                  left: '18px', // Adjusted to match the smaller circle
                  top: '0',
                  height: '100%' // Default to 100% as fallback before measurement
                }}
              ></div>
              
              {workExperience.map((item, idx, arr) => (
                <li 
                  key={idx} 
                  className="flex items-start" 
                  style={{
                    marginBottom: idx === arr.length - 1 ? '0' : '24px', // Reduced spacing between items
                    position: 'relative',
                    paddingLeft: '0'
                  }}
                >
                  {/* Circle container */}
                  <div className="w-9 mr-3 md:mr-4 flex justify-center relative">
                    {/* White circle with initial */}
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-2 border-white overflow-hidden z-10 relative shadow-md">
                      <span className="text-base font-bold text-gray-700">{item.company[0]}</span>
                    </div>
                    
                    {/* White background to hide the line */}
                    <div className="absolute bg-black/40 w-3 h-9 left-3 z-[1]"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-white/60 text-xs mb-0.5">{item.date}</div>
                    <div className="font-semibold text-white text-sm md:text-base">{item.company}</div>
                    <div className="text-white/80 text-xs md:text-sm mt-1">{item.description}</div>
                  </div>
                </li>
              ))}
              
              {/* Extra element to ensure line extends to bottom */}
              <div 
                className="absolute bg-white" 
                style={{
                  width: '1px',
                  left: '18px',
                  bottom: '-8px',
                  height: '8px'
                }}
              ></div>
            </ul>
            
            {/* Studies list - always rendered but conditionally displayed */}
            <ul 
              ref={studiesListRef} 
              className="m-0 p-0 relative" 
              style={{
                listStyle: 'none',
                display: tab === 'studies' ? 'block' : 'none'
              }}
            >
              {/* Vertical line for studies list */}
              <div 
                ref={studiesLineRef}
                className="absolute bg-white" 
                style={{
                  width: '1px',
                  left: '18px', // Adjusted to match the smaller circle
                  top: '0',
                  height: '100%' // Default to 100% as fallback before measurement
                }}
              ></div>
              
              {studies.map((item, idx, arr) => (
                <li 
                  key={idx} 
                  className="flex items-start" 
                  style={{
                    marginBottom: idx === arr.length - 1 ? '0' : '24px', // Reduced spacing between items
                    position: 'relative',
                    paddingLeft: '0'
                  }}
                >
                  {/* Circle container */}
                  <div className="w-9 mr-3 md:mr-4 flex justify-center relative">
                    {/* White circle with initial */}
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-2 border-white overflow-hidden z-10 relative shadow-md">
                      <span className="text-base font-bold text-gray-700">{item.company[0]}</span>
                    </div>
                    
                    {/* White background to hide the line */}
                    <div className="absolute bg-black/40 w-3 h-9 left-3 z-[1]"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-white/60 text-xs mb-0.5">{item.date}</div>
                    <div className="font-semibold text-white text-sm md:text-base">{item.company}</div>
                    {/* Only show role if it exists */}
                    {item.role && (
                      <div className="text-white/60 text-xs md:text-sm">{item.role}</div>
                    )}
                    {item.description && (
                      <div className="text-white/80 text-xs md:text-sm mt-1">{item.description}</div>
                    )}
                  </div>
                </li>
              ))}
              
              {/* Extra element to ensure line extends to bottom */}
              <div 
                className="absolute bg-white" 
                style={{
                  width: '1px',
                  left: '18px',
                  bottom: '-8px',
                  height: '8px'
                }}
              ></div>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
