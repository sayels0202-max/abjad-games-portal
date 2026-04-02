import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Code, Palette, Music } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import firasImg from "@/assets/team/firas.jpg";
import sayilImg from "@/assets/team/sayil.jpg";
import alsulaimanImg from "@/assets/team/alsulaiman.jpg";
import alradhyanImg from "@/assets/team/alradhyan.jpg";

const team = [
  { name: "Sayil", lastName: "Alyami", role: "Game Designer", icon: Gamepad2, image: sayilImg },
  { name: "Abdulaziz", lastName: "Alsulaiman", role: "3D Artist", icon: Palette, image: alsulaimanImg },
  { name: "Abdulaziz", lastName: "Alradhyan", role: "Programmer", icon: Code, image: alradhyanImg },
  { name: "Feras", lastName: "Hisan", role: "Producer", icon: Music, image: firasImg },
];

const TeamSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="team" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-wide text-center">
            The People Behind Abjad
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            A passionate crew of creators pushing the boundaries of interactive entertainment.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => {
            const isHovered = hoveredIndex === i;
            const someoneHovered = hoveredIndex !== null;
            const Icon = member.icon;

            return (
              <ScrollReveal key={member.name + member.lastName} delay={0.15 + i * 0.1} direction="scale">
                <motion.div
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isHovered ? 1.03 : someoneHovered ? 0.97 : 1,
                    opacity: isHovered ? 1 : someoneHovered ? 0.5 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative rounded-xl overflow-hidden cursor-pointer h-full group"
                >
                  {/* Photo or placeholder */}
                  <div className="w-full aspect-[3/4] bg-card">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`${member.name} ${member.lastName}`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 brightness-[0.78] contrast-[1.1] saturate-[0.9]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-muted">
                        <Icon className="w-16 h-16 text-muted-foreground/30" strokeWidth={1} />
                      </div>
                    )}
                  </div>

                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Name & role overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    {/* Accent line */}
                    <div className="w-8 h-[3px] bg-primary mb-3 rounded-full" />

                    <h3 className="font-display text-base text-foreground leading-tight">
                      {member.name}
                    </h3>
                    <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wide leading-tight">
                      {member.lastName}
                    </h3>
                    <p className="text-muted-foreground text-[11px] uppercase tracking-[0.2em] mt-2 font-body">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
