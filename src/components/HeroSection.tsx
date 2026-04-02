import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import banner from "@/assets/hero-bg.png";
import abjadLogo from "@/assets/abjad-logo-text.png";

const glitchKeyframes = `
@keyframes glitch-1 {
  0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
  20% { clip-path: inset(40% 0 30% 0); transform: translate(2px, 0); }
  40% { clip-path: inset(70% 0 5% 0); transform: translate(-1px, 0); }
  60% { clip-path: inset(10% 0 60% 0); transform: translate(3px, 0); }
  80% { clip-path: inset(80% 0 0% 0); transform: translate(-3px, 0); }
}
@keyframes glitch-2 {
  0%, 100% { clip-path: inset(90% 0 0 0); transform: translate(2px, 0); }
  25% { clip-path: inset(20% 0 50% 0); transform: translate(-3px, 0); }
  50% { clip-path: inset(50% 0 20% 0); transform: translate(1px, 0); }
  75% { clip-path: inset(0 0 70% 0); transform: translate(-2px, 0); }
}
@keyframes scan-line {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}
`;

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blurVal, setBlurVal] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

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
    const t2 = setTimeout(() => setGlitchActive(true), 1200);
    const t3 = setTimeout(() => setGlitchActive(false), 1600);
    // Periodic subtle glitch
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, []);

  const subtitle = "Crafting Worlds. Telling Stories.";
  const motto = "From Riyadh, We Build Worlds";

  return (
    <>
      <style>{glitchKeyframes}</style>
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
            {/* Logo with glitch effect */}
            <div className="relative mb-10 md:mb-14">
              {/* Ambient glow behind logo */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: showTitle ? 1 : 0 }}
                transition={{ duration: 2, delay: 1 }}
              >
                <div className="w-[300px] md:w-[500px] lg:w-[700px] h-[100px] md:h-[160px] rounded-full bg-primary/8 blur-[80px]" />
              </motion.div>

              {/* Shimmer sweep overlay */}
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: showTitle ? 1 : 0 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.08) 45%, hsl(var(--primary) / 0.15) 50%, hsl(var(--primary) / 0.08) 55%, transparent 60%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.img
                src={abjadLogo}
                alt="Abjad Games"
                initial={{ opacity: 0, scale: 0.8, filter: "brightness(0) blur(8px)" }}
                animate={{
                  opacity: showTitle ? 1 : 0,
                  scale: showTitle ? 1 : 0.8,
                  filter: showTitle ? "brightness(1) blur(0px)" : "brightness(0) blur(8px)",
                }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[440px] md:w-[680px] lg:w-[920px] mx-auto drop-shadow-[0_0_60px_hsl(var(--primary)/0.2)] hover:drop-shadow-[0_0_80px_hsl(var(--primary)/0.35)] transition-all duration-700"
              />

              {/* Glitch copies */}
              {glitchActive && (
                <>
                  <img
                    src={abjadLogo}
                    alt=""
                    className="absolute inset-0 z-10 w-[440px] md:w-[680px] lg:w-[920px] mx-auto opacity-70 pointer-events-none"
                    style={{ animation: "glitch-1 0.3s steps(2) infinite", filter: "hue-rotate(90deg) saturate(2) brightness(1.3)" }}
                    aria-hidden="true"
                  />
                  <img
                    src={abjadLogo}
                    alt=""
                    className="absolute inset-0 z-10 w-[440px] md:w-[680px] lg:w-[920px] mx-auto opacity-50 pointer-events-none"
                    style={{ animation: "glitch-2 0.3s steps(3) infinite", filter: "hue-rotate(-90deg) saturate(2) brightness(1.3)" }}
                    aria-hidden="true"
                  />
                </>
              )}
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
