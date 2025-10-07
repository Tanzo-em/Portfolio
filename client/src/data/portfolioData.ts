export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
  };
}

export const portfolioData = {
  personal: {
    name: "Alex Johnson",
    title: "Full-Stack Developer & UI/UX Designer",
    description: "crafting digital experiences that matter",
    bio: [
      "With over 5 years of experience in web development and design, I specialize in creating beautiful, functional, and user-centered digital experiences. My passion lies in the intersection of design and technology, where creativity meets functionality.",
      "I believe in the power of clean code, intuitive design, and continuous learning. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
    stats: {
      projects: 50,
      experience: 5,
      clients: 20
    }
  },

  projects: [
    {
      id: "1", 
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and secure payment processing.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "2",
      title: "Task Management App", 
      description: "A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Vue.js", "Firebase", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "3",
      title: "Task Management App", 
      description: "A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Vue.js", "Firebase", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#"
    },
    
  ] as Project[],

  skills: [
    { name: "JavaScript / TypeScript", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "React / Vue.js", level: 90, color: "from-emerald-500 to-green-500" },
    { name: "Node.js / Express", level: 85, color: "from-purple-500 to-pink-500" },
    { name: "UI/UX Design", level: 80, color: "from-orange-500 to-red-500" }
  ] as Skill[],

  contact: {
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    socialLinks: {
      linkedin: "#",
      github: "#", 
      twitter: "#",
      dribbble: "#"
    }
  } as ContactInfo
};