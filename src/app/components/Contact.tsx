"use client";
import React from "react";

const Contact = () => {
  const handleContactClick = () => {
    const userAgent = window.navigator.userAgent;
    const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent);
    const isLinux = /Linux/i.test(userAgent);
    const isWindows = /Win32|Win64|Windows|WinCE/i.test(userAgent);
    const email = "arshgour16@gmail.com";
    if (isMac) {
      window.location.href = `mailto:${email}`;
    } else if (isLinux || isWindows) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, "_blank");
    } else {
      // Default to mailto for unknown OS
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="py-16 flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-bold text-white mb-8">Contact</h2>
      <button
        onClick={handleContactClick}
        className="px-8 py-3 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition text-lg font-semibold shadow-lg"
      >
        Contact Me
      </button>
    </section>
  );
};

export default Contact;
