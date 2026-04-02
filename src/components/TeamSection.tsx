import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section id="team" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4 text-center">
            The Team
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-wide text-center">
            The People Behind Abjad
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-muted-foreground text-center mb-4 max-w-lg mx-auto font-body font-light">
            A passionate crew of creators pushing the boundaries of interactive entertainment.
          </p>
        </ScrollReveal>

        {/* Animated divider */}
        <div className="flex justify-center mb-16">
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            style={{ width: lineWidth }}
          />
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name + member.lastName} delay={0.2 + i * 0.1}>
              <motion.div
                className="group relative rounded-2xl overflow-hidden cursor-default"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} ${member.lastName}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 brightness-[0.7] saturate-[0.85] group-hover:brightness-[0.8] group-hover:saturate-100"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />

                  {/* Primary accent glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  {/* Accent bar */}
                  <motion.div
                    className="w-6 h-[2px] bg-primary rounded-full mb-3 origin-left"
                    initial={{ scaleX: 0.5 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  />

                  <h3 className="font-display text-sm md:text-base text-foreground/80 leading-tight">
                    {member.name}
                  </h3>
                  <h3 className="font-display text-base md:text-lg font-bold text-foreground uppercase tracking-wider leading-tight">
                    {member.lastName}
                  </h3>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] mt-2 font-body text-primary/70">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
