import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import banner from "@/assets/hero-bg.png";
import abjadLogo from "@/assets/abjad-logo-full.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blurVal, setBlurVal] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 0.7]);
  const sectionOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setBlurVal(Math.max(0, (v - 0.5) * 20));
  });

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <motion.section
        className="sticky top-0 h-screen overflow-hidden"
        style={{ opacity: sectionOpacity }}
      >
        {/* Background image with zoom + parallax */}
        <motion.div className="absolute inset-0" style={{ y: imgY, scale }}>
          <img
            src={banner}
            alt="Al-Raiy"
            className="h-full w-full object-cover"
            style={{ filter: `blur(${blurVal}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </motion.div>

        {/* Dark overlay that intensifies on scroll */}
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-end pb-24 px-6 text-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.img
            src={abjadLogo}
            alt="Abjad Games"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-48 md:w-64 lg:w-80 mb-6"
          />
          <motion.a
            href="#showcase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 mirror-surface mirror-edge mirror-hover border border-primary/30 px-8 py-3 font-display text-sm tracking-[0.3em] uppercase text-primary rounded-xl"
          >
            Discover the Journey
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: contentOpacity }}
        >
          <div className="h-8 w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
