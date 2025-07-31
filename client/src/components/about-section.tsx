import { Download } from "lucide-react";

export default function AboutSection() {
  const handleDownloadResume = () => {
    // TODO: Add actual resume download functionality
    console.log("Download resume clicked");
  };

  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-cyan-400">About</span> Me
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Passionate developer with expertise in modern web technologies and a keen eye for design
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <div className="animate-fadeInUp">
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">
                Full Stack Developer & Creative Problem Solver
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                With over 5 years of experience in web development, I specialize in creating 
                scalable applications using modern technologies. I'm passionate about writing 
                clean, efficient code and delivering exceptional user experiences.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                I love working with React, TypeScript, and Node.js to build full-stack applications. 
                My background in design helps me bridge the gap between technical implementation 
                and user experience.
              </p>
              
              {/* Skills Highlight */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-cyan-400 mb-2">Frontend</h4>
                  <p className="text-sm text-slate-300">React, TypeScript, Next.js</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-cyan-400 mb-2">Backend</h4>
                  <p className="text-sm text-slate-300">Node.js, PostgreSQL, Go</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-cyan-400 mb-2">Tools</h4>
                  <p className="text-sm text-slate-300">Git, Docker, AWS</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-cyan-400 mb-2">Design</h4>
                  <p className="text-sm text-slate-300">Figma, UI/UX, Responsive</p>
                </div>
              </div>
              
              <button 
                onClick={handleDownloadResume}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>
            </div>
          </div>
          
          {/* Stats & Image */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full animate-spin3d opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
                alt="Developer profile" 
                className="w-full h-full rounded-full object-cover border-4 border-slate-700 shadow-2xl"
              />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-colors duration-300">
                <div className="text-2xl font-bold text-cyan-400">5+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-colors duration-300">
                <div className="text-2xl font-bold text-cyan-400">50+</div>
                <div className="text-sm text-slate-400">Projects Completed</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-colors duration-300">
                <div className="text-2xl font-bold text-cyan-400">30+</div>
                <div className="text-sm text-slate-400">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
