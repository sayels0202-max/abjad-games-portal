import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
  parallax?: boolean;
  parallaxAmount?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  once = true,
  parallax = false,
  parallaxAmount = 50,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxAmount, -parallaxAmount]);

  const variants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={parallax ? { y: parallaxY } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
