import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Creepy sound generator using Web Audio API ──
const playCreepySound = (type: "whisper" | "jumpscare" | "glitch" | "heartbeat") => {
  try {
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    if (type === "whisper") {
      // Low eerie drone
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
      osc.connect(gain);
      osc.start();
      osc.stop(ctx.currentTime + 2);
    } else if (type === "jumpscare") {
      // Sharp noise burst
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      source.connect(gain);
      source.start();
    } else if (type === "glitch") {
      // Digital distortion
      for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(200 + Math.random() * 2000, ctx.currentTime + i * 0.05);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.08);
        osc.connect(g).connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + i * 0.05 + 0.1);
      }
    } else if (type === "heartbeat") {
      for (let beat = 0; beat < 4; beat++) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(50, ctx.currentTime + beat * 0.6);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.2, ctx.currentTime + beat * 0.6);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + beat * 0.6 + 0.2);
        osc.connect(g).connect(ctx.destination);
        osc.start(ctx.currentTime + beat * 0.6);
        osc.stop(ctx.currentTime + beat * 0.6 + 0.25);
      }
    }
  } catch {}
};

// ── Arabic secret messages ──
const secretMessages = [
  "هل تراقبنا... أم نحن من نراقبك؟",
  "الراعي لا ينسى... ولا يسامح",
  "في الظلام، كل شيء يسمع",
  "لا تنظر خلفك...",
  "هل سمعت ذلك؟ لا أحد هنا غيرك... أليس كذلك؟",
  "الحقيقة مدفونة تحت الرمال",
  "مرحباً... كنا ننتظرك",
];

const EasterEggs = () => {
  // ── Konami Code ──
  const [konamiTriggered, setKonamiTriggered] = useState(false);
  const konamiSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const konamiIndex = useRef(0);

  // ── Secret word "alraiy" ──
  const [horrorMode, setHorrorMode] = useState(false);
  const secretWord = "alraiy";
  const typedChars = useRef("");

  // ── Scroll ghost ──
  const [showGhost, setShowGhost] = useState(false);
  const ghostShown = useRef(false);
  const ghostPosition = useRef({ x: 0, y: 0 });

  // ── Secret message overlay ──
  const [secretMsg, setSecretMsg] = useState<string | null>(null);

  const showSecretMessage = useCallback((msg: string, sound: "whisper" | "jumpscare" | "glitch" | "heartbeat" = "whisper") => {
    playCreepySound(sound);
    setSecretMsg(msg);
    setTimeout(() => setSecretMsg(null), 4000);
  }, []);

  // Keyboard listener for Konami + secret word
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami code check
      if (e.key === konamiSequence[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === konamiSequence.length) {
          konamiIndex.current = 0;
          setKonamiTriggered(true);
          playCreepySound("jumpscare");
          showSecretMessage(secretMessages[Math.floor(Math.random() * secretMessages.length)], "heartbeat");
          setTimeout(() => setKonamiTriggered(false), 3000);
        }
      } else {
        konamiIndex.current = 0;
      }

      // Secret word check
      typedChars.current += e.key.toLowerCase();
      if (typedChars.current.length > 20) {
        typedChars.current = typedChars.current.slice(-20);
      }
      if (typedChars.current.includes(secretWord)) {
        typedChars.current = "";
        setHorrorMode(true);
        playCreepySound("glitch");
        showSecretMessage("الراعي يعرف أنك هنا...", "heartbeat");
        setTimeout(() => setHorrorMode(false), 5000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSecretMessage]);

  // Scroll ghost - appears once randomly
  useEffect(() => {
    const handleScroll = () => {
      if (ghostShown.current) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      // Trigger between 40-60% scroll with 30% chance
      if (scrollPercent > 0.4 && scrollPercent < 0.6 && Math.random() < 0.02) {
        ghostShown.current = true;
        ghostPosition.current = {
          x: Math.random() * (window.innerWidth - 200),
          y: window.scrollY + Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
        };
        setShowGhost(true);
        playCreepySound("whisper");
        setTimeout(() => setShowGhost(false), 800);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Konami Code full-screen flash */}
      <AnimatePresence>
        {konamiTriggered && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Red flash */}
            <motion.div
              className="absolute inset-0 bg-red-900/40"
              animate={{ opacity: [0, 1, 0, 0.8, 0, 0.5, 0] }}
              transition={{ duration: 2, times: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 1] }}
            />
            {/* Scan lines */}
            <div className="absolute inset-0" style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            }} />
            {/* Glitch text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ x: [0, -5, 5, -3, 0], y: [0, 3, -3, 2, 0] }}
              transition={{ duration: 0.3, repeat: 5 }}
            >
              <span className="font-display text-6xl md:text-8xl text-red-500/80 tracking-[0.3em]" style={{ textShadow: "3px 0 cyan, -3px 0 red" }}>
                ☠
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horror mode overlay (secret word) */}
      <AnimatePresence>
        {horrorMode && (
          <motion.div
            className="fixed inset-0 z-[90] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dark vignette */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
            }} />
            {/* Screen shake via CSS filter */}
            <motion.div
              className="absolute inset-0"
              style={{ backdropFilter: "hue-rotate(180deg) saturate(3)" }}
              animate={{ opacity: [0.4, 0.8, 0.2, 0.6, 0] }}
              transition={{ duration: 4, times: [0, 0.2, 0.4, 0.6, 1] }}
            />
            {/* Creepy eye */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.5, 1], rotate: [-180, 0, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3 }}
            >
              👁
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll ghost */}
      <AnimatePresence>
        {showGhost && (
          <motion.div
            className="fixed z-[80] pointer-events-none select-none"
            style={{
              left: ghostPosition.current.x,
              top: ghostPosition.current.y - window.scrollY,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0.3, 0], scale: [0.5, 1.2, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-7xl filter drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]" style={{ opacity: 0.7 }}>
              👻
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret message toast */}
      <AnimatePresence>
        {secretMsg && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] pointer-events-none"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-background/90 backdrop-blur-xl border border-red-500/30 rounded-lg px-8 py-5 max-w-md text-center shadow-[0_0_60px_rgba(220,38,38,0.3)]">
              <p className="font-display text-lg md:text-xl text-red-400 tracking-wider leading-relaxed" dir="rtl">
                {secretMsg}
              </p>
              <div className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              <p className="mt-2 text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase">Easter Egg Unlocked</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Export the logo click handler for use in Navbar
export const useLogoEasterEgg = () => {
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout>();

  const handleLogoClick = useCallback(() => {
    clickCount.current++;
    clearTimeout(clickTimer.current);

    if (clickCount.current >= 7) {
      clickCount.current = 0;
      playCreepySound("heartbeat");
      window.dispatchEvent(new CustomEvent("easter-egg-msg", {
        detail: secretMessages[Math.floor(Math.random() * secretMessages.length)],
      }));
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 2000);
    }
  }, []);

  return handleLogoClick;
};

export default EasterEggs;
