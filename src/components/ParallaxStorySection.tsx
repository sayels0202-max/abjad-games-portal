import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import screenshot1 from "@/assets/screenshot1.png";
import screenshot2 from "@/assets/screenshot2.png";
import screenshot3 from "@/assets/screenshot3.png";
import screenshot4 from "@/assets/screenshot4.png";

interface StoryBeat {
  title: string;
  titleAr: string;
  text: string;
  image: string;
}

const storyBeats: StoryBeat[] = [
  {
    title: "The Awakening",
    titleAr: "الصحوة",
    text: "You open your eyes to darkness. A cold wind bites through the fabric of a tent you don't recognize. The last thing you remember is... nothing. Only the faint smell of smoke and earth.",
    image: screenshot1,
  },
  {
    title: "The Stranger",
    titleAr: "الغريب",
    text: "A figure stands before you — face hidden in shadow, voice calm but commanding. He says he's here to help. But trust is a luxury in a place like this.",
    image: screenshot2,
  },
  {
    title: "The Farmlands",
    titleAr: "المزارع",
    text: "Beyond the tent, desolate fields stretch endlessly under a moonless sky. Something moves between the rows — too fast, too quiet. The stranger warns: never leave the firelight.",
    image: screenshot3,
  },
  {
    title: "The Truth",
    titleAr: "الحقيقة",
    text: "Every answer breeds more questions. The creatures are not the only threat here. The land itself remembers, and it does not forgive. Will you survive long enough to uncover what happened?",
    image: screenshot4,
  },
];

const ParallaxStorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative" ref={containerRef}>
      {/* Section header */}
      <div className="py-20 px-6 text-center">
        <motion.p
          className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Story
        </motion.p>
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Unravel the Darkness
        </motion.h2>
      </div>

      {/* Story beats */}
      {storyBeats.map((beat, index) => (
        <StoryBeatBlock key={index} beat={beat} index={index} />
      ))}

      {/* Closing line */}
      <div className="py-24 px-6 text-center">
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="block w-20 h-[1px] bg-gradient-to-r from-transparent to-primary/50" />
          <span className="block w-2 h-2 rotate-45 border border-primary/50" />
          <span className="block w-20 h-[1px] bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>
        <motion.p
          className="font-display text-lg md:text-xl text-primary/50 italic tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          هل أنت مستعد لمواجهة الظلام؟
        </motion.p>
      </div>
    </section>
  );
};

const StoryBeatBlock = ({ beat, index }: { beat: StoryBeat; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [60, 0, 0, -40]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 0.4, 0.4, 0.7]);

  return (
    <div ref={ref} className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed parallax background image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={beat.image}
          alt={beat.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 z-[1] bg-background"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient edges */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background via-transparent to-background" />
      <div
        className={`absolute inset-0 z-[2] ${
          isEven
            ? "bg-gradient-to-r from-background via-background/40 to-transparent"
            : "bg-gradient-to-l from-background via-background/40 to-transparent"
        }`}
      />

      {/* Text content */}
      <motion.div
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex ${
          isEven ? "justify-start" : "justify-end"
        }`}
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className={`max-w-lg ${isEven ? "text-left" : "text-right"}`}>
          {/* Chapter number */}
          <span className="font-display text-xs tracking-[0.5em] uppercase text-primary/40 block mb-4">
            Chapter {String(index + 1).padStart(2, "0")}
          </span>

          {/* Arabic title */}
          <h3 className="font-display text-4xl md:text-6xl font-bold text-primary/20 mb-2 tracking-wider">
            {beat.titleAr}
          </h3>

          {/* English title */}
          <h4 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6 tracking-wide">
            {beat.title}
          </h4>

          {/* Decorative line */}
          <div
            className={`flex items-center gap-3 mb-6 ${isEven ? "" : "justify-end"}`}
          >
            <span className="block w-12 h-[1px] bg-primary/40" />
            <span className="block w-1 h-1 rotate-45 bg-primary/60" />
          </div>

          {/* Story text */}
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed font-light">
            {beat.text}
          </p>
        </div>
      </motion.div>

      {/* Scan line texture */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.1) 2px, hsl(var(--foreground) / 0.1) 4px)",
        }}
      />
    </div>
  );
};

export default ParallaxStorySection;
