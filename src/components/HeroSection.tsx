import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import banner from "@/assets/hero-bg.gif";
import abjadLogo from "@/assets/abjad-logo-text.png";

const scanLineKeyframes = `
@keyframes scan-line {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}
`;

const SPARK_COLORS = [
  "255, 160, 20",
  "255, 100, 10",
  "255, 200, 50",
  "200, 60, 10",
  "255, 140, 0",
];

interface Spark {
  x: number; y: number; vx: number; vy: number;
  size: number; life: number; maxLife: number; color: string;
}

const LogoSparks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnSpark = (): Spark => {
      const maxLife = 40 + Math.random() * 60;
      return {
        x: canvas.width * (0.15 + Math.random() * 0.7),
        y: canvas.height * (0.35 + Math.random() * 0.3),
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(0.6 + Math.random() * 1.8),
        size: 0.6 + Math.random() * 1.8,
        life: 0,
        maxLife,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sparksRef.current.length < 30 && Math.random() < 0.4) {
        sparksRef.current.push(spawnSpark());
      }

      sparksRef.current = sparksRef.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;

        p.x += p.vx + (Math.random() - 0.5) * 0.3;
        p.y += p.vy;
        p.vy *= 0.99;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : progress > 0.6 ? (1 - progress) * 2.5 : 1;
        const currentSize = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha * 0.5})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 2.5);
        grad.addColorStop(0, `rgba(${p.color}, ${alpha * 0.15})`);
        grad.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();

        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-20 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

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
              style={{ filter: `blur(${blurVal}px) brightness(1.18) contrast(1.06) saturate(1.08)` }}
            />
            {/* Color grading overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/35 via-transparent to-background/35" />
            {/* Film grain noise */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
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

          {/* Dark vignette behind text content */}
          <div
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 72% 58% at 50% 45%, hsl(0 0% 0% / 0.58) 0%, hsl(0 0% 0% / 0.18) 42%, transparent 100%)",
            }}
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
                style={{ filter: "drop-shadow(0 0 60px hsl(0 0% 0% / 0.8))" }}
              />

              {/* Canvas sparks from logo */}
              {showTitle && <LogoSparks />}
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
