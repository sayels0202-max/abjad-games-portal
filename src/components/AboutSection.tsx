import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Target, Heart } from "lucide-react";
import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";

const cards = [
  {
    icon: Eye,
    title: "Vision",
    text: "To create indie games that feel handcrafted, atmospheric, and emotionally resonant — games that stand apart from the mainstream.",
  },
  {
    icon: Target,
    title: "Mission",
    text: "To build a studio where every game we release carries a distinct identity, strong art direction, and a story worth telling.",
  },
  {
    icon: Heart,
    title: "Passion",
    text: "We are driven by a deep love for indie games and the belief that a small team with a clear vision can create something truly memorable.",
  },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            About the Studio
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-wide">
            Stories Worth <span className="text-primary">Experiencing</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="max-w-3xl text-muted-foreground font-body font-light text-lg leading-relaxed mb-16">
            Abjad Games is a small indie game development studio built by a passionate team. 
            We believe that games can be more than entertainment — they can be deeply personal, 
            atmospheric experiences that stay with you long after the screen goes dark.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={0.3 + i * 0.12} direction="scale">
              <GlassCard className="p-8 h-full">
                <div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-500"
                    whileHover={{ scale: 1.15, rotate: [0, -8, 8, -4, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <card.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>
                  <h3 className="font-display text-xl text-foreground mb-3 tracking-wide">{card.title}</h3>
                  <p className="text-muted-foreground font-body font-light leading-relaxed text-sm">{card.text}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
