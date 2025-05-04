"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiBarChart2, FiPieChart, FiUsers, FiSettings, FiGrid, FiDollarSign } from 'react-icons/fi';
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

// Mock data for dashboard screens
const dashboardScreens = [
  {
    id: 1,
    alt: "Overview Dashboard",
    caption: "Overview Dashboard",
    color: "#1E40AF", // Deep blue
  },
  {
    id: 2,
    alt: "Sales Analytics",
    caption: "Sales Analytics",
    color: "#047857", // Deep green
  },
  {
    id: 3,
    alt: "User Management",
    caption: "User Management",
    color: "#7E22CE", // Deep purple
  },
  {
    id: 4,
    alt: "Financial Reports",
    caption: "Financial Reports",
    color: "#B91C1C", // Deep red
  },
  {
    id: 5,
    alt: "Inventory Tracking",
    caption: "Inventory Tracking",
    color: "#0F766E", // Teal
  },
  {
    id: 6,
    alt: "Settings Panel",
    caption: "Settings Panel",
    color: "#4B5563", // Gray
  },
];

// Define screen types for type safety
type ScreenType = 
  | "Overview Dashboard"
  | "Sales Analytics"
  | "User Management"
  | "Financial Reports"
  | "Inventory Tracking"
  | "Settings Panel";

// Features by screen
const featuresByScreen: Record<ScreenType, string[]> = {
  "Overview Dashboard": [
    "Real-time business KPI monitoring and visualization",
    "Customizable widget layout with drag-and-drop functionality",
    "Responsive design that adapts to any screen size",
    "Dark and light mode with personalized color themes"
  ],
  "Sales Analytics": [
    "Interactive charts and graphs for sales performance tracking",
    "Advanced filtering options for precise data analysis",
    "Forecasting algorithms to predict future sales trends",
    "Export capabilities for reports in multiple formats"
  ],
  "User Management": [
    "Comprehensive user role and permission management",
    "Detailed activity logs and audit trails for security",
    "Bulk actions for efficient user administration",
    "Integrated messaging system for team collaboration"
  ],
  "Financial Reports": [
    "Automated financial statement generation (P&L, balance sheet)",
    "Custom reporting periods with comparative analysis",
    "Tax calculation and compliance tracking",
    "Budget planning and variance analysis tools"
  ],
  "Inventory Tracking": [
    "Real-time inventory level monitoring across locations",
    "Automated reorder point notifications and purchasing",
    "Barcode and QR code scanning integration",
    "Supply chain visualization and bottleneck detection"
  ],
  "Settings Panel": [
    "Granular system configuration options",
    "White-label capabilities for branding customization",
    "Integration management with third-party services",
    "Backup and restore functionality for data security"
  ]
};

