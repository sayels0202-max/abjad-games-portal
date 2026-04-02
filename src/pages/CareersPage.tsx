import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase } from "lucide-react";
import logoText from "@/assets/logo-text.png";
import logoIcon from "@/assets/logo-icon.png";

const CareersPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-background/90 border-b border-border/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs tracking-[0.2em] uppercase font-body">Back</span>
          </Link>
          <Link to="/">
            <img src={logoText} alt="ABJAD GAMES" className="h-10 md:h-12" />
          </Link>
          <div className="w-20" />
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.img
            src={logoIcon}
            alt="Abjad Games"
            className="w-20 md:w-28 mx-auto mb-8 opacity-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 0.8, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-6"
          >
            Careers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-wide"
          >
            Join Our <span className="text-primary">Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="max-w-2xl mx-auto text-muted-foreground font-body font-light text-lg leading-relaxed"
          >
            We're a small team with a big vision. If you're passionate about crafting 
            unforgettable gaming experiences rooted in rich cultural narratives, we want to hear from you.
          </motion.p>
        </div>
      </section>

      {/* No Openings */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-border/50 rounded-xl p-12 md:p-16 bg-card/20"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-7 h-7 text-primary/60" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-wide">
              No Open Positions
            </h2>
            <p className="text-muted-foreground font-body font-light leading-relaxed mb-2">
              There are currently no job openings available.
            </p>
            <p className="text-muted-foreground/70 font-body font-light text-sm leading-relaxed">
              Follow us on social media to stay updated on future opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-sm tracking-[0.2em] text-muted-foreground">ABJAD GAMES</p>
          <p className="text-xs text-muted-foreground font-body">© {new Date().getFullYear()} Abjad Games. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
