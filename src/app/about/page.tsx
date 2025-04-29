import React from "react";

export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center leading-tight">
        Hi, I'm Arsh Gour.<br />
        <span className="block text-lg md:text-xl font-normal mt-3 text-white/90">I build for both web and mobile, handling everything from the first idea to the final launch. I love wearing multiple hats, refining my skills as I go, and always pushing for smoother, smarter experiences for the end user.</span>
      </h1>
      <div className="my-10 border-t border-white/20 w-full"></div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Tech Stack</h2>
        <div className="flex flex-row flex-wrap justify-center gap-4 md:gap-6">
          {/* Match Home/Hero stack UI: icons, layout, classes */}
          <span className="flex flex-col items-center">
            <img src="/tech/nextjs.svg" alt="Next.js" className="w-10 h-10 mb-1" />
            <span className="text-xs md:text-sm text-white/80">Next.js</span>
          </span>
          <span className="flex flex-col items-center">
            <img src="/tech/tailwind.svg" alt="Tailwind CSS" className="w-10 h-10 mb-1" />
            <span className="text-xs md:text-sm text-white/80">Tailwind CSS</span>
          </span>
          <span className="flex flex-col items-center">
            <img src="/tech/typescript.svg" alt="TypeScript" className="w-10 h-10 mb-1" />
            <span className="text-xs md:text-sm text-white/80">TypeScript</span>
          </span>
          <span className="flex flex-col items-center">
            <img src="/tech/lenis.svg" alt="Lenis" className="w-10 h-10 mb-1" />
            <span className="text-xs md:text-sm text-white/80">Lenis</span>
          </span>
          <span className="flex flex-col items-center">
            <img src="/tech/gsap.svg" alt="GSAP" className="w-10 h-10 mb-1" />
            <span className="text-xs md:text-sm text-white/80">GSAP</span>
          </span>
          <span className="flex flex-col items-center">
            <img src="/tech/heroicons.svg" alt="Heroicons" className="w-10 h-10 mb-1" />
            <span className="text-xs md:text-sm text-white/80">Heroicons</span>
          </span>
        </div>
      </div>
    </section>
  );
}