const DashboardProject = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const featureListRef = useRef<HTMLUListElement>(null);
  
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

  // Current active screen
  const activeScreen = dashboardScreens[activeIndex]?.alt as ScreenType || "Overview Dashboard";
  
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

  // Function to generate random number for chart bars
  const getRandomHeight = () => {
    return 20 + Math.floor(Math.random() * 80);
  };

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-gray-900 text-white">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-900/30 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
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
          
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-blue-400 text-sm font-medium">In Development</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-12">
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 mb-6">
              Business Analytics Dashboard
            </h1>
            <p className="text-white/70 text-lg max-w-3xl">
              A comprehensive business intelligence platform designed to transform complex data into actionable insights through interactive visualizations and real-time analytics.
            </p>
          </div>
          
          <div className="animate-fade-in flex flex-col md:flex-row gap-8" style={{ animationDelay: '200ms' }}>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4 text-white">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p>
                  The Business Analytics Dashboard is a powerful web application that enables organizations to visualize and analyze their business data in real-time. Built with a modern tech stack including React, TypeScript, and D3.js, it offers an intuitive and responsive interface for making data-driven decisions.
                </p>
                <p>
                  This project addresses the challenges businesses face when trying to extract meaningful insights from large datasets. It provides customizable dashboards, interactive reports, and automated analytics that help stakeholders at all levels understand performance metrics and identify opportunities for growth.
                </p>
                <h3>Core Technologies</h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li>React & TypeScript</li>
                  <li>D3.js & Chart.js</li>
                  <li>Node.js & Express</li>
                  <li>PostgreSQL</li>
                  <li>GraphQL</li>
                  <li>Redis</li>
                  <li>Docker</li>
                  <li>AWS Infrastructure</li>
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4 text-white">Key Features</h2>
              <ul ref={featureListRef} className="space-y-3">
                {displayedFeatures.map((feature, index) => (
                  <li key={`${activeScreen}-${index}`} className="flex items-start">
                    <div className="h-6 w-6 mt-0.5 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">Interactive Mockups</h2>
            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative">
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
                  {dashboardScreens.map((screen) => (
                    <SwiperSlide key={screen.id}>
                      <div className="dashboard-mockup">
                        {/* Sidebar */}
                        <div className="dashboard-sidebar">
                          <div className="sidebar-icon mb-8">
                            <div className="nav-icon" style={{ background: 'white' }}></div>
                          </div>
                          {screen.alt === "Overview Dashboard" && <div className="sidebar-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.3)' }}><FiGrid size={18} color="white" /></div>}
                          {screen.alt === "Sales Analytics" && <div className="sidebar-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.3)' }}><FiBarChart2 size={18} color="white" /></div>}
                          {screen.alt === "User Management" && <div className="sidebar-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.3)' }}><FiUsers size={18} color="white" /></div>}
                          {screen.alt === "Financial Reports" && <div className="sidebar-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.3)' }}><FiDollarSign size={18} color="white" /></div>}
                          {screen.alt === "Inventory Tracking" && <div className="sidebar-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.3)' }}><FiPieChart size={18} color="white" /></div>}
                          {screen.alt === "Settings Panel" && <div className="sidebar-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.3)' }}><FiSettings size={18} color="white" /></div>}
                          <div className="sidebar-icon"><div className="nav-icon"></div></div>
                          <div className="sidebar-icon"><div className="nav-icon"></div></div>
                        </div>

                        {/* Main Dashboard Content */}
                        <div className="dashboard-header" style={{ paddingLeft: '70px' }}>
                          <div className="h-6 w-32 bg-white/20 rounded-md"></div>
                          <div className="ml-auto h-8 w-8 rounded-full bg-white/20"></div>
                        </div>

                        <div className="dashboard-content" style={{ paddingLeft: '70px' }}>
                          <div className="h-10 w-48 bg-white/10 rounded-md mb-2"></div>

                          {/* Charts specific to each screen */}
                          <div className="dashboard-chart">
                            {screen.alt === "Overview Dashboard" && (
                              <div className="chart-bars">
                                {Array.from({ length: 7 }).map((_, i) => (
                                  <div key={i} className="chart-bar" style={{ height: `${getRandomHeight()}%` }}></div>
                                ))}
                              </div>
                            )}
                            {screen.alt === "Sales Analytics" && (
                              <div className="chart-bars">
                                {Array.from({ length: 12 }).map((_, i) => (
                                  <div key={i} className="chart-bar" style={{ height: `${getRandomHeight()}%`, background: `linear-gradient(to top, rgba(5, 150, 105, 0.7), rgba(16, 185, 129, 0.7))` }}></div>
                                ))}
                              </div>
                            )}
                            {screen.alt === "Financial Reports" && (
                              <div className="chart-bars">
                                {Array.from({ length: 4 }).map((_, i) => (
                                  <div key={i} className="chart-bar" style={{ height: `${getRandomHeight()}%`, background: `linear-gradient(to top, rgba(220, 38, 38, 0.7), rgba(248, 113, 113, 0.7))` }}></div>
                                ))}
                              </div>
                            )}
                            {(screen.alt === "User Management" || screen.alt === "Inventory Tracking" || screen.alt === "Settings Panel") && (
                              <div className="flex items-center justify-center h-full">
                                <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                                  {screen.alt === "User Management" && <FiUsers size={40} color="white" />}
                                  {screen.alt === "Inventory Tracking" && <FiPieChart size={40} color="white" />}
                                  {screen.alt === "Settings Panel" && <FiSettings size={40} color="white" />}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="data-grid">
                            <div className="data-card">
                              <div className="data-title">Total Revenue</div>
                              <div className="data-value">$1,458,213</div>
                            </div>
                            <div className="data-card">
                              <div className="data-title">Growth</div>
                              <div className="data-value">+24.8%</div>
                            </div>
                            <div className="data-card">
                              <div className="data-title">Active Users</div>
                              <div className="data-value">8,549</div>
                            </div>
                            <div className="data-card">
                              <div className="data-title">Conversion</div>
                              <div className="data-value">3.2%</div>
                            </div>
                          </div>

                          <div className="h-12 bg-white/10 rounded-md mt-4"></div>
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
              
              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm">
                  {activeScreen} - Swipe or use the arrows to navigate between screens
                </p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Research & Planning</h3>
                <p className="text-white/70">
                  The project began with extensive research into business analytics needs across industries, followed by comprehensive wireframing and component planning to ensure a scalable architecture.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Development</h3>
                <p className="text-white/70">
                  A modular approach was implemented with reusable chart components, robust data pipeline processing, and a microservices backend architecture for optimal performance.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-white">Testing & Deployment</h3>
                <p className="text-white/70">
                  Extensive usability testing with real business users led to UX refinements, followed by CI/CD pipeline implementation for seamless deployment to AWS infrastructure.
                </p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">Future Roadmap</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                </div>
                <span className="text-white/80">Machine learning integration for predictive analytics and anomaly detection</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                </div>
                <span className="text-white/80">Natural language query processing for non-technical users</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                </div>
                <span className="text-white/80">Expanded data connector library for third-party service integration</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 mt-0.5 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                </div>
                <span className="text-white/80">Mobile native application with offline capabilities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProject; 