import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
  delay?: number;
}

const GlassCard = ({ children, className = "", glowColor = "primary", tilt = true, delay = 0 }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 150, damping: 25 });
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const sheenX = useTransform(mouseX, [0, 1], ["-100%", "200%"]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || !tilt) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800, "--shimmer-delay": `${delay * 1.5}s` } as React.CSSProperties : { "--shimmer-delay": `${delay * 1.5}s` } as React.CSSProperties}
      className={`group relative overflow-hidden rounded-2xl 
        mirror-surface mirror-edge mirror-hover
        border border-border/40
        transition-all duration-700 
        hover:border-primary/40
        ${className}`}
    >
      {/* Mirror reflection sweep that follows mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(500px circle at ${glowX} ${glowY}, hsl(var(--primary) / 0.06), transparent 50%)`,
        }}
      />

      {/* Diagonal chrome sheen that follows mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(105deg, transparent 30%, hsl(var(--foreground) / 0.04) 45%, hsl(var(--foreground) / 0.08) 50%, hsl(var(--foreground) / 0.04) 55%, transparent 70%)`,
          left: sheenX,
        }}
      />

      {/* Shimmer sweep on hover only */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:animate-mirror-shimmer transition-opacity duration-300"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(var(--foreground) / 0.06) 48%, hsl(var(--foreground) / 0.12) 50%, hsl(var(--foreground) / 0.06) 52%, transparent 60%)",
          backgroundSize: "300% 100%",
        }}
      />

      {/* Top edge chrome highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      {/* Bottom subtle reflection */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      {/* Left edge subtle highlight */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-foreground/10 via-transparent to-transparent" />

      {/* Inner mirror gradient */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.03] via-transparent to-foreground/[0.01]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
