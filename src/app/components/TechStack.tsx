import React from "react";
import Image from "next/image";

// Technologies in a single flat list like in the reference image
const techStack = [
  { name: "Javascript", icon: "/icons/js.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Typescript", icon: "/icons/ts.svg", url: "https://www.typescriptlang.org/" },
  { name: "PHP", icon: "/icons/php.svg", url: "https://www.php.net/" },
  { name: "Python", icon: "/icons/python.svg", url: "https://www.python.org/" },
  { name: "C", icon: "/icons/c.svg", url: "https://en.cppreference.com/w/c" },
  { name: "C++", icon: "/icons/cpp.svg", url: "https://isocpp.org/" },
  { name: "React", icon: "/icons/react.svg", url: "https://react.dev/" },
  { name: "React Native", icon: "/icons/react-native.svg", url: "https://reactnative.dev/" },
  { name: "Flutter", icon: "/icons/flutter.svg", url: "https://flutter.dev/" },
  { name: "Swift", icon: "/icons/swift.svg", url: "https://developer.apple.com/swift/" },
  { name: "Kotlin", icon: "/icons/kotlin.svg", url: "https://kotlinlang.org/" },
  { name: "UIKit", icon: "/icons/uikit.svg", url: "https://developer.apple.com/documentation/uikit" },
  { name: "Vue.js", icon: "/icons/vue.svg", url: "https://vuejs.org/" },
  { name: "Next.js", icon: "/icons/nextjs.svg", url: "https://nextjs.org/" },
  { name: "Node.js", icon: "/icons/nodejs.svg", url: "https://nodejs.org/" },
  { name: "Tailwind CSS", icon: "/icons/tailwind.svg", url: "https://tailwindcss.com/" },
  { name: "MySQL", icon: "/icons/mysql.svg", url: "https://www.mysql.com/" },
  { name: "Supabase", icon: "/icons/supabase.svg", url: "https://supabase.com/" },
  { name: "Firebase", icon: "/icons/firebase.svg", url: "https://firebase.google.com/" },
  { name: "Shopify", icon: "/icons/shopify.svg", url: "https://www.shopify.com/" },
  { name: "Git", icon: "/icons/git.svg", url: "https://git-scm.com/" },
  { name: "GitHub", icon: "/icons/github.svg", url: "https://github.com/" },
  { name: "Photoshop", icon: "/icons/photoshop.svg", url: "https://www.adobe.com/products/photoshop.html" },
  { name: "Illustrator", icon: "/icons/illustrator.svg", url: "https://www.adobe.com/products/illustrator.html" },
];

const PROJECT_TITLE = "Portfolio";

const TechStack = () => (
  <section id="techstack" className="w-full flex flex-col items-center justify-center py-16 bg-transparent">
    {/* Title Row: Project Title & Tech Stack */}
    <div className="w-full max-w-4xl mx-auto flex flex-row items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">{PROJECT_TITLE}</h2>
      <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
    </div>
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-4 items-center" style={{columnGap: '28px', rowGap: '18px'}}>
        {techStack.map((tech) => (
          <a
            key={tech.name}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-black/70 rounded-xl px-4 py-2 gap-2 min-w-[120px] transition-transform transition-shadow duration-200 hover:scale-105 hover:shadow-xl hover:bg-black/90 cursor-pointer"
          >
            <Image src={tech.icon} alt={tech.name} width={24} height={24} />
            <span className="text-white text-sm font-medium">{tech.name}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
