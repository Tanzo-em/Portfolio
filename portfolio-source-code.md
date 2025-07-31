# Modern Portfolio Website - Complete Source Code

## Overview
This is a complete TypeScript React portfolio website featuring:
- 3D animated skill icons in circular formation
- Glass morphism navigation and design
- PostgreSQL database integration for contact forms
- Responsive design with Tailwind CSS
- Smooth animations and modern UI components

## Project Structure
```
portfolio-website/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── navigation.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── skills-section.tsx
│   │   │   └── contact-section.tsx
│   │   ├── pages/
│   │   │   └── home.tsx
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   └── queryClient.ts
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/
│   ├── db.ts
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
└── components.json
```

## Key Files

### 1. package.json
```json
{
  "name": "portfolio-website",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.60.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "framer-motion": "^11.13.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "wouter": "^3.3.5",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.3",
    "@types/express": "4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/node": "20.16.11",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "drizzle-kit": "^0.30.4",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.1",
    "typescript": "5.6.3",
    "vite": "^5.4.19"
  }
}
```

### 2. client/src/components/skills-section.tsx
```tsx
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
              const x = 300 + Math.cos(radians - Math.PI / 2) * radius;
              const y = 300 + Math.sin(radians - Math.PI / 2) * radius;
              
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
            
            {/* Center Display - positioned at exact center coordinates */}
            <div className="absolute pointer-events-none z-10" style={{ left: '300px', top: '300px', transform: 'translate(-50%, -50%)' }}>
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
          
          {/* Additional Skills Cards */}
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
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">Vercel</span>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 3. client/src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: hsl(222, 84%, 5%);
  --foreground: hsl(210, 40%, 98%);
  --muted: hsl(217, 32%, 17%);
  --muted-foreground: hsl(215, 20%, 65%);
  --popover: hsl(222, 84%, 5%);
  --popover-foreground: hsl(210, 40%, 98%);
  --card: hsl(222, 84%, 5%);
  --card-foreground: hsl(210, 40%, 98%);
  --border: hsl(217, 32%, 17%);
  --input: hsl(217, 32%, 17%);
  --primary: hsl(188, 95%, 50%);
  --primary-foreground: hsl(222, 84%, 5%);
  --secondary: hsl(217, 32%, 17%);
  --secondary-foreground: hsl(210, 40%, 98%);
  --accent: hsl(217, 32%, 17%);
  --accent-foreground: hsl(210, 40%, 98%);
  --destructive: hsl(0, 84%, 60%);
  --destructive-foreground: hsl(210, 40%, 98%);
  --ring: hsl(188, 95%, 50%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(222, 84%, 5%);
  --foreground: hsl(210, 40%, 98%);
  --muted: hsl(217, 32%, 17%);
  --muted-foreground: hsl(215, 20%, 65%);
  --popover: hsl(222, 84%, 5%);
  --popover-foreground: hsl(210, 40%, 98%);
  --card: hsl(222, 84%, 5%);
  --card-foreground: hsl(210, 40%, 98%);
  --border: hsl(217, 32%, 17%);
  --input: hsl(217, 32%, 17%);
  --primary: hsl(188, 95%, 50%);
  --primary-foreground: hsl(222, 84%, 5%);
  --secondary: hsl(217, 32%, 17%);
  --secondary-foreground: hsl(210, 40%, 98%);
  --accent: hsl(217, 32%, 17%);
  --accent-foreground: hsl(210, 40%, 98%);
  --destructive: hsl(0, 84%, 60%);
  --destructive-foreground: hsl(210, 40%, 98%);
  --ring: hsl(188, 95%, 50%);
  --radius: 0.5rem;
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply antialiased bg-background text-foreground;
    font-family: 'Inter', system-ui, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .skills-circle-container {
    transform-style: preserve-3d;
  }
  
  .skill-orbit-item {
    animation: floatUp 4s ease-in-out infinite;
    animation-delay: calc(var(--delay, 0) * 0.3s);
  }
  
  .skill-icon-floating {
    transform-style: preserve-3d;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .skill-icon-floating:hover {
    transform: translateZ(20px) scale(1.3) rotateY(15deg);
    box-shadow: 
      0 25px 50px rgba(6, 182, 212, 0.4),
      0 12px 30px rgba(0, 0, 0, 0.6),
      0 0 0 2px rgba(6, 182, 212, 0.5);
  }
  
  .skill-logo-float {
    animation: logoFloat 3s ease-in-out infinite;
    transform-style: preserve-3d;
  }
  
  .skill-logo-float:hover {
    animation: logoGlow 1.5s ease-in-out infinite;
  }
  
  @keyframes floatUp {
    0%, 100% { 
      transform: translateY(0px);
    }
    33% { 
      transform: translateY(-8px);
    }
    66% { 
      transform: translateY(4px);
    }
  }
  
  @keyframes logoFloat {
    0%, 100% { 
      transform: scale(1) rotateY(0deg);
    }
    50% { 
      transform: scale(1.1) rotateY(10deg);
    }
  }
  
  @keyframes logoGlow {
    0%, 100% { 
      transform: scale(1) rotateX(0deg);
      filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.6));
    }
    50% { 
      transform: scale(1.2) rotateX(15deg);
      filter: drop-shadow(0 0 25px rgba(6, 182, 212, 0.9));
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .skill-orbit-item {
      transform: scale(0.8);
    }
  }

  /* Particle animation */
  .particle {
    position: absolute;
    background: linear-gradient(45deg, #06b6d4, #0891b2);
    border-radius: 50%;
    animation: float-particle 8s ease-in-out infinite;
    opacity: 0.6;
  }

  @keyframes float-particle {
    0%, 100% {
      transform: translateY(0px) translateX(0px) rotate(0deg);
      opacity: 0.6;
    }
    25% {
      transform: translateY(-20px) translateX(10px) rotate(90deg);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-40px) translateX(-10px) rotate(180deg);
      opacity: 0.4;
    }
    75% {
      transform: translateY(-20px) translateX(15px) rotate(270deg);
      opacity: 0.8;
    }
  }

  /* Navigation glass effect */
  .nav-glass {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.1);
  }

  /* Button glass effect */
  .btn-glass {
    background: rgba(6, 182, 212, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(6, 182, 212, 0.3);
  }

  .btn-glass:hover {
    background: rgba(6, 182, 212, 0.2);
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 8px 32px rgba(6, 182, 212, 0.3);
  }

  /* Card glass effect */
  .card-glass {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(148, 163, 184, 0.1);
  }

  /* Typing animation */
  .typing-cursor::after {
    content: '|';
    animation: blink 1s infinite;
    color: #06b6d4;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
}
```

