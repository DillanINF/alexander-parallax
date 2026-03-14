"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Instagram, Github } from "lucide-react";

export default function Navigation() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-gold rotate-45 flex items-center justify-center">
              <span className="text-gold font-bold -rotate-45 text-xs">A</span>
            </div>
            <span className="text-white tracking-[0.3em] font-bold text-sm">ALEXANDER</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "STORY", id: "story" },
              { label: "MAP", id: "map" },
              { label: "TIMELINE", id: "timeline" },
              { label: "WISDOM", id: "wisdom" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-[10px] text-gray-400 hover:text-gold tracking-[0.2em] transition-colors uppercase font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://instagram.com/dlan12_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://github.com/DlllianINF" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors"
            >
              <Github size={18} />
            </a>
            <div className="w-[1px] h-4 bg-gray-800 mx-2" />
            <button 
              onClick={() => {
                const element = document.getElementById("map");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-6 py-2 border border-gold/30 hover:border-gold text-gold text-[10px] tracking-[0.2em] transition-all uppercase font-medium"
            >
              Explore Map
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold origin-left z-[101]"
        style={{ scaleX }}
      />
    </>
  );
}
