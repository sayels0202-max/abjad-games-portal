import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const AmbientAudio = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play immediately on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isMuted) {
      audio.pause();
      setIsMuted(true);
    } else {
      audio.play().catch(() => {});
      audio.volume = 0.3;
      setIsMuted(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="none" />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <AnimatePresence>
          {(showTooltip || isHovered) && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center gap-2 bg-background/90 backdrop-blur-md border border-foreground/10 rounded-lg px-3 py-2 shadow-lg"
            >
              {/* Animated equalizer bars */}
              <div className="flex items-end gap-[2px] h-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[2px] rounded-full bg-primary/70"
                    animate={
                      !isMuted
                        ? {
                            height: ["4px", "12px", "6px", "10px", "4px"],
                          }
                        : { height: "4px" }
                    }
                    transition={
                      !isMuted
                        ? {
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }
                        : { duration: 0.3 }
                    }
                  />
                ))}
              </div>
              <span className="text-[11px] font-body text-muted-foreground whitespace-nowrap tracking-wide">
                {isMuted ? "Enable sound" : "Now playing"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleAudio}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
            isMuted
              ? "bg-background/80 border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
          } backdrop-blur-md shadow-lg`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isMuted ? "Enable sound" : "Mute sound"}
        >
          {/* Pulse ring when playing */}
          {!isMuted && (
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/40"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default AmbientAudio;
