"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FiArrowRight, FiActivity } from "react-icons/fi";
import "./HeroShine.css";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface for project data type
interface ProjectData {
  name: string;
  description: string;
  link: string;
  image?: string;
  type?: string;
  technologies?: string[];
}

// Project data - updated for demonstration
const projects: ProjectData[] = [
  {
    name: "IronLog",
    description: "IronLog is a personal fitness tracking app designed for daily gym sessions, featuring AI integration that logs your workouts and provides intelligent, personalized insights through chat.",
    type: "Personal Project",
    technologies: ["Swift", "SwiftUI", "Firebase"],
    link: "/projects/ironlog",
  },
  {
    name: "Project Two",
    description: "A dashboard for managing business analytics.",
    link: "#",
  },
  {
    name: "Project Three",
    description: "A portfolio site for creative professionals.",
    link: "#",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !noteRef.current || !projectsRef.current || typeof window === "undefined") return;
    
    const title = sectionRef.current.querySelector('h2');
    const note = noteRef.current;
    const projectCards = projectsRef.current.querySelectorAll('.project-card');
    
    // Initial state
    if (title) gsap.set(title, { y: 30, opacity: 0 });
    gsap.set(note, { y: 30, opacity: 0 });
    
    if (projectCards && projectCards.length > 0) {
      gsap.set(projectCards, { y: 50, opacity: 0 });
    }
    
    // Create main timeline for immediate animations
    const tl = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: "power2.out"
      }
    });
    
    // Title animation immediately
    if (title) {
      tl.to(title, {
        y: 0,
        opacity: 1
      });
    }
    
    // Special note animation with subtle bounce (immediately)
    tl.to(note, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(1.2)"
    }, "-=0.3");
    
    // Project cards animation with stagger (immediately)
    if (projectCards && projectCards.length > 0) {
      tl.to(projectCards, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");
    }
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Custom project card component
  const ProjectCard = ({ project }: { project: ProjectData }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Ensure hover animations work reliably
    useEffect(() => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      
      // Force hover animations through JS instead of relying on CSS only
      const handleMouseEnter = () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      };
      
      const handleMouseLeave = () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      };
      
      // Initialize card style
      card.style.transition = 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out';
      card.style.willChange = 'transform, box-shadow, border-color';
      
      // Add event listeners
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      // Clean up on unmount
      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);
    
    // For older project data format that might not have all fields
    const hasTechnologies = project.technologies && project.technologies.length > 0;
    const hasImage = !!project.image;
    const hasType = !!project.type;
    
    // Basic card for older project formats
    if (!hasTechnologies) {
      return (
        <a
          href={project.link}
          className="project-card bg-black/40 p-6 rounded-xl shadow-lg flex flex-col gap-2 border border-white/10"
          ref={cardRef as unknown as React.RefObject<HTMLAnchorElement>}
        >
          <div className="text-lg font-semibold text-white">{project.name}</div>
          <div className="text-white/60 text-sm">{project.description}</div>
        </a>
      );
    }
    
    // Custom backgrounds based on project
    const getBackgroundForProject = (name: string) => {
      switch (name) {
        case "IronLog":
          return "bg-gradient-to-r from-blue-600/60 via-purple-600/40 to-indigo-600/60";
        default:
          return "bg-gradient-to-r from-gray-700/40 to-gray-900/40";
      }
    };
    
    // Enhanced card for new project format
    return (
      <div 
        className="project-card rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-lg group"
        ref={cardRef}
      >
        {/* Image Section */}
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"></div>
          
          {/* Background */}
          <div className={`w-full h-full relative ${getBackgroundForProject(project.name)}`}>
            {/* Project-specific elements */}
            {project.name === "IronLog" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center">
                  {/* Abstract fitness app UI mockup */}
                  <div className="w-32 h-56 rounded-xl bg-gray-800/80 border-2 border-white/30 shadow-xl relative overflow-hidden transform -rotate-6">
                    {/* App header */}
                    <div className="h-8 w-full bg-indigo-600 flex items-center px-2">
                      <div className="w-4 h-4 rounded-full bg-white/80 mr-1"></div>
                      <div className="h-2 w-16 bg-white/60 rounded-full"></div>
                    </div>
                    
                    {/* App content */}
                    <div className="p-2 space-y-2">
                      <div className="h-3 w-full bg-white/20 rounded"></div>
                      <div className="h-8 w-full bg-indigo-500/40 rounded"></div>
                      <div className="h-8 w-full bg-indigo-500/40 rounded"></div>
                      <div className="h-2 w-1/2 bg-white/20 rounded"></div>
                      <div className="h-8 w-full bg-indigo-500/40 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Decorative elements - using FiActivity icon which is definitely in react-icons/fi */}
                  <div className="absolute -top-6 -right-6 text-white/80 text-5xl transform rotate-12">
                    <FiActivity />
                  </div>
                </div>
              </div>
            )}
            
            {/* We'll use actual images once they're available */}
            {hasImage && (
              <Image 
                src={project.image || ''} 
                alt={project.name} 
                fill 
                style={{ objectFit: 'cover' }} 
                className="group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
          
          <p className="text-white/70 text-sm mb-4 line-clamp-3">{project.description}</p>
          
          {hasType && (
            <p className="text-white/50 text-xs mb-3">
              {project.type}
            </p>
          )}
          
          {/* Technology Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.map((tech, i) => (
              <span key={i} className="inline-block px-3 py-1 text-xs rounded-full bg-white/10 text-white/90 border border-white/20">{tech}</span>
            ))}
          </div>
          
          {/* Discover Button */}
          <a 
            href={project.link}
            className="inline-flex items-center text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors border border-white/20 mt-2 group-hover:bg-white/20 shine-hover contact-btn"
          >
            <span>Discover</span>
            <FiArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="projects" className="w-full flex flex-col items-center justify-center py-16 bg-transparent">
      <div className="w-full max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6 text-left">Projects</h2>
        
        {/* NDA Note */}
        <div ref={noteRef} className="bg-black/40 p-6 rounded-xl mb-10 border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-3">Note</h3>
          <p className="text-white/80 leading-relaxed">
            Many of the projects I&apos;ve worked on are under strict Non-Disclosure Agreements (NDAs) and cannot be publicly shared. The projects displayed in this portfolio represent only a small fraction of my actual work. I&apos;ve made substantial contributions to private repositories, internal tools, and production systems for clients and companies whose names and GitHub links I am contractually unable to disclose.
          </p>
        </div>
        
        {/* Projects Grid - Now with max of 2 columns */}
        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8 w-full">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
