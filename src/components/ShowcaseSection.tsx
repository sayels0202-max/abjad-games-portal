import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import dinnerRush from "@/assets/hmam-dinner-rush.webp";
import theCrew from "@/assets/hmam-the-crew.webp";
import runawayCarrot from "@/assets/hmam-runaway-carrot.webp";
import bikerDeer from "@/assets/hmam-biker-deer.webp";
import ScrollReveal from "./ui/ScrollReveal";
import { DISCORD_URL, STEAM_URL } from "@/lib/site";

// Built from the approved Hunt Me a Meal renders in brand/site-art
const screenshots = [
  { src: dinnerRush, title: "The Dinner Rush", alt: "Customers waiting at their tables while chefs work the kitchen in Hunt Me a Meal" },
  { src: theCrew, title: "The Crew", alt: "Three Hunt Me a Meal chefs playing together while a carrot steals a controller" },
  { src: runawayCarrot, title: "The Runaway Carrot", alt: "A chef chasing a runaway carrot between the restaurant tables" },
  { src: bikerDeer, title: "The Biker Deer", alt: "A biker deer on a motorbike chasing a panicking chef" },
];

const SteamIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658a3.387 3.387 0 0 1 1.912-.59c.064 0 .128.003.19.008l2.861-4.142V8.91a4.528 4.528 0 0 1 4.524-4.524 4.528 4.528 0 0 1 4.524 4.524 4.528 4.528 0 0 1-4.524 4.524h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396a3.406 3.406 0 0 1-3.362-2.898L.309 14.466C1.539 19.857 6.272 24 11.979 24c6.627 0 12.001-5.373 12.001-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61a2.542 2.542 0 0 0 4.753-.895 2.543 2.543 0 0 0-2.54-2.541c-.267 0-.527.042-.774.12l1.521.63a1.868 1.868 0 0 1-1.423 3.453l-.064-.157zm8.4-5.695a3.023 3.023 0 0 0 3.016-3.015 3.023 3.023 0 0 0-3.016-3.015 3.023 3.023 0 0 0-3.016 3.015 3.023 3.023 0 0 0 3.016 3.015zm-.005-5.278a2.269 2.269 0 0 1 2.263 2.263 2.269 2.269 0 0 1-2.263 2.263 2.269 2.269 0 0 1-2.263-2.263 2.269 2.269 0 0 1 2.263-2.263z"/>
  </svg>
);

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
    <section id="showcase" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Faint restaurant backdrop */}
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <img src={dinnerRush} alt="" aria-hidden="true" className="w-full h-full object-cover blur-sm" />
      </div>
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="mx-auto max-w-7xl relative z-[2]">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-6">
            Our Games
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-wide">
            Upcoming Titles
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Main image with parallax scale */}
          <ScrollReveal direction="left" delay={0.2}>
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
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background/80 to-transparent flex items-end px-4 pb-3">
                  <span className="font-display text-sm tracking-wider text-foreground/80">{screenshots[activeIndex].title}</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3">
                {screenshots.map((ss, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show ${ss.title}`}
                    className={`relative overflow-hidden rounded-xl flex-1 aspect-video mirror-hover ${
                      i === activeIndex
                        ? "ring-2 ring-primary mirror-edge scale-[1.02]"
                        : "ring-1 ring-foreground/10 opacity-50 hover:opacity-80 hover:ring-foreground/20"
                    }`}
                  >
                    <img src={ss.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Game info - right side */}
          <ScrollReveal direction="right" delay={0.35}>
            <div className="lg:pt-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-wide">
                Hunt Me a Meal
              </h2>
              <p className="mb-8 text-xs md:text-sm tracking-[0.15em] md:tracking-[0.3em] uppercase text-primary font-body font-medium">
                1–4 Players · Co-op · Physics Comedy
              </p>

              <div className="space-y-5 text-muted-foreground font-body font-light leading-relaxed">
                <p>
                  Welcome to a restaurant that hunts its own ingredients.
                </p>
                <p>
                  The meat runs away, the vegetables fight back, and the dinner rush waits for no one.
                  Cook it, serve it, survive it, together.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {STEAM_URL ? (
                  <a
                    href={STEAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 mirror-surface mirror-edge mirror-hover border border-primary/50 px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/10 rounded-xl transition-colors"
                  >
                    <SteamIcon />
                    Wishlist on Steam
                  </a>
                ) : (
                  <div
                    aria-disabled="true"
                    className="inline-flex items-center gap-3 mirror-surface mirror-edge border border-primary/20 px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary/70 rounded-xl opacity-70 cursor-not-allowed select-none"
                  >
                    <SteamIcon />
                    Steam — Coming Soon
                  </div>
                )}
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mirror-surface mirror-edge mirror-hover border border-foreground/20 px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary rounded-xl transition-colors"
                >
                  Join our Discord →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
