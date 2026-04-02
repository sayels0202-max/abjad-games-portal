import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "./ui/ScrollReveal";
import firasImg from "@/assets/team/firas.jpg";
import sayilImg from "@/assets/team/sayil.jpg";
import alsulaimanImg from "@/assets/team/alsulaiman.jpg";
import alradhyanImg from "@/assets/team/alradhyan.jpg";

const team = [
  { name: "Sayil", lastName: "Alyami", role: "Game Designer", image: sayilImg, objectPos: "object-[50%_20%]" },
  { name: "Abdulaziz", lastName: "Alsulaiman", role: "3D Artist", image: alsulaimanImg, objectPos: "object-[50%_25%]" },
  { name: "Abdulaziz", lastName: "Alradhyan", role: "Programmer", image: alradhyanImg, objectPos: "object-[50%_15%]" },
  { name: "Feras", lastName: "Hisan", role: "Producer", image: firasImg, objectPos: "object-[50%_15%]" },
];

const TeamCard = ({
  member,
  index,
  hoveredIndex,
  onHover,
}: {
  member: typeof team[0];
  index: number;
  hoveredIndex: number | null;
  onHover: (i: number | null) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1.1]);

  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && !isHovered;

  return (
    <ScrollReveal delay={0.15 + index * 0.12}>
      <motion.div
        ref={cardRef}
        className="group relative rounded-xl overflow-hidden cursor-default"
        style={{ perspective: "1000px" }}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Card with larger aspect ratio */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-background">
          {/* Parallax image */}
          <motion.img
            src={member.image}
            alt={`${member.name} ${member.lastName}`}
            className={`absolute inset-0 w-full h-[120%] object-cover ${member.objectPos} transition-all duration-500`}
            style={{ y: imageY, scale: imageScale }}
          />

          {/* Dim overlay when another card is hovered */}
          <motion.div
            className="absolute inset-0 bg-black/70 pointer-events-none"
            animate={{ opacity: isDimmed ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Cinematic vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 via-30% to-transparent" />

          {/* Top subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent to-30%" />

          {/* Primary accent glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

          {/* Scan line effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />
        </div>

        {/* Info overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <motion.div
            className="h-[1px] bg-gradient-to-r from-primary via-primary/60 to-transparent mb-4 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
            style={{ width: "60%" }}
          />

          <motion.p
            className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-body text-primary/80 mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            {member.role}
          </motion.p>

          <h3 className="font-display text-sm md:text-base text-foreground/60 leading-tight tracking-wider">
            {member.name}
          </h3>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground uppercase tracking-[0.15em] leading-tight">
            {member.lastName}
          </h3>

          <motion.div
            className="w-0 group-hover:w-10 h-[1px] bg-primary/40 mt-3 transition-all duration-500"
          />
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-primary/20 group-hover:border-primary/50 transition-colors duration-500 rounded-tr-sm" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-primary/20 group-hover:border-primary/50 transition-colors duration-500 rounded-bl-sm" />
      </motion.div>
    </ScrollReveal>
  );
};

const TeamSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="team" className="relative py-32 px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.02] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4 text-center">
            The Team
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-wide text-center">
            The People Behind Abjad
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-muted-foreground text-center mb-20 max-w-lg mx-auto font-body font-light">
            A passionate crew of creators pushing the boundaries of interactive entertainment.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {team.map((member, i) => (
            <TeamCard
              key={member.name + member.lastName}
              member={member}
              index={i}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
