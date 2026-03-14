"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const REGIONS = [
  { name: "MACEDON", coord: { x: "15%", y: "35%" }, year: "336 BC" },
  { name: "ANATOLIA", coord: { x: "30%", y: "45%" }, year: "334 BC" },
  { name: "EGYPT", coord: { x: "35%", y: "75%" }, year: "332 BC" },
  { name: "MESOPOTAMIA", coord: { x: "55%", y: "55%" }, year: "331 BC" },
  { name: "PERSIA", coord: { x: "70%", y: "65%" }, year: "330 BC" },
  { name: "INDIA", coord: { x: "90%", y: "70%" }, year: "326 BC" },
];

export default function EmpireMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 px-10 md:px-24 bg-[#050505] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-gold text-xs tracking-[0.4em] font-bold mb-4 uppercase">Territorial Expansion</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">The Empire at its Peak</h3>
        </div>

        <div className="relative aspect-[21/9] w-full bg-[#0a0a0a] border border-gold/10 rounded-lg overflow-hidden group">
          {/* Subtle Map Background Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] pointer-events-none" />
          
      {/* Animated Conquest Path */}
      <div className="absolute inset-0 p-4 md:p-12 overflow-visible">
        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
          <motion.path
            d="M 150 140 L 300 180 L 350 300 L 550 220 L 700 260 L 900 280"
            fill="transparent"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray="0 1"
            style={{ pathLength: scrollYProgress }}
            className="drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
          />
          
          {/* Legend Lines and Markers */}
          {REGIONS.map((region, i) => (
            <motion.g 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <circle 
                cx={region.coord.x} 
                cy={region.coord.y} 
                r="4" 
                className="fill-gold animate-pulse" 
              />
              <text 
                x={region.coord.x} 
                y={region.coord.y} 
                dy="-15" 
                className="fill-gray-500 text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] font-bold text-center uppercase"
                textAnchor="middle"
              >
                {region.name}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

          {/* Map Interaction Hint */}
          <div className="absolute bottom-6 left-6 text-[10px] text-gray-600 tracking-widest uppercase font-medium">
            Visualize the 11,000 mile journey
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-500 leading-relaxed">
          <p>
            Alexander's conquest was not merely a military campaign, but an unprecedented journey of exploration. 
            He mapped the unknown territories of Asia, documented new species of flora and fauna, 
            and bridged the gap between Eastern and Western civilizations.
          </p>
          <p>
            By the time of his death, he had established over 70 cities, most named Alexandria, 
            which became centers of Hellenistic culture, trade, and learning, 
            lasting centuries after the empire itself had fractured.
          </p>
        </div>
      </div>
    </section>
  );
}

import { useSpring } from "framer-motion";
