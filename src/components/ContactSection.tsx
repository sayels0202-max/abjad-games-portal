import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import GlassCard from "./ui/GlassCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="relative mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            Contact
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-wide">
            Get in Touch
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-muted-foreground font-body font-light text-lg leading-relaxed mb-12">
            Have a question, a partnership idea, or just want to say hello? We'd love to hear from you.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35} direction="scale">
          <GlassCard className="p-8 text-left" tilt={false}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-background/50 border border-border/60 rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background/50 border border-border/60 rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full bg-background/50 border border-border/60 rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-primary/40 px-8 py-3 font-display text-sm tracking-[0.3em] uppercase text-primary transition-all duration-500 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_25px_hsl(38_92%_53%/0.15)] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
