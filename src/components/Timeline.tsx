"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TIMELINE_EVENTS = [
  { year: "356 BC", title: "Birth in Pella", description: "Son of King Philip II and Queen Olympias." },
  { year: "343 BC", title: "Taught by Aristotle", description: "The philosopher instills a love for medicine, philosophy, and Greek culture." },
  { year: "336 BC", title: "Accession to Throne", description: "Following Philip II's assassination, Alexander becomes King of Macedon." },
  { year: "334 BC", title: "Battle of Granicus", description: "First major victory against the Persian Empire." },
  { year: "333 BC", title: "Battle of Issus", description: "Alexander defeats Darius III in person for the first time." },
  { year: "332 BC", title: "Siege of Tyre", description: "Engineering marvel leads to the fall of the island fortress." },
  { year: "331 BC", title: "Foundation of Alexandria", description: "The most famous of his cities is established in Egypt." },
  { year: "326 BC", title: "Battle of the Hydaspes", description: "Victory over King Porus at the edge of the known world." },
  { year: "323 BC", title: "Death in Babylon", description: "Alexander dies at age 32, leaving behind a vast, fractured empire." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-32 px-10 md:px-24 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-gold text-xs tracking-[0.4em] font-bold mb-4 uppercase">Chronicles of a Conqueror</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white gold-gradient">Historical Timeline</h3>
        </motion.div>

        <div className="relative border-l border-gold/10 ml-4 md:ml-0">
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }: { event: typeof TIMELINE_EVENTS[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.8], [-50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);
  const blur = useTransform(scrollYProgress, (v) => `blur(${(1 - v) * 10}px)`);

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, x, scale, filter: blur }}
      className="mb-24 last:mb-0 relative pl-12"
    >
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="absolute left-[-5px] top-2 w-[10px] h-[10px] bg-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,1)]" 
      />
      <div className="text-gold font-bold text-sm tracking-widest mb-2 flex items-center gap-3">
        {event.year}
        <div className="h-[1px] w-8 bg-gold/20" />
      </div>
      <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{event.title}</h4>
      <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed font-light">
        {event.description}
      </p>
    </motion.div>
  );
}
