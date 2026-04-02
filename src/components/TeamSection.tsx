import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ui/ScrollReveal";
import firasImg from "@/assets/team/firas.jpg";
import sayilImg from "@/assets/team/sayil.jpg";
import alsulaimanImg from "@/assets/team/alsulaiman.jpg";
import alradhyanImg from "@/assets/team/alradhyan.jpg";

const team = [
  { name: "Sayil", lastName: "Alyami", role: "Game Designer", image: sayilImg },
  { name: "Abdulaziz", lastName: "Alsulaiman", role: "3D Artist", image: alsulaimanImg },
  { name: "Abdulaziz", lastName: "Alradhyan", role: "Programmer", image: alradhyanImg },
  { name: "Feras", lastName: "Hisan", role: "Producer", image: firasImg },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section id="team" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Editorial header */}
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <p className="text-[11px] tracking-[0.5em] uppercase text-primary font-body font-medium">
              The Team
            </p>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-2 tracking-wide text-center">
            The People Behind
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-16 tracking-wide text-center italic">
            Abjad
          </h2>
        </ScrollReveal>

        {/* Editorial asymmetric grid */}
        <div className="relative">
          {/* Vertical editorial line */}
          <motion.div
            className="absolute left-1/2 top-0 w-[1px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden lg:block"
            style={{ height: lineHeight, originY: 0 }}
          />

          {/* Row 1: Large left + Small right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Member 1 — large editorial card */}
            <ScrollReveal delay={0.15} className="lg:col-span-7">
              <EditorialCard
                member={team[0]}
                variant="landscape"
                index={0}
              />
            </ScrollReveal>

            {/* Member 2 — tall portrait */}
            <ScrollReveal delay={0.25} className="lg:col-span-5">
              <EditorialCard
                member={team[1]}
                variant="portrait"
                index={1}
              />
            </ScrollReveal>
          </div>

          {/* Row 2: Small left + Large right (mirrored) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Member 3 — tall portrait */}
            <ScrollReveal delay={0.2} className="lg:col-span-5">
              <EditorialCard
                member={team[2]}
                variant="portrait"
                index={2}
              />
            </ScrollReveal>

            {/* Member 4 — large editorial card */}
            <ScrollReveal delay={0.3} className="lg:col-span-7">
              <EditorialCard
                member={team[3]}
                variant="landscape"
                index={3}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const EditorialCard = ({
  member,
  variant,
  index,
}: {
  member: typeof team[0];
  variant: "landscape" | "portrait";
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const isLandscape = variant === "landscape";

  return (
    <motion.div
      ref={cardRef}
      className={`group relative rounded-lg overflow-hidden cursor-default ${
        isLandscape ? "aspect-[16/10]" : "aspect-[3/4]"
      }`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Parallax image */}
      <motion.img
        src={member.image}
        alt={`${member.name} ${member.lastName}`}
        className="absolute inset-0 w-full h-[120%] object-cover object-top brightness-[0.55] saturate-[0.8] group-hover:brightness-[0.65] group-hover:saturate-100 transition-all duration-700"
        style={{ y: imageY }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Editorial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Editorial text overlay — positioned differently based on variant */}
      <div
        className={`absolute ${
          isLandscape
            ? "bottom-0 left-0 p-6 md:p-8 max-w-[80%]"
            : "bottom-0 inset-x-0 p-5 md:p-7"
        }`}
      >
        {/* Issue number / index */}
        <motion.span
          className="text-[10px] tracking-[0.4em] uppercase font-body text-primary/60 block mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          0{index + 1} — {member.role}
        </motion.span>

        {/* Accent line */}
        <motion.div
          className="w-10 h-[1px] bg-primary/50 mb-3 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35 + index * 0.1 }}
        />

        {/* Name — editorial large type */}
        <h3 className="font-display text-foreground/50 text-sm md:text-base tracking-[0.2em] uppercase leading-tight">
          {member.name}
        </h3>
        <h3
          className={`font-display font-bold text-foreground uppercase tracking-[0.12em] leading-tight ${
            isLandscape
              ? "text-2xl md:text-4xl"
              : "text-xl md:text-2xl"
          }`}
        >
          {member.lastName}
        </h3>

        {/* Decorative editorial dash */}
        <div className="w-0 group-hover:w-12 h-[1px] bg-primary/30 mt-3 transition-all duration-500 ease-out" />
      </div>

      {/* Corner editorial marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-foreground/10 group-hover:border-primary/30 transition-colors duration-500" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-foreground/10 group-hover:border-primary/30 transition-colors duration-500" />
    </motion.div>
  );
};

export default TeamSection;
