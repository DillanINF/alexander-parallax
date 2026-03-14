"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const QUOTES = [
  {
    text: "There is nothing impossible to him who will try.",
    context: "Alexander's philosophy of relentless ambition.",
  },
  {
    text: "I am indebted to my father for living, but to my teacher for living well.",
    context: "On his education under Aristotle.",
  },
  {
    text: "Upon the conduct of each depends the fate of all.",
    context: "His belief in collective responsibility and leadership.",
  },
];

export default function Wisdom() {
  return (
    <section className="py-32 px-10 md:px-24 bg-[#050505] relative z-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-gold text-xs tracking-[0.4em] font-bold mb-4 uppercase">Legendary Wisdom</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white gold-gradient">Words of the King</h3>
        </div>

        <div className="space-y-48">
          {QUOTES.map((quote, i) => (
            <WisdomQuote key={i} quote={quote} index={i} />
          ))}
        </div>
      </div>
      
      {/* Decorative Greek Pattern Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[url('https://www.transparenttextures.com/patterns/greek-vase.png')] opacity-10" />
    </section>
  );
}

function WisdomQuote({ quote, index }: { quote: typeof QUOTES[0]; index: number }) {
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.7, 1], [100, 0, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.7], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.9, 1]);

  return (
    <motion.div
      ref={quoteRef}
      style={{ 
        opacity, 
        y, 
        rotateX, 
        scale,
        perspective: "1000px"
      }}
      className="flex flex-col items-center text-center"
    >
      <motion.div 
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 45 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-12 h-12 border border-gold/20 mb-12 flex items-center justify-center"
      >
        <span className="text-gold/40 text-xs -rotate-45 font-bold">{index + 1}</span>
      </motion.div>
      <h4 className="text-3xl md:text-6xl font-medium tracking-tight text-white mb-8 italic leading-tight max-w-4xl">
        "{quote.text}"
      </h4>
      <div className="flex items-center gap-4">
        <div className="w-8 h-[1px] bg-gold/30" />
        <p className="text-gold/60 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
          {quote.context}
        </p>
        <div className="w-8 h-[1px] bg-gold/30" />
      </div>
    </motion.div>
  );
}
