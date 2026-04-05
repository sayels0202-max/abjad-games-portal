import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import GlassCard from "./ui/GlassCard";
import { supabase } from "@/integrations/supabase/client";

type FormStatus = "idle" | "loading" | "success" | "error";
type FieldErrors = { name?: string; email?: string; message?: string };

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!form.name.trim()) errors.name = "Please enter your name";
    if (!form.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email";
    }
    if (!form.message.trim()) errors.message = "Please enter your message";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    if (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setFieldErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
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
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full border-2 border-primary/60 flex items-center justify-center mb-6"
                    style={{ boxShadow: "0 0 30px hsl(38 92% 53% / 0.15)" }}
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-8 h-8 text-primary"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      />
                    </motion.svg>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-display text-xl tracking-wider text-foreground mb-2"
                  >
                    MESSAGE RECEIVED
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs"
                  >
                    Thank you for reaching out. We'll get back to you shortly.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Error banner */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-destructive/30 rounded-md px-4 py-3 bg-destructive/5"
                      >
                        <p className="text-sm font-body text-destructive">
                          Something went wrong. Please try again later.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); clearFieldError("name"); }}
                      className={`w-full bg-background/50 border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50 ${fieldErrors.name ? "border-destructive/60" : "border-border/60"}`}
                      placeholder="Your name"
                      maxLength={100}
                    />
                    <AnimatePresence>
                      {fieldErrors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-destructive font-body mt-1.5"
                        >
                          {fieldErrors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); clearFieldError("email"); }}
                      className={`w-full bg-background/50 border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50 ${fieldErrors.email ? "border-destructive/60" : "border-border/60"}`}
                      placeholder="your@email.com"
                      maxLength={255}
                    />
                    <AnimatePresence>
                      {fieldErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-destructive font-body mt-1.5"
                        >
                          {fieldErrors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); clearFieldError("message"); }}
                      rows={5}
                      className={`w-full bg-background/50 border rounded-md px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none placeholder:text-muted-foreground/50 ${fieldErrors.message ? "border-destructive/60" : "border-border/60"}`}
                      placeholder="Tell us what's on your mind..."
                      maxLength={1000}
                    />
                    <AnimatePresence>
                      {fieldErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-destructive font-body mt-1.5"
                        >
                          {fieldErrors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full border border-primary/40 px-8 py-3 font-display text-sm tracking-[0.3em] uppercase text-primary transition-all duration-500 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_25px_hsl(38_92%_53%/0.15)] rounded-md disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.span
                          className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
