import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import banner from "@/assets/banner.png";
import ScrollReveal from "./ui/ScrollReveal";

const TrailerSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.5, 0.85]);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden">
      {/* Parallax background with scale */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img src={banner} alt="AL-RAIY Trailer" className="w-full h-[120%] object-cover" />
      </motion.div>

      <motion.div className="absolute inset-0 bg-background" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      <div className="relative z-10 py-32 md:py-48 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-6">
              Watch the Trailer
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-wide text-glow">
              Experience the Desert
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="max-w-2xl mx-auto text-muted-foreground font-body font-light text-lg leading-relaxed mb-12">
              A glimpse into the world of AL-RAIY — where ancient shadows 
              and desert fires shape the fate of the last shepherd.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.45} direction="scale">
            <div className="inline-block">
              {!isPlaying ? (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-primary/40 transition-all duration-700 hover:border-primary hover:shadow-[0_0_40px_hsl(38_92%_53%/0.25)] hover:scale-110"
                >
                  <span className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
                  <span className="absolute inset-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-primary ml-1 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden ring-1 ring-foreground/10 mirror-edge mx-auto"
                >
                  <div className="w-full h-full mirror-surface flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-display text-xl text-primary mb-2">Trailer Coming Soon</p>
                      <p className="text-muted-foreground font-body text-sm">The official trailer is currently in production</p>
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="mt-6 border border-border px-6 py-2 text-xs tracking-[0.2em] uppercase text-muted-foreground font-body transition-all duration-300 hover:border-primary/40 hover:text-primary rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="mt-16 mx-auto w-48 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;
