import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center items-center py-6 bg-transparent">
      <div className="rounded-full border border-white/20 bg-white/5 px-10 py-3 shadow backdrop-blur flex">
        <ul className="flex gap-8 text-white/80 font-medium text-base">
          <li>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
