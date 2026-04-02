import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import banner from "@/assets/hero-bg.png";
import abjadLogo from "@/assets/abjad-logo-text.png";

const scanLineKeyframes = `
@keyframes scan-line {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}
`;

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blurVal, setBlurVal] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

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

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 800);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  const subtitle = "Crafting Worlds. Telling Stories.";
  const motto = "From Riyadh, We Build Worlds";

  return (
    <>
      <style>{scanLineKeyframes}</style>
      <div ref={containerRef} className="relative h-[200vh]">
        <motion.section
          className="sticky top-0 h-screen overflow-hidden"
          style={{ opacity: sectionOpacity }}
        >
          {/* Background layers */}
          <motion.div className="absolute inset-0" style={{ y: imgY, scale }}>
            <img
              src={banner}
              alt="Al-Raiy"
              className="h-full w-full object-cover"
              style={{ filter: `blur(${blurVal}px)` }}
            />
            {/* Color grading overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
            {/* Film grain noise */}
            <div
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>

          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            <div
              className="absolute w-full h-[2px] bg-primary/10"
              style={{ animation: "scan-line 4s linear infinite" }}
            />
          </div>

          {/* Dark overlay on scroll */}
          <motion.div
            className="absolute inset-0 bg-background"
            style={{ opacity: overlayOpacity }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {/* Logo with spark particles */}
            <div className="relative mb-10 md:mb-14">
              <motion.img
                src={abjadLogo}
                alt="Abjad Games"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showTitle ? 1 : 0, scale: showTitle ? 1 : 0.8 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[440px] md:w-[680px] lg:w-[920px] mx-auto drop-shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
              />

              {/* Canvas sparks from logo */}
              {showTitle && <LogoSparks />}
            </div>

            {/* Motto */}
            <motion.p
              className="font-body text-sm md:text-lg tracking-[0.35em] uppercase mb-14 text-destructive-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {motto}
            </motion.p>

            {/* CTA */}
            <motion.a
              href="#showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="group relative mirror-surface mirror-edge border border-primary/30 px-10 py-4 font-display text-xs tracking-[0.35em] uppercase text-primary rounded-xl overflow-hidden"
            >
              <span className="relative z-10">Explore Our Games</span>
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          </motion.div>

          {/* Bottom scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ opacity: contentOpacity }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 font-body">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
          </motion.div>

          {/* Side decorative lines */}
          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
            style={{ opacity: contentOpacity }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[1px] bg-primary/20"
                style={{ height: `${20 + i * 8}px` }}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-3 z-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
            style={{ opacity: contentOpacity }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[1px] bg-primary/20"
                style={{ height: `${20 + i * 8}px` }}
              />
            ))}
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default HeroSection;
