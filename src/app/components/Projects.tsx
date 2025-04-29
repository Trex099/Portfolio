"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    name: "Project One",
    description: "A showcase project with modern web technologies.",
    link: "#",
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
    const projectCards = projectsRef.current.querySelectorAll('a');
    
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

  return (
    <section ref={sectionRef} id="projects" className="w-full flex flex-col items-center justify-center py-16 bg-transparent">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-left">Projects</h2>
        
        {/* NDA Note */}
        <div ref={noteRef} className="bg-black/40 p-6 rounded-xl mb-10 border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-3">Note</h3>
          <p className="text-white/80 leading-relaxed">
            Many of the projects I've worked on are under strict Non-Disclosure Agreements (NDAs) and cannot be publicly shared. The projects displayed in this portfolio represent only a small fraction of my actual work. I've made substantial contributions to private repositories, internal tools, and production systems for clients and companies whose names and GitHub links I am contractually unable to disclose.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-3 gap-8 w-full">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              className="bg-black/40 p-6 rounded-xl shadow-lg flex flex-col gap-2 hover:scale-105 transition-transform border border-white/10"
            >
              <div className="text-lg font-semibold text-white">{project.name}</div>
              <div className="text-white/60 text-sm">{project.description}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
