import { motion, useScroll, useTransform } from "framer-motion";
import logoOutline from "@/assets/logo-outline.png";

const ScrollWatermark = () => {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.04, 0.04, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-20vh"]);

  return (
    <motion.div
      className="fixed inset-0 z-[0] flex items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      <motion.img
        src={logoOutline}
        alt=""
        className="w-[50vw] max-w-[600px]"
        style={{ rotate, scale, y }}
      />
    </motion.div>
  );
};

export default ScrollWatermark;
