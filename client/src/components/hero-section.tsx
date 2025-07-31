import { useState, useEffect } from "react";
import { ChevronDown, Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Full Stack Developer & UI/UX Designer";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-slate-100">Hi, I'm</span>
            <span className="text-cyan-400 block mt-2">John Developer</span>
          </h1>
          
          <div className="text-xl sm:text-2xl lg:text-3xl text-slate-300 mb-8 h-16 flex items-center justify-center">
            <span className="typing-text">{displayText}</span>
          </div>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            I craft beautiful, functional, and user-friendly applications using modern technologies. 
            Passionate about creating seamless digital experiences that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-glow"
            >
              Get In Touch
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-12">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
              <Github className="w-8 h-8" />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
              <Twitter className="w-8 h-8" />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
