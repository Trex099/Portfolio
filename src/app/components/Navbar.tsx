import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center items-center py-6 bg-transparent">
      <div className="rounded-full border border-white/20 bg-white/5 px-10 py-3 shadow backdrop-blur flex">
        <ul className="flex gap-8 text-white/80 font-medium text-base">
          <li>
            <a href="/" className="hover:text-white transition-colors">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-white transition-colors">About</a>
          </li>
          <li>
            <a href="/projects" className="hover:text-white transition-colors">Projects</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
