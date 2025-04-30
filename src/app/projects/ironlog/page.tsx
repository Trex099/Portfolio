"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

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
    src: '/projects/ironlog/mockup1.png', // These files will be placeholders until real screenshots are added
    alt: 'IronLog Dashboard',
    caption: 'Dashboard screen showing workout summary'
  },
  {
    id: 2,
    src: '/projects/ironlog/mockup2.png',
    alt: 'Workout Tracking',
    caption: 'Track your workouts with detailed metrics'
  },
  {
    id: 3,
    src: '/projects/ironlog/mockup3.png',
    alt: 'AI Assistant',
    caption: 'Get personalized insights from the AI assistant'
  },
  {
    id: 4,
    src: '/projects/ironlog/mockup4.png',
    alt: 'Progress Tracking',
    caption: 'View your progress over time with detailed analytics'
  },
];

const IronLogProject = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
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

  // Animation for slide captions
  useEffect(() => {
    const captionElement = document.querySelector(`.caption-${activeIndex}`);
    if (captionElement) {
      gsap.fromTo(
        captionElement,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 }
      );
    }
  }, [activeIndex]);
  
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
          
          <div className="rounded-xl bg-black/40 border border-white/10 p-6 md:p-8 shadow-lg animate-fade-in overflow-hidden">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              {/* Swiper carousel with iPhone-sized screenshots */}
              <div className="w-full lg:w-1/2 flex justify-center relative">
                <div className="w-full max-w-[320px]">
                  <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                      slideShadows: true,
                    }}
                    pagination={{ 
                      el: '.swiper-pagination',
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="w-full pb-12"
                  >
                    {appScreenshots.map((screenshot) => (
                      <SwiperSlide key={screenshot.id} className="w-[280px] h-[580px] rounded-3xl overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-b from-indigo-900/40 to-purple-900/40 rounded-3xl border-4 border-white/10 relative overflow-hidden shadow-[0_0_15px_rgba(80,60,200,0.3)]">
                          {/* iPhone mockup with notch */}
                          <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-3xl flex justify-center items-center">
                            <div className="w-32 h-4 bg-black rounded-b-xl"></div>
                          </div>
                          
                          {/* Content area (placeholder for actual screenshots) */}
                          <div className="absolute top-6 left-0 right-0 bottom-0 bg-indigo-900/20 flex items-center justify-center">
                            <div className="text-center px-4">
                              <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                  <span className="text-2xl">#{screenshot.id}</span>
                                </div>
                              </div>
                              <h3 className="text-lg font-bold mb-2">{screenshot.alt}</h3>
                              <p className="text-sm text-white/70">
                                {screenshot.caption}
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                    
                    {/* Custom pagination */}
                    <div className="swiper-pagination mt-6"></div>
                    
                    {/* Slide counter */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/10 px-3 py-1 rounded-full text-xs text-white/80 backdrop-blur-sm">
                      {activeIndex + 1} / {appScreenshots.length}
                    </div>
                  </Swiper>
                </div>
              </div>
              
              {/* Description section */}
              <div className="w-full lg:w-1/2 space-y-4">
                <p className="text-white/70 leading-relaxed">
                  IronLog is a personal fitness tracking app designed for daily gym sessions, featuring AI integration that logs your workouts and provides intelligent, personalized insights through chat.
                </p>
                
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2 text-white/70">
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
                
                <div className="pt-2">
                  <p className="text-white/50 text-sm italic">
                    Full case study and additional details coming soon.
                  </p>
                </div>
              </div>
            </div>
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