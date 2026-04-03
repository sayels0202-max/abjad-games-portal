import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <video
            ref={videoRef}
            src="/swg.mp4"
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
