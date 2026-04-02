import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId: number;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      // Spawn only 1 particle per move, less frequently
      if (Math.random() < 0.4) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3,
          size: 1 + Math.random() * 1.5,
          life: 0,
          maxLife: 20 + Math.random() * 15,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
        const size = p.size * (1 - progress * 0.5);

        // Simple dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 170, 30, ${alpha * 0.5})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CursorTrail;
