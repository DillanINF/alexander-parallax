"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface Scene {
  title: string;
  description: string;
  start: number;
  end: number;
}

const SCENES: Scene[] = [
  {
    title: "THE YOUNG LION",
    description: "Born in Pella, 356 BC. Tutored by Aristotle, the young prince of Macedon was destined to bridge the gap between gods and men.",
    start: 0,
    end: 0.15,
  },
  {
    title: "THE GORDIAN KNOT",
    description: "In Phrygia, Alexander faced a knot so complex no man could undo it. With a single stroke of his sword, he rewrote the rules of destiny.",
    start: 0.15,
    end: 0.3,
  },
  {
    title: "BATTLE OF GAUGAMELA",
    description: "Against the overwhelming might of the Persian Empire, Alexander's tactical genius shattered the forces of Darius III.",
    start: 0.3,
    end: 0.45,
  },
  {
    title: "PHARAOH OF EGYPT",
    description: "Welcomed as a liberator and crowned as the son of Amun, he founded Alexandria—the beacon of knowledge for the ancient world.",
    start: 0.45,
    end: 0.6,
  },
  {
    title: "THE HIMALAYAN MARCH",
    description: "Pushing his exhausted army to the edges of the known world, he crossed the Hindu Kush and descended into the Indus Valley.",
    start: 0.6,
    end: 0.75,
  },
  {
    title: "HYDASPES RIVER",
    description: "Facing King Porus and his legendary war elephants, Alexander secured his most costly and brilliant victory in India.",
    start: 0.75,
    end: 0.9,
  },
  {
    title: "IMMORTAL LEGACY",
    description: "He died at 32, but his empire shaped the world forever. The Hellenistic age had begun.",
    start: 0.9,
    end: 1,
  },
];

export default function AlexanderSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Configuration
  const frameCount = 240; // Total images in your framemage folder
  const currentFrame = (index: number) => {
    // Using local images from public/assets/alexander/ezgif-frame-XXX.jpg
    const paddedIndex = index.toString().padStart(3, '0');
    return `/assets/alexander/ezgif-frame-${paddedIndex}.jpg?v=${Date.now()}`;
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for the image sequence
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount - 1]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setIsLoading(false);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  // Draw to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const index = Math.floor(frameIndex.get());
      const img = images[index - 1] || images[0];
      
      // Handle high-DPI displays (Retina) for sharp images
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      // Draw image centered and covering the canvas (similar to object-fit: cover)
      const scale = Math.max(window.innerWidth / img.width, window.innerHeight / img.height);
      const x = (window.innerWidth / 2) - (img.width / 2) * scale;
      const y = (window.innerHeight / 2) - (img.height / 2) * scale;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const unsubscribe = frameIndex.on("change", render);
    // Initial render
    render();
    
    window.addEventListener('resize', render);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', render);
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-[#050505]">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-50">
            <div className="text-[#D4AF37] font-sans tracking-widest animate-pulse">
              PREPARING THE CHRONICLES...
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/80 pointer-events-none" />
      </div>

      {/* Content Overlays */}
      <div className="relative z-10 pointer-events-none">
        {SCENES.map((scene, i) => (
          <SceneOverlay key={i} index={i} scene={scene} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function SceneOverlay({ scene, progress, index }: { scene: Scene; progress: any; index: number }) {
  const opacity = useTransform(
    progress,
    [scene.start, scene.start + 0.05, scene.end - 0.05, scene.end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [scene.start, scene.start + 0.1, scene.end - 0.1, scene.end],
    [50, 0, 0, -50]
  );

  const romanNumerals = ["PART I", "PART II", "PART III", "PART IV", "PART V", "PART VI", "PART VII"];

  return (
    <motion.div
      style={{ opacity, y }}
      className="h-screen flex flex-col justify-center px-10 md:px-24 max-w-4xl relative"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gold/20 hidden md:block" />
      <h2 className="text-[#D4AF37] text-sm tracking-[0.3em] font-medium mb-4 flex items-center gap-4">
        <span className="w-8 h-[1px] bg-gold/40" />
        {romanNumerals[index] || `PART ${index + 1}`}
      </h2>
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight gold-gradient">
        {scene.title}
      </h1>
      <p className="text-lg md:text-xl text-[#A0A0A0] max-w-xl leading-relaxed font-light">
        {scene.description}
      </p>
    </motion.div>
  );
}
