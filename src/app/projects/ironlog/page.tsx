"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './swiper-styles.css';

// Mock data for screenshots (to be replaced with real images)
const appScreenshots = [
  {
    id: 1,
    alt: "Dashboard",
    caption: "Workout Dashboard",
    color: "#1E40AF", // Deep blue
  },
  {
    id: 2,
    alt: "Exercise Library",
    caption: "Exercise Library",
    color: "#047857", // Deep green
  },
  {
    id: 3,
    alt: "Progress Tracking",
    caption: "Progress Tracker",
    color: "#7E22CE", // Deep purple
  },
  {
    id: 4,
    alt: "Workout Planner",
    caption: "Workout Planner",
    color: "#B91C1C", // Deep red
  },
  {
    id: 5,
    alt: "Profile Settings",
    caption: "Profile Settings",
    color: "#0F766E", // Teal
  },
];

const IronLogProject = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  
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

  useEffect(() => {
    // Simulate load delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={pageRef}
      className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,119,198,0.3),transparent)]"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
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
          
          <div className="rounded-xl bg-black/40 border border-white/10 p-6 md:p-10 shadow-lg animate-fade-in overflow-hidden">
            <h2 className="text-2xl font-bold mb-8">Project Overview</h2>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              {/* Swiper carousel with iPhone-sized screenshots */}
              <div className="w-full lg:w-1/2 flex justify-center relative">
                <div className="w-full max-w-[500px] pt-10 pb-6">
                  <div 
                    className={`w-full max-w-[500px] relative transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="flex items-center justify-center">
                      <button 
                        ref={prevButtonRef}
                        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md text-white absolute left-2 z-10 hover:bg-gray-700/70 transition-colors"
                        aria-label="Previous slide"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <Swiper
                        initialSlide={2}
                        effect={'coverflow'}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                          rotate: 0,
                          stretch: 0,
                          depth: 100,
                          modifier: 2.5,
                          slideShadows: false,
                        }}
                        grabCursor={true}
                        pagination={false}
                        navigation={{
                          prevEl: prevButtonRef.current,
                          nextEl: nextButtonRef.current,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation, A11y]}
                        spaceBetween={-15}
                        loop={false}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        onSwiper={(swiper: SwiperType) => {
                          // Update Swiper with navigation buttons after initialization
                          setTimeout(() => {
                            if (swiper.navigation && prevButtonRef.current && nextButtonRef.current) {
                              swiper.navigation.prevEl = prevButtonRef.current;
                              swiper.navigation.nextEl = nextButtonRef.current;
                              swiper.navigation.init();
                              swiper.navigation.update();
                            }
                          });
                        }}
                        className="mySwiper h-auto"
                      >
                        {appScreenshots.map((screenshot, index) => (
                          <SwiperSlide key={screenshot.id} className="swiper-slide" style={{ width: 'auto' }}>
                            <div className="iphone-mockup">
                              <div className="iphone-notch"></div>
                              <div className="iphone-screen">
                                <div 
                                  className="iphone-screen-content"
                                  style={{ 
                                    background: `linear-gradient(135deg, ${screenshot.color}CC, rgba(0,0,0,0.85))`,
                                  }}
                                >
                                  <div className="flex flex-col items-center justify-center h-full px-4 text-white">
                                    <div className="w-14 h-14 mb-4 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                                      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0-16l-4 4m4-4l4 4" />
                                      </svg>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{screenshot.alt}</h3>
                                    <p className="text-xs opacity-80">{screenshot.caption}</p>
                                    <div className="mt-5 px-4 py-2 rounded-lg bg-white/10 text-xs backdrop-blur-sm">
                                      {index === activeIndex ? "Coming Soon" : ""}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="iphone-home-indicator"></div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      
                      {/* Slide Counter */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-10 mt-4 mb-2">
                        {activeIndex + 1}/{appScreenshots.length}
                      </div>
                      
                      <button 
                        ref={nextButtonRef}
                        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md text-white absolute right-2 z-10 hover:bg-gray-700/70 transition-colors"
                        aria-label="Next slide"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description section */}
              <div className="w-full lg:w-1/2 space-y-6">
                <p className="text-white/70 leading-relaxed text-lg">
                  IronLog is a personal fitness tracking app designed for daily gym sessions, featuring AI integration that logs your workouts and provides intelligent, personalized insights through chat.
                </p>
                
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                      <span>Intelligent workout tracking with AI assistance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                      <span>Personalized insights and analytics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                      <span>Progress tracking with visual charts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                      <span>Intuitive, clean user interface</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pt-3">
                  <p className="text-white/50 text-sm italic">
                    Full case study and additional details coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-black/40 border border-white/10 p-6 md:p-10 shadow-lg animate-fade-in">
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