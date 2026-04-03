import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
  onVideoEnd?: () => void;
}

const LoadingScreen = ({ isVisible, onComplete, onVideoEnd }: LoadingScreenProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <video
            src="/swg.mp4"
            autoPlay
            muted
            playsInline
            onEnded={onVideoEnd}
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
