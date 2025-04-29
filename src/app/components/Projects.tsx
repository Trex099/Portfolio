import React from "react";

const projects = [
  {
    name: "Project One",
    description: "A showcase project with modern web technologies.",
    link: "#",
  },
  {
    name: "Project Two",
    description: "A dashboard for managing business analytics.",
    link: "#",
  },
  {
    name: "Project Three",
    description: "A portfolio site for creative professionals.",
    link: "#",
  },
];

const Projects = () => (
  <section id="projects" className="py-16 flex flex-col items-center justify-center w-full bg-transparent">
    <h2 className="text-2xl font-bold text-white mb-8">Projects</h2>
    <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
      {projects.map((project, idx) => (
        <a
          key={idx}
          href={project.link}
          className="bg-black/40 p-6 rounded-xl shadow-lg flex flex-col gap-2 hover:scale-105 transition-transform border border-white/10"
        >
          <div className="text-lg font-semibold text-white">{project.name}</div>
          <div className="text-white/60 text-sm">{project.description}</div>
        </a>
      ))}
    </div>
  </section>
);

export default Projects;
