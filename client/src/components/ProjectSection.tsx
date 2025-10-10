import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/portfolioData";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="projects" className="py-20 bg-background/50 dark:bg-slate-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-cyan-400">Featured</span> projects
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto"
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
            Here are some of my recent projects that showcase my skills in web development and design.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group bg-card/50 backdrop-blur-sm border border-border 
                rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                hover:shadow-cyan-500/20 transition-all duration-500
                dark:bg-slate-800/50 dark:border-slate-700"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 
                    transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 
                  to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 
                  dark:text-slate-100">{project.title}</h3>
                <p className="text-muted-foreground mb-4 
                  dark:text-slate-400">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 
                        rounded-full text-sm dark:bg-cyan-900/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <motion.a 
                      href={project.liveUrl}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-cyan-400 hover:text-cyan-300 
                        transition-colors duration-300 flex items-center
                        dark:text-cyan-400 dark:hover:text-cyan-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-slate-400 hover:text-cyan-400 
                        transition-colors duration-300 flex items-center
                        dark:text-slate-300 dark:hover:text-cyan-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12">
          <motion.button
            className="inline-flex items-center bg-slate-800 hover:bg-slate-700 
              text-slate-300 hover:text-cyan-400 px-6 py-3 rounded-lg 
              font-semibold transition-all duration-300 border border-slate-600 
              hover:border-cyan-400 dark:bg-slate-800 dark:hover:bg-slate-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
