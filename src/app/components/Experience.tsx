"use client";
import React, { useState, useRef, useLayoutEffect } from "react";

const workExperience = [
  {
    company: "FrontEnd Web Developer",
    role: "FrontEnd Web Developer",
    date: "Jan 2021 - Present",
    description: "Web Design, Web Development, Wordpress, Dashboards, E-commerce.",
  },
  {
    company: "BackEnd Developer (Private, Freelance)",
    role: "BackEnd Developer (Private, Freelance)",
    date: "Aug 2020 - Present",
    description: "Database, Server-Side Logic, API Development, Authentication & Authorization, Performance Optimization, Security",
  },
  {
    company: "App Developer (Private Company, Personal Projects)",
    role: "App Developer (Private Company, Personal Projects)",
    date: "July 2020 - Present",
    description: "UI/UX Implementation, Feature Development, API Integration, State Management, Testing and Debugging, Performance Optimization, Publishing & Updates, Device Compatibility, Android and IOS.",
  },
];

const studies = [
  {
    company: "Nios (Open Schooling)",
    role: "Senior Secondary school",
    date: "2025-present",
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
    date: "April 2009-2024",
    description: "",
  },
];


const Experience = () => {
  const [tab, setTab] = useState<'work' | 'studies'>('work');
  const boxRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);


  useLayoutEffect(() => {
    if (ulRef.current && boxRef.current) {
      // No longer using boxRect, boxHeight, lineHeight, or ulRect
      // Logic preserved for future extensibility if needed
    }
  }, [tab]);

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
              top: -2,
              bottom: -2,
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
                  {/* Avatar circle positioned exactly over the continuous line */}
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-white overflow-hidden" style={{
                    zIndex: 2, 
                    position: 'relative',
                    transform: 'translateX(-1px)' /* Fine-tune to center exactly on the line */
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
                  <div className="text-white/60 text-sm">{item.role}</div>
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
