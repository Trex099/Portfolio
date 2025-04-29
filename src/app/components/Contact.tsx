import React from "react";

const Contact = () => (
  <section id="contact" className="py-16 flex flex-col items-center justify-center w-full">
    <h2 className="text-2xl font-bold text-white mb-8">Contact</h2>
    <form className="flex flex-col gap-4 w-full max-w-md bg-black/40 p-8 rounded-xl shadow-lg">
      <input
        type="text"
        placeholder="Name"
        className="px-4 py-2 rounded bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none"
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none"
        required
      />
      <textarea
        placeholder="Message"
        className="px-4 py-2 rounded bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none"
        rows={5}
        required
      />
      <button
        type="submit"
        className="mt-2 px-6 py-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition"
      >
        Send Message
      </button>
    </form>
  </section>
);

export default Contact;
