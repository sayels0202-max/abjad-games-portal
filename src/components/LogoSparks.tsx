import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

interface LogoSparksProps {
  className?: string;
}

const LogoSparks = ({ className = "" }: LogoSparksProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const colors = [
      "255, 170, 40",
      "255, 120, 20",
      "255, 210, 80",
      "220, 80, 20",
      "255, 150, 30",
    ];

    const spawnSpark = (): Spark => {
      // Spawn from bottom edge of the logo area, with some horizontal spread
      const x = Math.random() * canvas.width;
      const y = canvas.height * (0.55 + Math.random() * 0.45);
      const maxLife = 50 + Math.random() * 70;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.5 + Math.random() * 1.4),
        size: 0.6 + Math.random() * 1.8,
        life: 0,
        maxLife,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sparksRef.current.length < 35 && Math.random() < 0.5) {
        sparksRef.current.push(spawnSpark());
      }

      sparksRef.current = sparksRef.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;

        p.x += p.vx + (Math.random() - 0.5) * 0.25;
        p.y += p.vy;
        p.vy *= 0.99;

        const progress = p.life / p.maxLife;
        const alpha =
          progress < 0.1
            ? progress * 10
            : progress > 0.6
              ? (1 - progress) * 2.5
              : 1;

        const currentSize = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha * 0.55})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 3);
        grad.addColorStop(0, `rgba(${p.color}, ${alpha * 0.18})`);
        grad.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();

        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default LogoSparks;
