import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";

const posts = [
  {
    platform: "X",
    date: "March 2026",
    title: "AL-RAIY Development Update #3",
    desc: "Major progress on the dialogue system and NPC interactions. The world of AL-RAIY is becoming more alive.",
    link: "#",
  },
  {
    platform: "Instagram",
    date: "February 2026",
    title: "New Concept Art Revealed",
    desc: "A first look at the underground temple environments and the creatures that dwell within.",
    link: "#",
  },
  {
    platform: "YouTube",
    date: "January 2026",
    title: "Sound Design Deep Dive",
    desc: "Our sound designer shares the process behind creating the eerie ambient soundscapes.",
    link: "#",
  },
  {
    platform: "X",
    date: "December 2025",
    title: "Studio Year in Review",
    desc: "Looking back at everything we accomplished in our first year as a studio.",
    link: "#",
  },
  {
    platform: "Instagram",
    date: "November 2025",
    title: "Character Design Process",
    desc: "Behind the scenes of how we design the characters that inhabit the world of AL-RAIY.",
    link: "#",
  },
];

const platformColors: Record<string, string> = {
  X: "bg-primary/10 text-primary",
  Instagram: "bg-pink-500/10 text-pink-400",
  YouTube: "bg-red-500/10 text-red-400",
};

const CommunitySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="community" className="relative py-32 px-6">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <ScrollReveal>
              <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
                Latest Updates
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-wide">
                Join the Journey
              </h2>
            </ScrollReveal>
          </div>

          {/* Navigation arrows */}
          <ScrollReveal delay={0.2}>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-2 rounded-xl border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-2 rounded-xl border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal scrollable posts */}
        <div className="relative">
          {/* Right fade indicator */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {posts.map((post, i) => (
              <motion.a
                key={post.title}
                href={post.link}
                className="flex-shrink-0 w-[320px] md:w-[380px] snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full" tilt={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-lg ${platformColors[post.platform] || "bg-primary/10 text-primary"}`}>
                      {post.platform}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60 font-body">{post.date}</span>
                  </div>
                  <h3 className="font-display text-base text-foreground mb-3 tracking-wide group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground/70 font-body font-light text-sm leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </GlassCard>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
