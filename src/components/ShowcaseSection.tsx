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
            Our Games
          </p>
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

          {/* Game info - right side */}
          <ScrollReveal direction="right" delay={0.35}>
            <div className="lg:pt-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-wide">
                AL-RAIY
              </h2>

              <div className="space-y-5 text-muted-foreground font-body font-light leading-relaxed">
                <p>
                  Our hero awakens inside a strange tent on a pitch-black night. A man with hidden features stands before him, 
                  silhouetted against a mesmerizing fire. The stranger claims he is here to help — follow his instructions 
                  to survive the monsters lurking across these desolate farmlands.
                </p>
                <p>
                  What secrets does this place hold? Who hides in the darkness — and is there any escape?
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://store.steampowered.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 mirror-surface mirror-edge mirror-hover border border-primary/30 px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary rounded-xl"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658a3.387 3.387 0 0 1 1.912-.59c.064 0 .128.003.19.008l2.861-4.142V8.91a4.528 4.528 0 0 1 4.524-4.524 4.528 4.528 0 0 1 4.524 4.524 4.528 4.528 0 0 1-4.524 4.524h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396a3.406 3.406 0 0 1-3.362-2.898L.309 14.466C1.539 19.857 6.272 24 11.979 24c6.627 0 12.001-5.373 12.001-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61a2.542 2.542 0 0 0 4.753-.895 2.543 2.543 0 0 0-2.54-2.541c-.267 0-.527.042-.774.12l1.521.63a1.868 1.868 0 0 1-1.423 3.453l-.064-.157zm8.4-5.695a3.023 3.023 0 0 0 3.016-3.015 3.023 3.023 0 0 0-3.016-3.015 3.023 3.023 0 0 0-3.016 3.015 3.023 3.023 0 0 0 3.016 3.015zm-.005-5.278a2.269 2.269 0 0 1 2.263 2.263 2.269 2.269 0 0 1-2.263 2.263 2.269 2.269 0 0 1-2.263-2.263 2.269 2.269 0 0 1 2.263-2.263z"/>
                  </svg>
                  Wishlist on Steam
                </a>
                <Link
                  to="/alraiy"
                  className="inline-block mirror-surface mirror-edge mirror-hover border border-foreground/20 px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary rounded-xl transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
