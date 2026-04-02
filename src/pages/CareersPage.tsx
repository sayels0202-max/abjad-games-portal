import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";
import logoText from "@/assets/logo-text.png";
import logoIcon from "@/assets/logo-icon.png";

const openings = [
  {
    title: "Game Developer (Unity/Godot)",
    type: "Full-time",
    location: "Remote",
    description: "Join us as a core game developer working on AL-RAIY. You'll build gameplay systems, AI behaviors, and atmospheric mechanics using pixel-art techniques.",
    requirements: ["2+ years game development experience", "Proficiency in Unity or Godot", "Understanding of 2D pixel-art pipelines", "Passion for indie games and horror"],
  },
  {
    title: "Pixel Artist / Animator",
    type: "Full-time / Contract",
    location: "Remote",
    description: "Create stunning pixel-art environments, characters, and animations that bring Arabian mythology to life with meticulous attention to atmosphere.",
    requirements: ["Strong pixel art portfolio", "Experience with sprite animation", "Understanding of color theory and lighting", "Love for atmospheric horror aesthetics"],
  },
  {
    title: "Sound Designer",
    type: "Contract",
    location: "Remote",
    description: "Design immersive soundscapes that blend Middle Eastern musical traditions with tension-building horror audio to create an unforgettable auditory experience.",
    requirements: ["Experience in game audio design", "Knowledge of Middle Eastern instruments", "Proficiency in DAW software", "Portfolio of atmospheric/horror work"],
  },
  {
    title: "Community Manager",
    type: "Part-time",
    location: "Remote",
    description: "Build and nurture our growing community across social platforms. Be the voice of Abjad Games and connect with players who share our passion.",
    requirements: ["Experience managing gaming communities", "Strong communication skills", "Familiarity with Discord, Twitter, Reddit", "Genuine enthusiasm for indie games"],
  },
];

const CareersPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", portfolio: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder
  };

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
            Join Our Quest
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-wide"
          >
            Build Worlds <span className="text-primary">With Us</span>
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

      {/* Values */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Remote First", desc: "Work from anywhere. We believe talent has no borders." },
            { title: "Creative Freedom", desc: "Your ideas matter. Every team member shapes the vision." },
            { title: "Cultural Impact", desc: "Tell stories that have never been told in gaming." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-border rounded-sm p-6 bg-card/30 hover:border-primary/30 transition-all duration-500 group"
            >
              <h3 className="font-display text-lg text-foreground mb-2 tracking-wide group-hover:text-primary transition-colors duration-300">{v.title}</h3>
              <p className="text-muted-foreground font-body font-light text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide"
          >
            Open Positions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-body font-light mb-12"
          >
            Don't see a perfect fit? Reach out anyway — we're always looking for exceptional people.
          </motion.p>

          <div className="space-y-4">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <button
                  onClick={() => setSelectedJob(selectedJob === i ? null : i)}
                  className={`w-full text-left border rounded-sm p-6 transition-all duration-500 ${
                    selectedJob === i
                      ? "border-primary/50 bg-card/60"
                      : "border-border bg-card/20 hover:border-primary/30 hover:bg-card/40"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl text-foreground tracking-wide">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-muted-foreground font-body text-sm">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: selectedJob === i ? 180 : 0 }}
                      className="text-primary text-xl font-light"
                    >
                      ↓
                    </motion.span>
                  </div>
                </button>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedJob === i ? "auto" : 0,
                    opacity: selectedJob === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="border-x border-b border-border/50 rounded-b-sm p-6 bg-card/10">
                    <p className="text-muted-foreground font-body font-light leading-relaxed mb-4">
                      {job.description}
                    </p>
                    <h4 className="font-display text-sm text-foreground tracking-wide mb-3">Requirements</h4>
                    <ul className="space-y-2 mb-6">
                      {job.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-muted-foreground font-body text-sm font-light">
                          <span className="text-primary mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#apply"
                      className="inline-block border border-primary/40 px-6 py-2.5 font-display text-xs tracking-[0.3em] uppercase text-primary transition-all duration-500 hover:bg-primary/10 hover:border-primary hover:box-glow"
                    >
                      Apply Now
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide text-center"
          >
            Apply
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-body font-light text-center mb-12"
          >
            Tell us about yourself and why you'd be a great fit for the team.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-card/50 border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 transition-colors duration-300 placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-card/50 border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 transition-colors duration-300 placeholder:text-muted-foreground/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Portfolio / Website</label>
              <input
                type="url"
                value={form.portfolio}
                onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                className="w-full bg-card/50 border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 transition-colors duration-300 placeholder:text-muted-foreground/50"
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Why Abjad?</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full bg-card/50 border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 transition-colors duration-300 resize-none placeholder:text-muted-foreground/50"
                placeholder="Tell us about yourself and what drives you..."
              />
            </div>
            <button
              type="submit"
              className="w-full border border-primary/40 px-8 py-3 font-display text-sm tracking-[0.3em] uppercase text-primary transition-all duration-500 hover:bg-primary/10 hover:border-primary hover:box-glow rounded-sm"
            >
              Submit Application
            </button>
          </motion.form>
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
