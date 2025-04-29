import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#171c27] to-[#0a2a25] text-white overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full">
        <Hero />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <footer className="w-full py-8 flex flex-col items-center text-xs text-white/40">
        <span>© {new Date().getFullYear()} Rafael Amaral. All rights reserved.</span>
      </footer>
    </div>
  );
}
