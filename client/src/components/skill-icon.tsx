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
    <div className="skill-icon group relative bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-700 hover:border-cyan-400 cursor-pointer transform transition-all duration-500 hover:scale-110">
      <div className="text-center">
        <div className={`text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300 ${skill.color} transform group-hover:rotate-12 group-hover:scale-125 flex justify-center`}>
          <IconComponent />
        </div>
        <h3 className="font-medium sm:font-semibold text-sm sm:text-base text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
          {skill.name}
        </h3>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* 3D Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl transform translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
