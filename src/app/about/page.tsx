import React from "react";

export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">About Me</h1>
      <p className="text-lg md:text-xl mb-8 text-center">
        Hi, I'm Arsh Gour.<br />
        I build for both web and mobile, handling everything from the first idea to the final launch. I love wearing multiple hats, refining my skills as I go, and always pushing for smoother, smarter experiences for the end user.
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-10 text-center">Tech Stack</h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {/* Copy the same stack from Home/Hero section */}
        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-base md:text-lg">Next.js</span>
        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-base md:text-lg">Tailwind CSS</span>
        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-base md:text-lg">TypeScript</span>
        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-base md:text-lg">Lenis</span>
        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-base md:text-lg">GSAP</span>
        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-base md:text-lg">Heroicons</span>
      </div>
    </section>
  );
}
