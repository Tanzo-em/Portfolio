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
    name: "Rakesh Kumar",
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
      description: "A full-stack e-commerce website designed with a clean, minimalist aesthetic and optimized for a smooth shopping experience.An integrated admin panel empowers store owners to easily add new products.",
      image: "/snugway.png",
  
      technologies: ["React", "Node.js", "MongoDB" , "Mongoose" , "tailwindCSS" , "Express", "dotenv",   "jsonwebtoken" ,"Vercel"],
      liveUrl: "https://snugway.vercel.app",
      githubUrl: "https://github.com/Tanzo-em/snugway-full-stack"
    },
    {
      id: "2",
      title: "Trip Planner", 
      description: "Built a full-stack travel planning app with Next.js featuring GitHub OAuth via NextAuth.js. Enabled itinerary creation, destination organization, and user authentication. Deployed on Vercel with a responsive UI and scalable database.",
      image: "/triplanzy.png",
      technologies: [" Next.js", "TypeScript", "TailwindCSS","PostgreSQL","Prisma","NextAuth.js","Vercel"],
      liveUrl: "https://triplanzy.vercel.app",
      githubUrl: "https://github.com/Tanzo-em/Travel-planner"
    },
    {
      id: "3",
      title: "Get-Me-A-Chai", 
      description: "Get Me A Chai, is a Next.js application designed to allow users to support others by making donations.The app allows users to create profiles, make payments, and view top supporters, making it ideal for crowdfunding or small-scale donation platforms.",
      image: "/chaibuddy.png",
      technologies: ["React", "Next.js", "TailwindCSS","Razorpay", "MongoDB", "Mongoose", "vercel"],
      liveUrl: "https://chaibuddy.vercel.app",
      githubUrl: "https://github.com/Tanzo-em/Get-Me-a-Chai#"
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