import abjadIcon from "@/assets/abjad-icon-white.svg";
import ScrollReveal from "./ui/ScrollReveal";
import GlassCard from "./ui/GlassCard";

const StudioSection = () => {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal direction="scale">
          <div className="flex flex-col items-center mb-12">
            <img src={abjadIcon} alt="Abjad Games" className="abjad-icon-fill w-24 md:w-32 mb-4" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-6">
            The Studio
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-wide">
            Abjad Is Part of Us. We're Part of the World.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <p className="font-display text-lg md:text-xl text-primary/80 italic tracking-wide mb-10">
            "From Riyadh, We Build Worlds"
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <div className="space-y-6 text-muted-foreground font-body font-light text-lg leading-relaxed">
            <p>
              Where we come from shows up in everything we make: the jokes, the stories, the
              way we sit together and play. But we don't make games just for us. We make them
              for everyone.
            </p>
            <p>
              From Riyadh, we're building games that bring people together, wherever they are.
              And we want the next game the whole world plays with friends to come from here.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          {/* Three columns on phones too: tighter padding and tracking so "Riyadh" and "Founded" fit at 360px */}
          <div className="mt-16 grid grid-cols-3 gap-3 sm:flex sm:justify-center sm:gap-8 md:gap-16">
            {[
              { label: "Founded", value: "2026" },
              { label: "Based In", value: "Riyadh" },
              { label: "First Title", value: "In Dev" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="px-2 py-4 sm:px-6 text-center" tilt={false}>
                <p className="font-display text-xl sm:text-2xl text-primary whitespace-nowrap">{stat.value}</p>
                <p className="mt-1 text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.3em] uppercase text-muted-foreground font-body whitespace-nowrap">
                  {stat.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StudioSection;
