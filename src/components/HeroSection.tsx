import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import abjadLogo from "@/assets/abjad-logo-white.svg";

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
      <div ref={containerRef} className="relative h-[200vh]">
        <motion.section
          className="sticky top-0 h-screen overflow-hidden"
          style={{ opacity: sectionOpacity }}
        >
          {/* Background layers */}
          <motion.div className="absolute inset-0" style={{ y: imgY, scale }}>
            {/* Hunt Me a Meal restaurant loop; masters live in brand/site-art */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/restaurant-loop-poster.webp"
              className="h-full w-full object-cover"
              style={{ filter: blurVal > 0.6 ? `blur(${blurVal - 0.6}px)` : 'none' }}
            >
              <source src="/videos/restaurant-loop.webm" type="video/webm" />
              <source src="/videos/restaurant-loop.mp4" type="video/mp4" />
            </video>
            {/* The restaurant is much brighter than the old fire video; dim it so the motto reads */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Color grading overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/18 via-transparent to-background/18" />
            {/* Film grain noise */}
            <div
              className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>

          {/* Dark overlay on scroll */}
          <motion.div
            className="absolute inset-0 bg-background"
            style={{ opacity: overlayOpacity }}
          />

          {/* Dark vignette behind text content */}
          <div
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 72% 58% at 50% 45%, hsl(0 0% 0% / 0.42) 0%, hsl(0 0% 0% / 0.08) 42%, transparent 100%)",
            }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {/* Logo */}
            <div className="relative mb-10 md:mb-14">
              <motion.img
                src={abjadLogo}
                alt="Abjad Games"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showTitle ? 1 : 0, scale: showTitle ? 1 : 0.8 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="abjad-logo-fill relative z-10 w-[300px] sm:w-[440px] md:w-[600px] lg:w-[720px] mx-auto drop-shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
                style={{ filter: "drop-shadow(0 0 60px hsl(0 0% 0% / 0.8))" }}
              />
            </div>

            {/* Motto */}
            <motion.div
              className="relative mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {/* Decorative lines */}
              <div className="flex items-center gap-4 justify-center">
                <motion.span
                  className="block h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                />
                <p className="font-body text-sm md:text-lg tracking-[0.35em] uppercase bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(0_0%_0%/0.9)]" style={{ textShadow: "0 0 40px hsl(0 0% 0% / 0.9), 0 0 80px hsl(0 0% 0% / 0.6)" }}>
                  {motto}
                </p>
                <motion.span
                  className="block h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                />
              </div>
              {/* Subtle glow underneath */}
              <div className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </motion.div>

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
