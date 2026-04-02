import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import screenshot1 from "@/assets/screenshot1.png";
import screenshot2 from "@/assets/screenshot2.png";
import screenshot3 from "@/assets/screenshot3.png";
import screenshot4 from "@/assets/screenshot4.png";
import ScrollReveal from "./ui/ScrollReveal";

const screenshots = [
  { src: screenshot1, alt: "The Shadow" },
  { src: screenshot2, alt: "The Campfire" },
  { src: screenshot3, alt: "The Passage" },
  { src: screenshot4, alt: "The Watch" },
];

const ShowcaseSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <section id="showcase" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            Featured Project
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-16 tracking-wide">
            Into the Unknown
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Main image with parallax scale */}
          <ScrollReveal direction="left" delay={0.3}>
            <motion.div className="relative" style={{ scale: imageScale, opacity: imageOpacity }}>
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-foreground/10 mirror-edge shadow-2xl shadow-primary/5">
                <motion.img
                  key={activeIndex}
                  src={screenshots[activeIndex].src}
                  alt={screenshots[activeIndex].alt}
                  className="w-full aspect-video object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Glass overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background/80 to-transparent flex items-end px-4 pb-3">
                  <span className="font-display text-sm tracking-wider text-foreground/80">{screenshots[activeIndex].alt}</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3">
                {screenshots.map((ss, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative overflow-hidden rounded-xl flex-1 aspect-video mirror-hover ${
                      i === activeIndex
                        ? "ring-2 ring-primary mirror-edge scale-[1.02]"
                        : "ring-1 ring-foreground/10 opacity-50 hover:opacity-80 hover:ring-foreground/20"
                    }`}
                  >
                    <img src={ss.src} alt={ss.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="right" delay={0.45}>
            <div className="lg:pt-8">
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6 tracking-wide">
                AL-RAIY
              </h3>
              <div className="space-y-5 text-muted-foreground font-body font-light leading-relaxed">
                <p>
                  In a land forgotten by time, ancient terrors stir beneath the dunes. 
                  You are the shepherd — the last watcher at the edge of darkness.
                </p>
                <p>
                  Navigate treacherous desert nights armed only with fire and instinct. 
                  Every shadow hides a story, every flame reveals a truth you may not be ready to face.
                </p>
                <p>
                  A pixel-art survival horror experience rooted in Arabian folklore and mythology, 
                  crafted with obsessive attention to atmosphere and tension.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {["Survival Horror", "Pixel Art", "Arabian Folklore", "Atmospheric"].map((tag) => (
                  <span
                    key={tag}
                    className="mirror-surface border border-foreground/10 px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-muted-foreground font-body rounded-xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/alraiy"
                className="mt-10 inline-block mirror-surface mirror-edge mirror-hover border border-primary/30 px-8 py-3 font-display text-sm tracking-[0.3em] uppercase text-primary rounded-xl"
              >
                Learn More →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
