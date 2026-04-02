import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Send, X } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@abjadgames.com",
    href: "mailto:contact@abjadgames.com",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: "Join our server",
    href: "#",
  },
  {
    icon: Send,
    label: "X / Twitter",
    value: "@AbjadGames",
    href: "#",
  },
];

const ContactSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="relative mx-auto max-w-3xl text-center">
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
          <p className="text-muted-foreground font-body font-light text-lg leading-relaxed mb-16">
            Have a question or partnership idea? Reach out through any channel.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            const isExpanded = expanded === i;

            return (
              <ScrollReveal key={method.label} delay={0.3 + i * 0.1}>
                <motion.div
                  className="relative cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="mirror-surface mirror-edge rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    <div className="p-6 flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-xl mirror-surface border border-border/40 flex items-center justify-center">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <span className="font-display text-sm tracking-wider text-foreground uppercase">
                        {method.label}
                      </span>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 border-t border-border/30 pt-4">
                            <a
                              href={method.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm font-body text-primary hover:underline"
                            >
                              {method.value}
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
