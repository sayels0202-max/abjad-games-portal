import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const AmbientAudio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.play().catch(() => {});
      audio.volume = 0.3;
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="none" />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {showTooltip && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-xs font-body text-muted-foreground bg-card/80 backdrop-blur-sm border border-foreground/10 rounded-full px-3 py-1.5 whitespace-nowrap"
            >
              🎵 شغّل الصوت للتجربة الكاملة
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleAudio}
          className="w-11 h-11 rounded-full mirror-surface border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>
      </div>
    </>
  );
};

export default AmbientAudio;
