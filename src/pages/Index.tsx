import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import FireParticles from "@/components/FireParticles";
import CursorTrail from "@/components/CursorTrail";
import ScrollWatermark from "@/components/ScrollWatermark";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import StudioSection from "@/components/StudioSection";
import TeamSection from "@/components/TeamSection";
import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";


const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isVisible={loading} onComplete={() => {}} />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <FireParticles />
          <CursorTrail />
          <ScrollWatermark />
          <Navbar />
          <HeroSection />
          <ShowcaseSection />
          <StudioSection />
          <CommunitySection />
          <TeamSection />
          <ContactSection />
          <Footer />
          
          
        </motion.div>
      )}
    </>
  );
};

export default Index;
