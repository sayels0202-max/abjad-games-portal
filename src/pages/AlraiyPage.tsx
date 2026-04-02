import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Flame, Eye, Map, Skull, Wind, Moon, Swords } from "lucide-react";
import banner from "@/assets/banner.png";
import screenshot1 from "@/assets/screenshot1.png";
import screenshot2 from "@/assets/screenshot2.png";
import screenshot3 from "@/assets/screenshot3.png";
import screenshot4 from "@/assets/screenshot4.png";
import logoText from "@/assets/logo-text.png";
import FireParticles from "@/components/FireParticles";
import CursorTrail from "@/components/CursorTrail";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

const screenshots = [
  { src: screenshot1, alt: "The Shadow", caption: "Face what lurks in the dark" },
  { src: screenshot2, alt: "The Campfire", caption: "Fire is your only ally" },
  { src: screenshot3, alt: "The Passage", caption: "Explore forgotten paths" },
  { src: screenshot4, alt: "The Watch", caption: "Something watches from afar" },
];

const features = [
  { icon: Flame, title: "Fire as Your Lifeline", desc: "Your torch is more than light — it's survival. Manage your flame carefully as the darkness closes in." },
  { icon: Eye, title: "Psychological Horror", desc: "Terror built through atmosphere, sound, and suggestion — not cheap jump scares." },
  { icon: Shield, title: "Arabian Folklore", desc: "Creatures and myths drawn from authentic Arabian mythology, never before seen in games." },
  { icon: Map, title: "Open Exploration", desc: "A handcrafted pixel-art world full of secrets, hidden paths, and ancient ruins to discover." },
];

const loreEntries = [
  { title: "The Shepherd", text: "You are Al-Raiy — the last shepherd at the edge of civilization. When the fires began to die and shadows took form, you alone chose to stay.", icon: Moon },
  { title: "The Darkness", text: "It is not merely absence of light. The darkness is alive, ancient, and hungry. It remembers a time before fire, and it wants that time back.", icon: Skull },
  { title: "The Flame", text: "An old power, gifted to humanity by forgotten gods. The flame does not just illuminate — it reveals truths that the darkness desperately hides.", icon: Flame },
];

const mechanics = [
  { title: "Sanity System", desc: "The longer you stay in darkness, the more your mind fractures. Hallucinations blend with reality.", icon: Wind },
  { title: "Resource Scarcity", desc: "Fuel for your torch, herbs for wounds, and ancient wards are rare. Every choice matters.", icon: Swords },
  { title: "Dynamic Nights", desc: "Each night grows longer and more dangerous. The creatures learn your patterns and adapt.", icon: Moon },
  { title: "Ritual Crafting", desc: "Combine ancient symbols and ingredients to create protective wards against specific threats.", icon: Shield },
];

/* ── Hero ── */
const AlraiyHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const sectionOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <div ref={ref} className="relative h-[180vh]">
      <motion.section className="sticky top-0 h-screen overflow-hidden" style={{ opacity: sectionOpacity }}>
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <img src={banner} alt="Al-Raiy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
        </motion.div>

        <motion.div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6" style={{ opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs md:text-sm tracking-[0.5em] uppercase text-primary font-body font-medium mb-6"
          >
            Abjad Games Presents
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.15em] text-foreground text-glow"
          >
            AL-RAIY
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            className="h-[1px] bg-primary mt-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-8 max-w-2xl text-muted-foreground font-body text-lg md:text-xl font-light leading-relaxed"
          >
            A pixel-art survival horror experience set in the ancient Arabian desert. 
            Face the darkness. Keep the flame alive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <span className="mirror-surface mirror-edge border border-primary/30 px-6 py-2 text-primary font-display text-sm tracking-[0.3em] uppercase rounded-xl">
              Coming Soon
            </span>
            <a href="#story" className="mirror-surface mirror-edge mirror-hover border border-foreground/10 px-6 py-2 text-muted-foreground font-display text-sm tracking-[0.3em] uppercase rounded-xl hover:text-primary hover:border-primary/30">
              Explore ↓
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity }}
        >
          <div className="h-10 w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </motion.section>
    </div>
  );
};

