import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import banner from "@/assets/banner.png";
import logoText from "@/assets/logo-text.png";
import screenshot1 from "@/assets/screenshot1.png";
import screenshot2 from "@/assets/screenshot2.png";
import screenshot3 from "@/assets/screenshot3.png";
import screenshot4 from "@/assets/screenshot4.png";
import screenshot5 from "@/assets/screenshot5.png";
import screenshot6 from "@/assets/screenshot6.png";
import screenshot7 from "@/assets/screenshot7.png";
import screenshot8 from "@/assets/screenshot8.png";
import screenshot9 from "@/assets/screenshot9.png";
import screenshot10 from "@/assets/screenshot10.png";
import screenshot11 from "@/assets/screenshot11.png";
import screenshot12 from "@/assets/screenshot12.png";
import screenshot13 from "@/assets/screenshot13.png";
import gameplayBg1 from "@/assets/gameplay-bg1.gif";
import gameplayBg2 from "@/assets/gameplay-bg2.gif";
import gameplayBg3 from "@/assets/gameplay-bg3.gif";
import FireParticles from "@/components/FireParticles";
import CursorTrail from "@/components/CursorTrail";
import ScrollReveal from "@/components/ui/ScrollReveal";

const mediaItems = [
  { src: gameplayBg1, alt: "Gameplay 1" },
  { src: gameplayBg2, alt: "Gameplay 2" },
  { src: screenshot1, alt: "Screenshot 1" },
  { src: screenshot2, alt: "Screenshot 2" },
  
  
  { src: screenshot5, alt: "Screenshot 5" },
  
  { src: screenshot7, alt: "Screenshot 7" },
  
  { src: screenshot9, alt: "Screenshot 9" },
  
  
  
  
];

const MediaGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setActiveIndex((index + mediaItems.length) % mediaItems.length);
  };

  // Scroll thumbnail into view when active changes
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setThumbRef = (el: HTMLButtonElement | null, i: number) => {
    thumbRefs.current[i] = el;
  };

  useState(() => {
    const el = thumbRefs.current[activeIndex];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

  return (
    <div className="space-y-3">
      {/* Main Viewer */}
      <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-foreground/10 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={mediaItems[activeIndex].src}
            alt={mediaItems[activeIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Left arrow */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/90 transition-all opacity-0 group-hover:opacity-100"
        >
          ‹
        </button>
        {/* Right arrow */}
        <button
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/90 transition-all opacity-0 group-hover:opacity-100"
        >
          ›
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-background/70 backdrop-blur-sm rounded-md px-3 py-1 text-xs font-body text-foreground">
          {activeIndex + 1} / {mediaItems.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="relative group/scroll">
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {mediaItems.map((item, i) => (
            <button
              key={i}
              ref={(el) => setThumbRef(el, i)}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-24 h-14 md:w-28 md:h-16 rounded-md overflow-hidden ring-1 transition-all duration-200 ${
                i === activeIndex
                  ? "ring-primary ring-2 brightness-100"
                  : "ring-foreground/10 brightness-75 hover:brightness-100"
              }`}
            >
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AlraiyPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const sectionOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

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
          <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300">
            <ArrowLeft className="w-4 h-4" />
            <img src={logoText} alt="Abjad Games" className="h-7" />
          </Link>
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">AL-RAIY</span>
        </div>
      </motion.div>

      {/* Hero */}
      <div ref={heroRef} className="relative h-[180vh]">
        <motion.section className="sticky top-0 h-screen overflow-hidden" style={{ opacity: sectionOpacity }}>
          <motion.div className="absolute inset-0" style={{ y, scale }}>
            <img src={gameplayBg3} alt="Al-Raiy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
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
              transition={{ duration: 1.2, delay: 0.5 }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.15em] text-foreground text-glow"
            >
              AL-RAIY
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1.5, delay: 1 }}
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
          </motion.div>
        </motion.section>
      </div>

      {/* Story */}
      <section className="relative py-32 px-6">
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
              The Story
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-10 tracking-wide">
              Every Shadow Hides a Story
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="space-y-5 text-muted-foreground font-body font-light text-base md:text-lg leading-relaxed">
              <p>
                Our hero awakens inside a strange tent on a pitch-black night. A man with hidden features stands before him, shrouded in darkness with a mesmerizing fire by his side. The stranger claims he is here to help — follow his instructions to survive the wrath of the monsters lurking across these desolate farmlands.
              </p>
              <p>
                What does this place hide? Who lurks in the darkness — and is there any escape?
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Media Section — Steam-style layout */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
        <div className="relative mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4 text-center">
              Media
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-12 tracking-wide text-center">
              Into the Darkness
            </h2>
          </ScrollReveal>

          {/* Main viewer — Trailer placeholder */}
          <ScrollReveal delay={0.2} direction="scale">
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-foreground/10 mirror-edge mb-4">
              <div className="absolute inset-0 mirror-surface flex items-center justify-center">
                <img src={banner} alt="Trailer placeholder" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="relative flex flex-col items-center gap-4 z-10">
                  <div className="w-20 h-20 rounded-full border-2 border-primary/40 flex items-center justify-center mirror-surface">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-primary ml-1" />
                  </div>
                  <p className="text-sm tracking-[0.3em] uppercase text-primary font-body">Trailer Coming Soon</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Thumbnails strip */}
          <MediaThumbnails />
        </div>
      </section>

      {/* Steam Wishlist CTA */}
      <section className="py-32 px-6 text-center">
        <ScrollReveal direction="scale">
          <div className="mx-auto max-w-md">
            <p className="font-display text-3xl md:text-4xl text-foreground mb-4 tracking-wide">
              Wishlist on Steam
            </p>
            <p className="text-muted-foreground font-body font-light text-base mb-8">
              Be the first to know when AL-RAIY launches.
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
