"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiActivity } from 'react-icons/fi';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Navigation, Autoplay, A11y } from 'swiper/modules';
import Link from 'next/link';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import './swiper-styles.css';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

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

const ProjectCarousel = () => {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Create an array of image placeholders with gradients
  const images = [
    { id: 1, alt: "Dashboard", gradient: "from-blue-500 to-indigo-600" },
    { id: 2, alt: "Workout Log", gradient: "from-purple-500 to-pink-600" },
    { id: 3, alt: "Exercise Library", gradient: "from-emerald-500 to-teal-600" },
    { id: 4, alt: "Progress Stats", gradient: "from-orange-500 to-red-600" },
    { id: 5, alt: "Settings", gradient: "from-gray-500 to-gray-700" }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto px-4 py-8">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        className="w-full overflow-visible"
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
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="w-auto h-auto">
            {({ isActive }) => (
              <div className={`relative transition-all duration-300 ${isActive ? 'scale-100' : 'scale-90 opacity-70'}`}>
                <div className="relative w-[240px] h-[480px] overflow-hidden rounded-[36px] border-[6px] border-zinc-800 bg-zinc-800 shadow-xl">
                  {/* iPhone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-zinc-800 rounded-b-xl z-10"></div>
                  
                  {/* Phone content area with gradient background */}
                  <div className={`w-full h-full bg-gradient-to-br ${image.gradient} p-4 flex flex-col items-center justify-center`}>
                    <div className="mb-4 bg-white/10 p-3 rounded-full">
                      <FiActivity className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{image.alt}</h3>
                    <p className="text-white/70 text-xs text-center">
                      IronLog fitness tracking app screenshot
                    </p>
                    
                    {/* UI elements mockup */}
                    <div className="mt-6 w-full">
                      <div className="h-1.5 w-3/4 bg-white/20 rounded-full mb-3 mx-auto"></div>
                      <div className="h-1.5 w-1/2 bg-white/20 rounded-full mb-6 mx-auto"></div>
                      
                      <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3].map(n => (
                          <div key={n} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-md bg-white/20"></div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="h-20 w-full bg-white/10 rounded-xl mb-4"></div>
                      <div className="h-3 w-2/3 bg-white/20 rounded-full mx-auto"></div>
                    </div>
                  </div>
                  
                  {/* iPhone home indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full"></div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom navigation buttons */}
      <button 
        ref={prevButtonRef} 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-zinc-900/50 hover:bg-zinc-900 text-white w-10 h-10 rounded-full hidden md:flex items-center justify-center backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        ref={nextButtonRef} 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-zinc-900/50 hover:bg-zinc-900 text-white w-10 h-10 rounded-full hidden md:flex items-center justify-center backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

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
                        pagination={{ 
                          clickable: true,
                          dynamicBullets: true,
                        }}
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