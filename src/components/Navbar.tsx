import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";
import logoText from "@/assets/logo-text.png";

const navLinks = [
  { label: "Games", href: "#showcase" },
  { label: "Studio", href: "#about" },
  { label: "News", href: "#community" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.95]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const sections = ["showcase", "about", "community", "team", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 mirror-surface border-b border-foreground/5"
          style={{ opacity: bgOpacity }}
        />
        <div className="relative mx-auto max-w-7xl flex items-center justify-between">
          <a href="#" className="flex items-center group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img
              src={logoText}
              alt="ABJAD GAMES"
              className="h-20 md:h-24 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_hsl(38_92%_50%/0.3)]"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative text-xs tracking-[0.2em] uppercase font-body transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary" transition={{ duration: 0.3 }} />
                  )}
                </a>
              );
            })}

            {/* Careers icon */}
            <Link
              to="/careers"
              className="relative text-muted-foreground hover:text-primary transition-colors duration-300 ml-2"
              title="Careers"
            >
              <Briefcase className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
            <motion.span className="block w-5 h-[1.5px] bg-foreground" animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="block w-5 h-[1.5px] bg-foreground" animate={isOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-[1.5px] bg-foreground" animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          </button>
        </div>
      </motion.nav>

      <motion.div
        className="fixed inset-0 z-30 bg-background/98 flex flex-col items-center justify-center gap-8 md:hidden"
        initial={false}
        animate={isOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.4 }}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="font-display text-2xl tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            {link.label}
          </motion.a>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: navLinks.length * 0.08 }}
        >
          <Link
            to="/careers"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 font-display text-lg tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <Briefcase className="w-5 h-5" strokeWidth={1.5} />
            Careers
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;
