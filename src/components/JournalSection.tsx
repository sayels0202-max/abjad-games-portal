import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";

const posts = [
  {
    platform: "X",
    date: "March 2026",
    title: "Alraiy Development Update #3",
    desc: "Major progress on the dialogue system and NPC interactions. The world of Alraiy is becoming more alive with every update.",
    link: "#",
  },
  {
    platform: "Instagram",
    date: "February 2026",
    title: "New Concept Art Revealed",
    desc: "A first look at the underground temple environments and the creatures that dwell within them.",
    link: "#",
  },
  {
    platform: "YouTube",
    date: "January 2026",
    title: "Sound Design Deep Dive",
    desc: "Our sound designer shares the process behind creating the eerie ambient soundscapes of Alraiy.",
    link: "#",
  },
];

const JournalSection = () => {
  return (
    <section id="journal" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            Latest Updates
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-wide">
            Studio Journal
          </h2>
        </ScrollReveal>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.title} delay={0.2 + i * 0.12} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
              <a href={post.link} className="block h-full">
                <GlassCard className={`p-6 h-full ${i === 0 ? "md:row-span-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-body font-medium text-primary tracking-wider uppercase px-2 py-1 rounded bg-primary/10">{post.platform}</span>
                    <span className="text-xs text-muted-foreground font-body">{post.date}</span>
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground font-body font-light text-sm leading-relaxed">{post.desc}</p>
                </GlassCard>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