### 4. shared/schema.ts
```ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContactInput = z.infer<typeof insertContactSchema>;
```

### 5. server/db.ts
```ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
```

### 6. vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./client/src"),
      "@shared": resolve(__dirname, "./shared"),
    },
  },
  root: resolve(__dirname, "client"),
  build: {
    outDir: resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
```

### 7. tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./client/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [],
};

export default config;
```

## Setup Instructions

1. **Initialize Project**
   ```bash
   npm create vite@latest portfolio-website --template react-ts
   cd portfolio-website
   npm install
   ```

2. **Install Dependencies**
   ```bash
   npm install @hookform/resolvers @neondatabase/serverless @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-toast @radix-ui/react-tooltip @tanstack/react-query class-variance-authority clsx date-fns drizzle-orm drizzle-zod express express-session framer-motion lucide-react react-hook-form react-icons tailwind-merge tailwindcss-animate wouter zod
   ```

3. **Install Dev Dependencies**
   ```bash
   npm install -D @tailwindcss/vite @types/express @types/express-session @types/node @types/react @types/react-dom @vitejs/plugin-react autoprefixer drizzle-kit esbuild postcss tailwindcss tsx typescript vite
   ```

4. **Environment Setup**
   Create `.env` file:
   ```
   DATABASE_URL=your_postgresql_database_url
   NODE_ENV=development
   ```

5. **Database Setup**
   ```bash
   npm run db:push
   ```

6. **Development**
   ```bash
   npm run dev
   ```

7. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## Key Features

### 3D Circular Skills Layout
- 14 technology icons arranged in perfect circle formation
- Mathematical positioning using trigonometry
- Individual floating animations with staggered delays
- Center tooltip showing technology names on hover
- 3D hover effects with scaling and rotation

### Glass Morphism Design
- Semi-transparent backgrounds with backdrop blur
- Subtle borders and shadow effects
- Modern aesthetic with cyan accent colors
- Responsive design for all screen sizes

### PostgreSQL Integration
- Contact form data stored in database
- Drizzle ORM for type-safe database operations
- Express.js backend with session management
- RESTful API endpoints

### Modern React Architecture
- TypeScript for type safety
- React Query for server state management
- React Hook Form with Zod validation
- Wouter for lightweight routing
- Radix UI components for accessibility

This portfolio website demonstrates modern web development practices with a focus on visual appeal, performance, and user experience.