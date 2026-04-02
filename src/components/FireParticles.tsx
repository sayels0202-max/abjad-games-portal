import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

const FireParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1, clicked: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "255, 160, 20",
      "255, 100, 10",
      "255, 200, 50",
      "200, 60, 10",
      "255, 140, 0",
    ];

    const spawnParticle = (x?: number, y?: number): Particle => {
      const baseX = x ?? Math.random() * canvas.width;
      const baseY = y ?? canvas.height + 10;
      const maxLife = 60 + Math.random() * 80;
      return {
        x: baseX,
        y: baseY,
        vx: (Math.random() - 0.5) * 1,
        vy: -(0.8 + Math.random() * 1.5),
        size: 0.8 + Math.random() * 2,
        life: 0,
        maxLife,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, clicked: true };
      // Spawn a burst of particles on click
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push(
          spawnParticle(
            e.clientX + (Math.random() - 0.5) * 30,
            e.clientY + (Math.random() - 0.5) * 30
          )
        );
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.clicked = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn fewer fire particles from bottom
      if (particlesRef.current.length < 50 && Math.random() < 0.3) {
        particlesRef.current.push(spawnParticle());
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;

        p.x += p.vx + (Math.random() - 0.5) * 0.3;
        p.y += p.vy;
        p.vy *= 0.99;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1
          ? progress * 10
          : progress > 0.6
            ? (1 - progress) * 2.5
            : 1;

        const currentSize = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha * 0.4})`;
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 2.5);
        grad.addColorStop(0, `rgba(${p.color}, ${alpha * 0.1})`);
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
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default FireParticles;
