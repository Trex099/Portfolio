import React from "react";
import Navbar from "../components/Navbar";
import TechStack from "../components/TechStack";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#171c27] to-[#0a2a25]">
      <Navbar />
      <section className="flex flex-col items-center justify-center pt-32 pb-8 text-center sm:pt-36 sm:pb-10 text-white">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center leading-tight text-white">
          Hi, I'm Arsh Gour.<br />
          <p className="text-lg md:text-xl font-normal mt-3 text-gray-400 max-w-2xl mx-auto">
            I build for both web and mobile, handling everything from the first idea to the final launch. I love wearing multiple hats, refining my skills as I go, and always pushing for smoother, smarter experiences for the end user.
          </p>
        </h1>
        <div className="my-10 border-t border-white/20 w-full"></div>
        <TechStack />
      </section>
    </div>
  );
}
