import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const [glitch, setGlitch] = useState(false);
  const [flickerOpacity, setFlickerOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150 + Math.random() * 200);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  // Flicker effect
  useEffect(() => {
    const interval = setInterval(() => {
      const flicker = async () => {
        setFlickerOpacity(0.3);
        await new Promise((r) => setTimeout(r, 60));
        setFlickerOpacity(1);
        await new Promise((r) => setTimeout(r, 80));
        setFlickerOpacity(0.5);
        await new Promise((r) => setTimeout(r, 40));
        setFlickerOpacity(1);
      };
      flicker();
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  const arabicWhispers = [
    "لا مكان لك هنا...",
    "عُد من حيث أتيت",
    "الظلام يراقبك",
    "هذا الطريق مسدود",
    "لقد ضللت الطريق",
  ];

  const randomWhisper = arabicWhispers[Math.floor(Math.random() * arabicWhispers.length)];

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden"
    >
      {/* Background fog/mist layers */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"
          style={{ opacity: flickerOpacity }}
          transition={{ duration: 0.05 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, hsl(0 60% 15% / 0.3), transparent 70%)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 80%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Giant 404 with glitch */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1
            className="font-display text-[8rem] md:text-[12rem] leading-none font-bold tracking-wider select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px hsl(var(--primary) / 0.6)",
              textShadow: glitch
                ? "4px 0 hsl(0 80% 50% / 0.7), -4px 0 hsl(200 80% 50% / 0.7)"
                : "0 0 60px hsl(var(--primary) / 0.15)",
              transform: glitch
                ? `translate(${Math.random() * 6 - 3}px, ${Math.random() * 4 - 2}px)`
                : "translate(0, 0)",
              transition: "transform 0.05s",
            }}
          >
            404
          </h1>

          {/* Glitch overlay layers */}
          {glitch && (
            <>
              <span
                className="absolute inset-0 font-display text-[8rem] md:text-[12rem] leading-none font-bold tracking-wider select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px hsl(0 80% 50% / 0.5)",
                  clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
                  transform: "translate(3px, -2px)",
                }}
              >
                404
              </span>
              <span
                className="absolute inset-0 font-display text-[8rem] md:text-[12rem] leading-none font-bold tracking-wider select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px hsl(200 80% 50% / 0.5)",
                  clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                  transform: "translate(-3px, 2px)",
                }}
              >
                404
              </span>
            </>
          )}
        </motion.div>

        {/* Arabic whisper text */}
        <motion.p
          className="font-display text-xl md:text-2xl text-primary/60 mb-4 tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.4, 0.8] }}
          transition={{ duration: 3, delay: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          {randomWhisper}
        </motion.p>

        {/* English subtitle */}
        <motion.p
          className="font-body text-sm text-muted-foreground mb-10 tracking-[0.15em] uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          This page has been consumed by the void
        </motion.p>

        {/* Return button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-3 font-display text-xs tracking-[0.25em] uppercase px-8 py-3 border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-500"
          >
            <motion.span
              className="absolute inset-0 bg-primary/5"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative">العودة إلى الأمان</span>
          </Link>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2 }}
        >
          <span className="block w-16 h-[1px] bg-gradient-to-r from-transparent to-primary/40" />
          <span className="block w-1.5 h-1.5 rotate-45 border border-primary/40" />
          <span className="block w-16 h-[1px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.015) 2px, hsl(var(--foreground) / 0.015) 4px)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
};

export default NotFound;
