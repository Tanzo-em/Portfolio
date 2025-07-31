import { IconType } from "react-icons";

interface SkillIconProps {
  skill: {
    name: string;
    icon: IconType;
    color: string;
  };
}

export default function SkillIcon({ skill }: SkillIconProps) {
  const IconComponent = skill.icon;
  
  return (
    <div className="skill-icon-3d group relative bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-700/50 hover:border-cyan-400/70 cursor-pointer transform transition-all duration-700 hover:scale-110">
      <div className="flex items-center justify-center">
        <div className={`text-4xl sm:text-5xl lg:text-6xl group-hover:text-cyan-400 transition-all duration-500 ${skill.color} transform group-hover:rotateY-180 group-hover:scale-125 flex justify-center skill-logo-3d`}>
          <IconComponent />
        </div>
      </div>
      
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
      
      {/* 3D Ring Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-500 transform group-hover:rotate-12"></div>
      
      {/* Inner Glow */}
      <div className="absolute inset-2 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