/* ── Story / Lore ── */
const StorySection = () => {
  return (
    <section id="story" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            The World
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-wide">
            Every Shadow Hides a Story
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {loreEntries.map((entry, i) => (
            <ScrollReveal key={entry.title} delay={0.2 + i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
              <GlassCard className="p-8" delay={i * 0.3}>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <entry.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-primary mb-3 tracking-wide">{entry.title}</h3>
                    <p className="text-muted-foreground font-body font-light text-base md:text-lg leading-relaxed">{entry.text}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Trailer ── */
const TrailerSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4 text-center">
            Watch
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-12 tracking-wide text-center">
            Official Teaser
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25} direction="scale">
          <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-foreground/10 mirror-edge">
            <div className="absolute inset-0 mirror-surface flex items-center justify-center">
              <img src={banner} alt="Teaser" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="relative flex flex-col items-center gap-4 z-10">
                <div className="w-20 h-20 rounded-full border-2 border-primary/60 flex items-center justify-center mirror-surface">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-primary ml-1" />
                </div>
                <p className="text-sm tracking-[0.3em] uppercase text-primary font-body">Trailer Coming Soon</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ── Features ── */
const FeaturesSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            Features
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-wide">
            What Awaits You
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={0.2 + i * 0.1} direction="scale">
              <GlassCard className="p-8 h-full" delay={i * 0.25}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <f.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3 tracking-wide">{f.title}</h3>
                  <p className="text-muted-foreground font-body font-light leading-relaxed text-sm">{f.desc}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Game Mechanics ── */
const MechanicsSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            Gameplay
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-wide">
            Survive the Night
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-muted-foreground font-body font-light text-lg leading-relaxed max-w-2xl mb-16">
            Every decision shapes your fate. Al-Raiy blends resource management, 
            environmental storytelling, and psychological tension into a deeply personal horror experience.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mechanics.map((m, i) => (
            <ScrollReveal key={m.title} delay={0.15 + i * 0.1} direction="up">
              <GlassCard className="p-6 h-full text-center" delay={i * 0.2} tilt={false}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <m.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-base text-foreground mb-2 tracking-wide">{m.title}</h3>
                <p className="text-muted-foreground font-body font-light text-xs leading-relaxed">{m.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Gallery ── */
const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
              Gallery
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-16 tracking-wide">
              Screenshots
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {screenshots.map((ss, i) => (
              <ScrollReveal key={i} delay={0.15 + i * 0.1} direction="scale">
                <button
                  onClick={() => setSelected(i)}
                  className="group relative overflow-hidden rounded-2xl aspect-video w-full ring-1 ring-foreground/10 mirror-edge mirror-hover"
                >
                  <img src={ss.src} alt={ss.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-display text-sm text-foreground tracking-wider">{ss.alt}</p>
                    <p className="text-xs font-body text-muted-foreground mt-1">{ss.caption}</p>
                  </div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/20 transition-all duration-500 rounded-2xl" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6 cursor-pointer backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden ring-1 ring-foreground/10 mirror-edge"
          >
            <img
              src={screenshots[selected].src}
              alt={screenshots[selected].alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </motion.div>
          <p className="absolute bottom-8 text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
            Click anywhere to close
          </p>
        </motion.div>
      )}
    </>
  );
};

/* ── Page ── */
const AlraiyPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <FireParticles />
      <CursorTrail />

      {/* Back nav */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div className="absolute inset-0 mirror-surface border-b border-foreground/5" style={{ opacity: 0.95 }} />
        <div className="relative mx-auto max-w-7xl flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <img src={logoText} alt="Abjad Games" className="h-7" />
          </Link>
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">AL-RAIY</span>
        </div>
      </motion.div>

      <AlraiyHero />
      <StorySection />
      <FeaturesSection />
      <MechanicsSection />
      <TrailerSection />
      <GallerySection />

      {/* Steam Wishlist CTA */}
      <section className="py-32 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
        <ScrollReveal direction="scale">
          <div className="mx-auto max-w-xl">
            <GlassCard className="p-12" tilt={false} delay={0}>
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 256 259" className="w-12 h-12 mb-6 text-foreground fill-current opacity-80">
                  <path d="M127.779 0C57.615 0 0 58.239 0 128.726l68.94 28.477c5.93-4.068 13.08-6.452 20.792-6.452.683 0 1.36.019 2.03.056l31.1-45.098v-.634c0-25.464 20.719-46.183 46.183-46.183 25.464 0 46.183 20.72 46.183 46.183 0 25.463-20.719 46.183-46.183 46.183h-1.07l-44.382 31.67c0 .548.024 1.092.073 1.636 0 19.249-15.67 34.919-34.919 34.919-16.852 0-30.917-12.02-34.176-27.935L3.369 168.635C20.753 220.27 69.586 258.401 127.779 258.401c70.54 0 127.779-57.239 127.779-127.701C255.558 57.239 198.319 0 127.779 0" />
                </svg>
                <p className="font-display text-3xl md:text-4xl text-foreground mb-4 tracking-wide">
                  Wishlist on Steam
                </p>
                <p className="text-muted-foreground font-body font-light text-base mb-8 max-w-md">
                  Add AL-RAIY to your Steam Wishlist and be the first to know when it launches.
                </p>
                <a
                  href="https://store.steampowered.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 mirror-surface mirror-edge mirror-hover border border-primary/30 px-10 py-4 font-display text-sm tracking-[0.3em] uppercase text-primary rounded-xl"
                >
                  <svg viewBox="0 0 256 259" className="w-5 h-5 fill-current">
                    <path d="M127.779 0C57.615 0 0 58.239 0 128.726l68.94 28.477c5.93-4.068 13.08-6.452 20.792-6.452.683 0 1.36.019 2.03.056l31.1-45.098v-.634c0-25.464 20.719-46.183 46.183-46.183 25.464 0 46.183 20.72 46.183 46.183 0 25.463-20.719 46.183-46.183 46.183h-1.07l-44.382 31.67c0 .548.024 1.092.073 1.636 0 19.249-15.67 34.919-34.919 34.919-16.852 0-30.917-12.02-34.176-27.935L3.369 168.635C20.753 220.27 69.586 258.401 127.779 258.401c70.54 0 127.779-57.239 127.779-127.701C255.558 57.239 198.319 0 127.779 0" />
                  </svg>
                  Add to Wishlist
                </a>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </section>

      <footer className="border-t border-foreground/5 py-8 px-6 text-center">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} Abjad Games. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AlraiyPage;
