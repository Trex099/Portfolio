import React from "react";
import Navbar from "../components/Navbar";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#171c27] to-[#0a2a25]">
      <Navbar />
      <section className="flex flex-col items-center justify-center pt-32 pb-8 text-center sm:pt-36 sm:pb-10 text-white">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-white/80">This page is under construction.</p>
      </section>
    </div>
  );
}
