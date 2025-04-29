import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center items-center py-6 bg-transparent backdrop-blur-sm">
      <ul className="flex gap-6 text-white/80 font-medium text-sm md:text-base">
        <li>
          <a href="#home" className="hover:text-white transition-colors">Home</a>
        </li>
        <li>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </li>
        <li>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
