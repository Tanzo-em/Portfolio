import { useState } from "react";
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
  SiNextdotjs,
  SiMongodb,
  SiVercel
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
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "Go", icon: SiGo, color: "text-cyan-400" },
  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
  { name: "Vercel", icon: SiVercel, color: "text-white" },
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
        
        {/* 3D Circular Skills Layout */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Skills Circle Container */}
          <div className="skills-circle-container relative w-[600px] h-[600px]">
            {skills.map((skill, index) => {
              const totalSkills = skills.length;
              const angleStep = 360 / totalSkills;
              const currentAngle = index * angleStep;
              const radius = 220;
              
              // Calculate exact position using trigonometry
              const radians = (currentAngle * Math.PI) / 180;
              const x = 300 + Math.cos(radians - Math.PI / 2) * radius; // 300 is half of container width
              const y = 300 + Math.sin(radians - Math.PI / 2) * radius; // 300 is half of container height
              
              const IconComponent = skill.icon;
              
              return (
                <div
                  key={skill.name}
                  className="skill-orbit-item absolute"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)',
                    '--delay': index,
                  } as React.CSSProperties}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-icon-floating group relative bg-slate-800/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-700/50 hover:border-cyan-400/70 cursor-pointer transform transition-all duration-500 hover:scale-125">
                    <div className={`text-3xl sm:text-4xl group-hover:text-cyan-400 transition-all duration-500 ${skill.color} flex justify-center skill-logo-float`}>
                      <IconComponent />
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"></div>
                  </div>
                </div>
              );
            })}
            
            {/* Center Display - positioned within the circle container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <div className={`transition-all duration-500 ${hoveredSkill ? 'opacity-100 scale-100' : 'opacity-70 scale-90'}`}>
                <div className="bg-slate-900/95 backdrop-blur-md border-2 border-cyan-400/60 rounded-3xl px-8 py-6 shadow-2xl min-w-[200px]">
                  <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 text-center whitespace-nowrap">
                    {hoveredSkill || "Hover to Explore"}
                  </h3>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-3 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl"></div>
                </div>
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
