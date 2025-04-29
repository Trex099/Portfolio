import React from "react";
import TechStack from "../components/TechStack";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] pt-16 pb-8 text-center sm:pt-20 sm:pb-10">
      <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center leading-tight">
        Hi, I'm Arsh Gour.<br />
        <span className="block text-lg md:text-xl font-normal mt-3 text-white/90">I build for both web and mobile, handling everything from the first idea to the final launch. I love wearing multiple hats, refining my skills as I go, and always pushing for smoother, smarter experiences for the end user.</span>
      </h1>
      <div className="my-10 border-t border-white/20 w-full"></div>
      <TechStack />
    </section>
  );
}
