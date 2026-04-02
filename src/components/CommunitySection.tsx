import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";

const channels = [
  {
    platform: "X (Twitter)",
    handle: "@AbjadGames",
    link: "https://x.com/AbjadGames",
    comingSoon: false,
    color: "bg-primary/10 text-primary",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "Abjad Games",
    link: "https://www.linkedin.com/company/abjad-games",
    comingSoon: false,
    color: "bg-blue-500/10 text-blue-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: "Steam",
    handle: "",
    link: "#",
    comingSoon: true,
    color: "bg-emerald-500/10 text-emerald-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91a4.26 4.26 0 014.258-4.256 4.26 4.26 0 014.258 4.256 4.26 4.26 0 01-4.258 4.256h-.098l-4.07 2.907c0 .052.004.105.004.158 0 2.39-1.935 4.332-4.321 4.332a4.321 4.321 0 01-4.296-3.848L.453 14.472C1.681 19.946 6.349 24 11.979 24c6.627 0 12-5.373 12-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25a2.848 2.848 0 003.753-1.44 2.841 2.841 0 00.007-2.181 2.848 2.848 0 00-1.538-1.549 2.856 2.856 0 00-2.076-.128l1.521.629a2.1 2.1 0 01-1.508 3.93zm8.877-8.395a2.843 2.843 0 00-2.84-2.838 2.843 2.843 0 00-2.84 2.838 2.843 2.843 0 002.84 2.838 2.843 2.843 0 002.84-2.838zm-4.968-.002a2.13 2.13 0 012.128-2.126 2.13 2.13 0 012.128 2.126 2.13 2.13 0 01-2.128 2.127 2.13 2.13 0 01-2.128-2.127z" />
      </svg>
    ),
  },
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-32 px-6">
      <div className="relative mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
              Stay Connected
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-wide">
              Follow Us
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {channels.map((ch, i) => (
            <motion.a
              key={ch.platform}
              href={ch.link}
              target={ch.comingSoon ? undefined : "_blank"}
              rel={ch.comingSoon ? undefined : "noopener noreferrer"}
              className={`block ${ch.comingSoon ? "pointer-events-none" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <GlassCard
                className="p-8 flex flex-col items-center gap-5 h-full text-center"
                tilt={!ch.comingSoon}
              >
                <span
                  className={`flex items-center justify-center w-16 h-16 rounded-2xl ${ch.color}`}
                >
                  {ch.icon}
                </span>

                <div className="flex flex-col items-center gap-1.5">
                  <span className="font-display text-base tracking-wide text-foreground font-semibold">
                    {ch.platform}
                  </span>
                  {ch.comingSoon ? (
                    <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground/60 font-body">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground font-body">
                      {ch.handle}
                    </span>
                  )}
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
