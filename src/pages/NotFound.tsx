import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import theCrew from "@/assets/hmam-the-crew.webp";

// A runaway-ingredient 404 in Hunt Me a Meal's voice (replaces the old horror one)
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden px-6 py-16">
      {/* Warm kitchen glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(var(--primary) / 0.08), transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <motion.p
          className="font-display text-6xl md:text-7xl font-bold leading-none tracking-wider select-none"
          style={{ color: "transparent", WebkitTextStroke: "2px hsl(var(--primary) / 0.7)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        >
          404
        </motion.p>

        {/* The chefs, with the carrot making off with a controller */}
        <motion.img
          src={theCrew}
          alt="Three Hunt Me a Meal chefs while a carrot runs off with a controller"
          className="mx-auto -mt-2 w-full max-w-lg aspect-video object-cover"
          style={{
            WebkitMaskImage: "radial-gradient(closest-side, #000 50%, transparent 100%)",
            maskImage: "radial-gradient(closest-side, #000 50%, transparent 100%)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-bold text-foreground tracking-wide">
            This page ran off.
          </h1>
          <p className="mt-4 text-muted-foreground font-body font-light text-lg leading-relaxed">
            Probably with the carrot. Our chefs are chasing it.
          </p>
          <p lang="ar" dir="rtl" className="mt-2 text-primary/70 font-body text-lg">
            الصفحة شردت… والطباخين يلحقونها!
          </p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 mirror-surface mirror-edge mirror-hover border border-primary/40 px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/10 rounded-xl transition-colors"
          >
            Back home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
