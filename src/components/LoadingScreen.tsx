import { motion, AnimatePresence } from "framer-motion";
import abjadIcon from "@/assets/abjad-icon-white.svg";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(38 92% 50% / 0.08) 0%, transparent 70%)" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: [0, 1, 0.6] }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(38 92% 50% / 0.15) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={abjadIcon}
                alt="Abjad Games"
                className="abjad-icon-fill w-28 md:w-36 animate-breathe relative z-10"
                fetchPriority="high"
              />
            </div>

            <motion.div
              className="mt-8 h-[2px] bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              style={{ boxShadow: "0 0 12px hsl(38 92% 50% / 0.5)" }}
            />

            <motion.p
              className="mt-4 text-xs tracking-[0.4em] uppercase text-muted-foreground font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
