import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import React, { useRef, useState, useEffect } from "react";

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
  SiVercel,
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [iconPositions, setIconPositions] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize(); // call once on mount

    // Optional: update on window resize
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    // Adjust radius to be slightly smaller for better spacing
    const radius = Math.min(width, height) * 0.38;

    const totalSkills = skills.length;
    const angleStep = (2 * Math.PI) / totalSkills;

    const positions = skills.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top (subtract PI/2)
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });

    setIconPositions(positions);
  }, [containerRef.current, skills]);

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <motion.div
        className="text-center "
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-cyan-400">Skills</span> & Technologies
          </h2>
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"
          initial={{ width: 0 }}
          animate={isInView ? { width: 96 } : { width: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.p
          className="text-muted-foreground mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Passionate about building scalable applications with modern
          technologies. I love exploring new frameworks and tools to create
          exceptional user experiences.
        </motion.p>
      </motion.div>

      {/* 3D Circular Skills Layout */}
      <div className="relative flex items-center justify-center min-h-[600px]">
        {/* Skills Circle Container */}
        <div
          ref={containerRef}
          className="skills-circle-container relative w-[90vw] max-w-[826px] h-[90vw] max-h-[600px]"
        >
          {skills.map((skill, index) => {
            const pos = iconPositions[index];
            if (!pos) return null;

            const IconComponent = skill.icon;

            return (
              <div
                key={skill.name}
                className="skill-orbit-item absolute ml-[-25px]"
                style={
                  {
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    
                    "--delay": index,
                  } as React.CSSProperties
                }
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="skill-icon-floating group relative bg-slate-800/80 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-700/50 hover:border-cyan-400/70 cursor-pointer transform transition-all duration-500 hover:scale-125">
                  <div
                    className={`text-2xl sm:text-3xl md:text-4xl group-hover:text-cyan-400 transition-all duration-500 ${skill.color} flex justify-center skill-logo-float`}
                  >
                    <IconComponent />
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"></div>
                </div>
              </div>
            );
          })}

          {/* Center Display - positioned at exact center coordinates */}
          <div
            className="absolute pointer-events-none z-10"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-35%, -50%)",
            }}
          >
            <div
              className={`transition-all duration-500 ${
                hoveredSkill ? "opacity-100 scale-100" : "opacity-70 scale-90"
              }`}
            >
              <div className="bg-slate-900/95 backdrop-blur-md border-2 border-cyan-400/60 rounded-3xl md:px-8 md:py-6 mx-[-100px] px-3 py-2 shadow-2xl min-w-[100px]">
                <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 text-center whitespace-nowrap">
                  {hoveredSkill || "Technologies"}
                </h3>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-3 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Skills */}
      <div className="mt-16 mx-8 grid md:grid-cols-3 gap-8">
        {["Frontend Development", "Backend Development", "DevOps & Tools"].map((title, index) => (
          <motion.div
            key={title}
            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-400 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-4 group-hover:text-cyan-300">
              {title}
            </h3>
            <p className="text-slate-300 mb-4">
              {index === 0 && "Building responsive, interactive user interfaces with modern frameworks and libraries."}
              {index === 1 && "Creating scalable server-side applications and APIs with modern technologies."}
              {index === 2 && "Managing development workflows, deployment, and infrastructure."}
            </p>
            <div className="flex flex-wrap gap-2">
              {index === 0 && (
                <>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Three.js
                  </span>
                </>
              )}
              {index === 1 && (
                <>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    PostgreSQL
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Drizzle ORM
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Go
                  </span>
                </>
              )}
              {index === 2 && (
                <>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Git
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Docker
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    AWS
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                    Vercel
                  </span>
                </>
              )}
            </div>
          </motion.div>
        ))}

        
      </div>
    </section>
  );
}
