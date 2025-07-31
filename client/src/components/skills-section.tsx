import { useState } from "react";
import SkillIcon from "./skill-icon";
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiHtml5, 
  SiCss3, 
  SiPostgresql, 
  SiGit, 
  SiGo, 
  SiDocker,
  SiTailwindcss,
  SiNextdotjs
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, color: "text-blue-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "Go", icon: SiGo, color: "text-cyan-400" },
  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
];

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-cyan-400">Skills</span> & Technologies
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        
        {/* Skills Container with Center Tooltip */}
        <div className="relative">
          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {skills.map((skill) => (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <SkillIcon skill={skill} />
              </div>
            ))}
          </div>
          
          {/* Center Hover Tooltip */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className={`transition-all duration-300 ${hoveredSkill ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-400/50 rounded-2xl px-8 py-4 shadow-2xl">
                <h3 className="text-2xl font-bold text-cyan-400 text-center whitespace-nowrap">
                  {hoveredSkill || "Hover over a skill"}
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Skills */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-400 transition-all duration-300 group">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4 group-hover:text-cyan-300">Frontend Development</h3>
            <p className="text-slate-300 mb-4">Building responsive, interactive user interfaces with modern frameworks and libraries.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Next.js</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Three.js</span>
            </div>
          </div>
          
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-400 transition-all duration-300 group">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4 group-hover:text-cyan-300">Backend Development</h3>
            <p className="text-slate-300 mb-4">Creating scalable server-side applications and APIs with modern technologies.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">PostgreSQL</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Drizzle ORM</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Go</span>
            </div>
          </div>
          
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-400 transition-all duration-300 group">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4 group-hover:text-cyan-300">DevOps & Tools</h3>
            <p className="text-slate-300 mb-4">Managing development workflows, deployment, and infrastructure.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Git</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Docker</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">AWS</span>
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
