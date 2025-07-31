import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 overflow-x-hidden">
      {/* Animated Particles Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <Navigation />
      <HeroSection />
      
      <div className="bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px my-16 mx-auto max-w-4xl opacity-30"></div>
      
      <AboutSection />
      
      <div className="bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px my-16 mx-auto max-w-4xl opacity-30"></div>
      
      <SkillsSection />
      
      <div className="bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px my-16 mx-auto max-w-4xl opacity-30"></div>
      
      <ContactSection />
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">
              © 2024 <span className="text-cyan-400">John Developer</span>. 
              Built with <span className="text-red-400">♥</span> using React, TypeScript & PostgreSQL.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
