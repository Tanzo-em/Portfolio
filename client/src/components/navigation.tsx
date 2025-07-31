import { useState, useEffect } from "react";
import { Menu, X, Home, User, Code, Mail } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 shadow-xl">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300 group"
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300 group"
            title="About"
          >
            <User className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection('skills')} 
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300 group"
            title="Skills"
          >
            <Code className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300 group"
            title="Contact"
          >
            <Mail className="w-5 h-5" />
          </button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 shadow-xl">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="flex items-center space-x-3 p-3 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="flex items-center space-x-3 p-3 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">About</span>
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="flex items-center space-x-3 p-3 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition-all duration-300"
              >
                <Code className="w-5 h-5" />
                <span className="font-medium">Skills</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center space-x-3 p-3 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Contact</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
