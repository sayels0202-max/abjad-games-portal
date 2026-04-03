import logoOutline from "@/assets/logo-outline-sm.webp";
import ScrollReveal from "./ui/ScrollReveal";
import GlassCard from "./ui/GlassCard";

const StudioSection = () => {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal direction="scale">
          <div className="flex flex-col items-center mb-12">
            <img src={logoOutline} alt="Abjad Games" className="w-40 md:w-56 mb-4 opacity-90" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-6">
            The Studio
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-wide">
            Crafting Worlds from Ancient Letters
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
              Abjad Games is an independent game studio dedicated to telling stories 
              that draw from the rich well of Arabian heritage and mythology.
            </p>
            <p>
              We believe the most powerful games are born from cultural authenticity — 
              stories that have never been told in this medium, waiting to be experienced 
              for the first time.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="mt-16 flex justify-center gap-8 md:gap-16">
            {[
              { label: "Founded", value: "2025" },
              { label: "Based In", value: "Riyadh" },
              { label: "First Title", value: "In Dev" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="px-6 py-4 text-center" tilt={false}>
                <p className="font-display text-2xl text-primary">{stat.value}</p>
                <p className="mt-1 text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
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
