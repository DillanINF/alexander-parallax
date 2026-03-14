"use client";

import { motion } from "framer-motion";
import { Instagram, Github } from "lucide-react";
import AlexanderSequence from "@/components/AlexanderSequence";
import Navigation from "@/components/Navigation";
import Timeline from "@/components/Timeline";
import EmpireMap from "@/components/EmpireMap";
import Wisdom from "@/components/Wisdom";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="h-screen flex flex-col items-center justify-center text-center relative z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="text-[#D4AF37] text-sm tracking-[0.5em] font-medium mb-6">
            SON OF AMMON
          </h2>
          <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-none mb-8 gold-gradient">
            ALEXANDER
          </h1>
          <div className="flex items-center gap-4 text-[#A0A0A0] text-sm tracking-widest">
            <span>MACEDON</span>
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
            <span>356 — 323 BC</span>
          </div>
        </motion.div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#D4AF37]" />
        </div>
      </section>

      {/* Scrollytelling Sequence */}
      <section id="story">
        <AlexanderSequence />
      </section>

      {/* Empire Map Section */}
      <section id="map">
        <EmpireMap />
      </section>

      {/* Timeline Section */}
      <section id="timeline">
        <Timeline />
      </section>

      {/* Wisdom Section */}
      <section id="wisdom">
        <Wisdom />
      </section>

      {/* Conquests Statistics Section */}
      <section className="min-h-screen bg-[#050505] relative z-20 py-24 px-10 md:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.4em] font-bold mb-12 uppercase">Tactical Dominance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "BATTLES LOST", value: "0", detail: "Undefeated in over 15 years of constant warfare." },
              { label: "EMPIRE SIZE", value: "2M", detail: "Square miles of territory across three continents." },
              { label: "CITIES FOUNDED", value: "70+", detail: "Spreading Hellenistic culture from Egypt to India." }
            ].map((stat, i) => (
              <div key={i} className="border-l border-gold/20 pl-8 py-4">
                <div className="text-6xl font-bold mb-4 text-white tracking-tighter">{stat.value}</div>
                <div className="text-gold text-xs tracking-widest font-bold mb-4">{stat.label}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Conclusion */}
      <footer className="h-[70vh] flex flex-col items-center justify-center text-center bg-[#050505] relative z-20 border-t border-gold/10">
        <div className="max-w-4xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 italic">
            "I am not afraid of an army of lions led by a sheep; I am afraid of an army of sheep led by a lion."
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-24 h-[1px] bg-gold mb-6" />
            <p className="text-[#D4AF37] tracking-widest text-sm font-bold">
              ALEXANDER III OF MACEDON
            </p>
            <p className="text-gray-500 text-[10px] tracking-[0.3em] mt-2 uppercase">The Greatest Conqueror in History</p>
          </div>
          
          <div className="mt-20 flex flex-col items-center gap-6">
            <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase">Developed By</p>
            <div className="flex items-center gap-8">
              <a 
                href="https://instagram.com/dlan12_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all">
                  <Instagram size={18} className="text-gray-400 group-hover:text-gold transition-colors" />
                </div>
                <span className="text-[10px] text-gray-500 tracking-widest group-hover:text-gold transition-colors">@dlan12_</span>
              </a>
              <a 
                href="https://github.com/DlllianINF" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all">
                  <Github size={18} className="text-gray-400 group-hover:text-gold transition-colors" />
                </div>
                <span className="text-[10px] text-gray-500 tracking-widest group-hover:text-gold transition-colors">DlllianINF</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
