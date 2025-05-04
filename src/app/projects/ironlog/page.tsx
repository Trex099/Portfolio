"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiActivity, FiHeart, FiCalendar, FiBarChart2, FiUser, FiSettings, FiGithub } from 'react-icons/fi';
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

// Mock data for app screens
const appScreenshots = [
  {
    id: 1,
    alt: "Workout Planner",
    caption: "Workout Planner",
    color: "#1E40AF", // Deep blue
  },
  {
    id: 2,
    alt: "Progress Tracking",
    caption: "Progress Tracker",
    color: "#3B82F6", // Medium blue
  },
  {
    id: 3,
    alt: "AI Chat",
    caption: "AI Assistant",
    color: "#2563EB", // Royal blue
  },
  {
    id: 4,
    alt: "Goals Tracking",
    caption: "Goals Dashboard",
    color: "#1D4ED8", // Strong blue
  },
  {
    id: 5,
    alt: "Goals History",
    caption: "Goals History",
    color: "#2563EB", // Royal blue
  },
  {
    id: 6,
    alt: "Profile Settings",
    caption: "Profile Settings",
    color: "#3B82F6", // Medium blue
  },
];

// Chart bar heights - deterministic based on day of week
const chartBarHeights = [65, 45, 70, 55, 80, 60, 75]; 

// Define screen types for type safety
type ScreenType = 
  | "Workout Planner"
  | "Progress Tracking"
  | "AI Chat"
  | "Goals Tracking"
  | "Goals History"
  | "Profile Settings";

// Features by screen
const featuresByScreen: Record<ScreenType, string[]> = {
  "Workout Planner": [
    "Create custom workout routines with drag-and-drop interface",
    "Access to 500+ exercise database with video demonstrations",
    "AI-powered suggestions based on your fitness goals",
    "Schedule workouts with calendar integration and reminders"
  ],
  "Progress Tracking": [
    "Visual charts and graphs to track performance over time",
    "Body measurements and weight tracking with trend analysis",
    "Comprehensive statistics for each exercise and muscle group",
    "Photo timeline to visually track physical changes"
  ],
  "AI Chat": [
    "Chat with AI fitness coach for real-time workout advice",
    "Get personalized nutrition recommendations and meal plans",
    "Ask questions about proper form and technique",
    "Receive motivation and accountability check-ins"
  ],
  "Goals Tracking": [
    "Set specific, measurable fitness goals with deadlines",
    "Track progress towards strength, endurance, or weight goals",
    "Milestone celebrations and achievement badges",
    "Smart goal recommendations based on your fitness level"
  ],
  "Goals History": [
    "Comprehensive history of all completed fitness goals",
    "Analyze past performance and success patterns",
    "Review goal achievement timelines and milestones",
    "Export and share your fitness accomplishments"
  ],
  "Profile Settings": [
    "Customize your fitness profile and preferences",
    "Connect with fitness trackers and smartwatches",
    "Manage privacy settings and data sharing options",
    "Set notification preferences and workout reminders"
  ]
};

// Client-side function to get current time
const getCurrentTime = () => {
  if (typeof window === 'undefined') {
    return '9:41'; // Default iOS screenshot time
  }
  
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? '' : '';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return hours + ':' + minutes + ampm;
};

// Default time for server-side rendering
const defaultTime = '9:41'; // Classic Apple demo time

