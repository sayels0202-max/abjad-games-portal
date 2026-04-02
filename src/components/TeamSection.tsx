import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import { Gamepad2, Box, Code, Clapperboard } from "lucide-react";
import firasImg from "@/assets/team/firas.jpg";
import sayilImg from "@/assets/team/sayil.jpg";
import alsulaimanImg from "@/assets/team/alsulaiman.jpg";
import alradhyanImg from "@/assets/team/alradhyan.jpg";

const team = [
  { name: "Sayil", lastName: "Alyami", role: "Game Designer", image: sayilImg, icon: Gamepad2 },
  { name: "Abdulaziz", lastName: "Alsulaiman", role: "3D Artist", image: alsulaimanImg, icon: Box },
  { name: "Abdulaziz", lastName: "Alradhyan", role: "Programmer", image: alradhyanImg, icon: Code },
  { name: "Feras", lastName: "Hisan", role: "Producer", image: firasImg, icon: Clapperboard },
];

const TeamSection = () => {
  return (
    <section id="team" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4 text-center">
            The Team
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-wide text-center">
            The People Behind Abjad
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {team.map((member, i) => {
            const Icon = member.icon;
            return (
              <ScrollReveal key={member.name + member.lastName} delay={0.15 + i * 0.08}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card frame */}
                  <div className="relative mirror-surface mirror-edge rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Avatar with game-style frame */}
                    <div className="relative pt-6 px-6 flex justify-center">
                      <div className="relative">
                        {/* Hexagonal-ish frame effect */}
                        <div className="absolute -inset-1.5 rounded-full border border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
                        <div className="absolute -inset-3 rounded-full border border-border/20 group-hover:border-primary/20 transition-colors duration-500" />
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-border/40 group-hover:ring-primary/40 transition-all duration-500">
                          <img
                            src={member.image}
                            alt={`${member.name} ${member.lastName}`}
                            className="w-full h-full object-cover object-top brightness-[0.8] saturate-[0.85] group-hover:brightness-[0.9] group-hover:saturate-100 transition-all duration-500"
                          />
                        </div>
                        {/* Role icon badge */}
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg mirror-surface border border-border/60 flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                          <Icon size={13} className="text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 pt-5 text-center">
                      <h3 className="font-display text-xs md:text-sm text-foreground/70 leading-tight">
                        {member.name}
                      </h3>
                      <h3 className="font-display text-sm md:text-base font-bold text-foreground uppercase tracking-wider leading-tight">
                        {member.lastName}
                      </h3>
                      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] mt-2 font-body text-primary/60">
                        {member.role}
                      </p>
                    </div>
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
