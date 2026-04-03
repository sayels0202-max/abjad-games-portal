import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import logoOutline from "@/assets/logo-outline-sm.webp";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Ember {
      x: number; y: number; vx: number; vy: number;
      size: number; life: number; maxLife: number; opacity: number;
    }

    const embers: Ember[] = [];

    const spawn = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 2,
      vy: -(0.5 + Math.random() * 2),
      size: 1 + Math.random() * 2.5,
      life: 0,
      maxLife: 80 + Math.random() * 120,
      opacity: 0.3 + Math.random() * 0.7,
    });

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (embers.length < 60 && Math.random() < 0.4) embers.push(spawn());

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;
        if (e.life > e.maxLife) { embers.splice(i, 1); continue; }
        e.x += e.vx + Math.sin(e.life * 0.03) * 0.5;
        e.y += e.vy;
        const progress = e.life / e.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) * 3.3 : 1;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (1 - progress * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 160, 20, ${alpha * e.opacity * 0.8})`;
        ctx.fill();
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 5);
        grad.addColorStop(0, `rgba(255, 140, 0, ${alpha * 0.12})`);
        grad.addColorStop(1, `rgba(255, 100, 10, 0)`);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ mixBlendMode: "screen" }} />;
};

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(38 92% 50% / 0.08) 0%, transparent 70%)" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: [0, 1, 0.6] }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />

          <LoadingParticles />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(38 92% 50% / 0.15) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={logoOutline}
                alt="Abjad Games"
                className="w-44 md:w-60 animate-breathe relative z-10"
                fetchPriority="high"
              />
            </div>

            <motion.div
              className="mt-8 h-[2px] bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              style={{ boxShadow: "0 0 12px hsl(38 92% 50% / 0.5)" }}
            />

            <motion.p
              className="mt-4 text-xs tracking-[0.4em] uppercase text-muted-foreground font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
