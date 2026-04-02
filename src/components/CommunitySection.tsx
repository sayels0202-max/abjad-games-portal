import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";

const socials = [
  { name: "Discord", href: "#" },
  { name: "X / Twitter", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "TikTok", href: "#" },
  { name: "Instagram", href: "#" },
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-32 px-6">
      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            Community
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-wide">
            Join the Journey
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-muted-foreground font-body font-light text-lg leading-relaxed mb-12">
            Follow Abjad Games for development updates, behind-the-scenes content, and community discussions.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s) => (
              <a key={s.name} href={s.href}>
                <GlassCard className="px-6 py-3" tilt={false}>
                  <span className="font-body text-sm tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {s.name}
                  </span>
                </GlassCard>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CommunitySection;