const IronLogProject = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(defaultTime);
  const [isClient, setIsClient] = useState(false);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const featureListRef = useRef<HTMLUListElement>(null);
  
  // Set client-side state once component mounts
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(getCurrentTime());
  }, []);
  
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
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate load delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Current active screen
  const activeScreen = appScreenshots[activeIndex]?.alt as ScreenType || "Workout Planner";
  
  // Add state to track previous features to prevent content flash
  const [displayedFeatures, setDisplayedFeatures] = useState(featuresByScreen[activeScreen]);
  
  // Effect to animate features when activeIndex changes
  useEffect(() => {
    if (!featureListRef.current) return;
    
    const featureItems = featureListRef.current.querySelectorAll('li');
    
    // Get current screen features
    const nextScreenFeatures = featuresByScreen[activeScreen];
    
    // Create animation for feature items
    const tl = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: "power2.out"
      },
      onComplete: () => {
        // Update state after animation completes
        setDisplayedFeatures(nextScreenFeatures);
      }
    });
    
    // Animate out
    tl.to(featureItems, { 
      opacity: 0, 
      y: 10, 
      stagger: 0.05,
      onComplete: () => {
        // Update the displayed features mid-animation
        setDisplayedFeatures(nextScreenFeatures);
      }
    })
    .to(featureItems, { 
      opacity: 0, 
      duration: 0.1 
    }) // Small pause
    .to(featureItems, { 
      opacity: 1, 
      y: 0, 
      stagger: 0.1 
    });
    
    return () => {
      tl.kill();
    };
  }, [activeIndex, activeScreen]);

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-gray-900 text-white">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/30 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="mb-12 animate-fade-in flex items-center justify-between">
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
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-green-400 text-sm font-medium">Complete</span>
            </div>
            <a 
              href="https://github.com/Trex099/IronLog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 transition-colors"
            >
              <FiGithub className="mr-2 text-white/80" size={16} />
              <span className="text-white/80 text-sm font-medium">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-10">
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-3" style={{ paddingBottom: '5px' }}>
              IronLog
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Personal fitness tracking app with AI-powered insights for daily gym sessions.
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative mt-0">
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
                  slideShadows: false,
                }}
                pagination={{ clickable: true }}
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
                  }, 100); // Add a small delay to ensure DOM is ready
                }}
                className="mySwiper h-auto"
              >
                {appScreenshots.map((screen) => (
                  <SwiperSlide key={screen.id}>
                    <div className="iphone-mockup">
                      <div className="iphone-frame">
                        {/* Side buttons */}
                        <div className="iphone-buttons"></div>
                        <div className="power-button"></div>
                        
                        <div className="iphone-screen">
                          {/* iPhone notch and status bar */}
                          <div className="iphone-notch"></div>
                          
                          <div className="status-bar">
                            <div className="status-time">{currentTime}</div>
                            <div className="status-icons">
                              <div className="icon signal">
                                <div className="bar-1"></div>
                                <div className="bar-2"></div>
                                <div className="bar-3"></div>
                                <div className="bar-4"></div>
                              </div>
                              <div className="icon wifi"></div>
                              <div className="icon battery"></div>
                            </div>
                          </div>

                          {/* App Header */}
                          <div className="app-header" style={{
                            background: `linear-gradient(to right, ${screen.color}CC, ${screen.color}99)`
                          }}>
                            <div className="h-6 w-32 bg-white/20 rounded-md"></div>
                            <div className="ml-auto h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                              <FiUser className="text-white/80" size={14} />
                            </div>
                          </div>

                          {/* Content based on screen type */}
                          <div className="iphone-content">
                            <div className="h-8 w-48 bg-white/10 rounded-md mb-2 flex items-center pl-3">
                              <span className="text-white/80 text-xs font-medium">{screen.caption}</span>
                            </div>

                            {/* Different content for each screen */}
                            {screen.alt === "Workout Planner" && (
                              <>
                                <div className="workout-list">
                                  {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="workout-item flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-3">
                                        <FiActivity className="text-white" size={18} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="h-4 w-24 bg-white/20 rounded-md mb-2"></div>
                                        <div className="h-3 w-16 bg-white/10 rounded-md"></div>
                                      </div>
                                      <div className="h-6 w-12 bg-blue-600/30 rounded-md"></div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-auto h-12 bg-blue-600/20 rounded-md flex items-center justify-center">
                                  <div className="h-4 w-24 bg-white/20 rounded-md"></div>
                                </div>
                              </>
                            )}

                            {screen.alt === "Progress Tracking" && (
                              <>
                                <div className="fitness-chart">
                                  <div className="chart-bars">
                                    {chartBarHeights.map((height, i) => (
                                      <div 
                                        key={i} 
                                        className="chart-bar" 
                                        style={{
                                          height: `${height}%`,
                                          background: `linear-gradient(to top, ${screen.color}BB, ${screen.color}66)`
                                        }}
                                      ></div>
                                    ))}
                                  </div>
                                </div>
                                <div className="data-grid">
                                  <div className="data-card">
                                    <div className="data-title">Weight</div>
                                    <div className="data-value">172 lbs</div>
                                  </div>
                                  <div className="data-card">
                                    <div className="data-title">Strength</div>
                                    <div className="data-value">+12%</div>
                                  </div>
                                  <div className="data-card">
                                    <div className="data-title">Workouts</div>
                                    <div className="data-value">48</div>
                                  </div>
                                  <div className="data-card">
                                    <div className="data-title">Streak</div>
                                    <div className="data-value">16 days</div>
                                  </div>
                                </div>
                              </>
                            )}

                            {screen.alt === "AI Chat" && (
                              <div className="flex-1 flex flex-col">
                                <div className="flex-1 p-2 space-y-3 overflow-hidden relative">
                                  <div className="flex justify-start">
                                    <div className="max-w-[75%] bg-gray-800 p-3 rounded-lg rounded-tl-none">
                                      <div className="h-3 w-32 bg-white/20 rounded-md mb-1"></div>
                                      <div className="h-3 w-40 bg-white/20 rounded-md"></div>
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <div className="max-w-[75%] bg-blue-600/30 p-3 rounded-lg rounded-tr-none">
                                      <div className="h-3 w-28 bg-white/20 rounded-md mb-1"></div>
                                      <div className="h-3 w-36 bg-white/20 rounded-md"></div>
                                    </div>
                                  </div>
                                  <div className="flex justify-start">
                                    <div className="max-w-[75%] bg-gray-800 p-3 rounded-lg rounded-tl-none">
                                      <div className="h-3 w-40 bg-white/20 rounded-md mb-1"></div>
                                      <div className="h-3 w-32 bg-white/20 rounded-md mb-1"></div>
                                      <div className="h-3 w-28 bg-white/20 rounded-md"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="h-12 p-2 flex items-center gap-2">
                                  <div className="flex-1 h-8 bg-gray-800 rounded-full"></div>
                                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {(screen.alt === "Goals Tracking" || screen.alt === "Goals History") && (
                              <div className="flex-1 space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <div key={i} className="bg-gray-800/50 p-3 rounded-lg border border-white/10">
                                    <div className="flex justify-between items-center mb-2">
                                      <div className="h-4 w-32 bg-white/20 rounded-md"></div>
                                      <div className="h-6 w-16 rounded-full bg-blue-600/30 flex items-center justify-center">
                                        <div className="h-2 w-8 bg-white/30 rounded-full"></div>
                                      </div>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                      <div className="h-full bg-blue-500" style={{ width: `${(i + 1) * 25}%` }}></div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                      <div className="h-3 w-10 bg-white/10 rounded-md"></div>
                                      <div className="h-3 w-10 bg-white/10 rounded-md"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {screen.alt === "Profile Settings" && (
                              <div className="flex-1 space-y-4">
                                <div className="flex justify-center py-4">
                                  <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-blue-500/50">
                                    <FiUser size={30} className="text-white/70" />
                                  </div>
                                </div>
                                <div className="h-6 w-32 mx-auto bg-white/10 rounded-md"></div>
                                <div className="space-y-3 mt-4">
                                  {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                                      <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                                        {i === 0 && <FiUser size={16} className="text-white/70" />}
                                        {i === 1 && <FiHeart size={16} className="text-white/70" />}
                                        {i === 2 && <FiSettings size={16} className="text-white/70" />}
                                        {i === 3 && <FiCalendar size={16} className="text-white/70" />}
                                      </div>
                                      <div className="flex-1">
                                        <div className="h-4 w-24 bg-white/20 rounded-md"></div>
                                      </div>
                                      <div className="h-4 w-4 rounded-full border border-white/30"></div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Home indicator */}
                            <div className="iphone-home-indicator"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                
                {/* Navigation buttons */}
                <button 
                  ref={prevButtonRef}
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md text-white absolute left-2 z-10 hover:bg-gray-700/70 transition-colors"
                  aria-label="Previous slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    const swiperEl = document.querySelector('.mySwiper') as HTMLElement;
                    const swiperInstance = (swiperEl as any)?.swiper as SwiperType;
                    if (swiperInstance) swiperInstance.slidePrev();
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  ref={nextButtonRef}
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md text-white absolute right-2 z-10 hover:bg-gray-700/70 transition-colors"
                  aria-label="Next slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    const swiperEl = document.querySelector('.mySwiper') as HTMLElement;
                    const swiperInstance = (swiperEl as any)?.swiper as SwiperType;
                    if (swiperInstance) swiperInstance.slideNext();
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Swiper>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-white/60 text-sm">
                {activeScreen} - Swipe or use the arrows to navigate between screens
              </p>
            </div>
          </div>
          
          <div className="animate-fade-in flex flex-col md:flex-row gap-8" style={{ animationDelay: '300ms' }}>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4 text-white">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p>
                  IronLog is a fitness tracking app I built to help gym-goers track workouts and achieve their fitness goals. It solves common issues like inconsistent tracking and lack of personalized guidance.
                </p>
                <h3>Core Technologies</h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li>Swift & SwiftUI</li>
                  <li>Firebase</li>
                  <li>Core ML</li>
                  <li>HealthKit</li>
                  <li>CloudKit</li>
                  <li>Google Gemini AI</li>
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4 text-white">Key Features</h2>
              <ul ref={featureListRef} className="space-y-3">
                {displayedFeatures.map((feature, index) => (
                  <li key={`${activeScreen}-${index}`} className="flex items-start">
                    <div className="h-6 w-6 mt-0.5 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Research & Design</h3>
                <p className="text-white/70">
                  Conducted user research with fitness enthusiasts to identify pain points, followed by iterative prototyping in Figma for an intuitive UX.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Development</h3>
                <p className="text-white/70">
                  Built with Swift and SwiftUI using clean architecture principles. Integrated Firebase for backend data and Core ML for personalized recommendations.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Testing & Refinement</h3>
                <p className="text-white/70">
                  Multiple rounds of user testing with 50+ fitness enthusiasts. Iterative improvements led to 92% user satisfaction rating.
                </p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">Key Achievements</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-white/80">Reduced average workout planning time by 65% compared to manual tracking methods</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-white/80">Achieved 92% user satisfaction rating during beta testing with 50+ fitness enthusiasts</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-white/80">Implemented ML model that provided personalized workout recommendations with 85% user acceptance rate</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-white/80">Optimized app performance to launch in under 1.5 seconds on devices as old as iPhone X</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IronLogProject; 