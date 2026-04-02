import { motion } from "framer-motion";

const socials = [
  {
    name: "X (Twitter)",
    href: "https://x.com/AbjadGames",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.gg/UFx2PNFS45",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/abjad-games",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Steam",
    href: "#",
    comingSoon: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91a4.26 4.26 0 014.258-4.256 4.26 4.26 0 014.258 4.256 4.26 4.26 0 01-4.258 4.256h-.098l-4.07 2.907c0 .052.004.105.004.158 0 2.39-1.935 4.332-4.321 4.332a4.321 4.321 0 01-4.296-3.848L.453 14.472C1.681 19.946 6.349 24 11.979 24c6.627 0 12-5.373 12-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25a2.848 2.848 0 003.753-1.44 2.841 2.841 0 00.007-2.181 2.848 2.848 0 00-1.538-1.549 2.856 2.856 0 00-2.076-.128l1.521.629a2.1 2.1 0 01-1.508 3.93zm8.877-8.395a2.843 2.843 0 00-2.84-2.838 2.843 2.843 0 00-2.84 2.838 2.843 2.843 0 002.84 2.838 2.843 2.843 0 002.84-2.838zm-4.968-.002a2.13 2.13 0 012.128-2.126 2.13 2.13 0 012.128 2.126 2.13 2.13 0 01-2.128 2.127 2.13 2.13 0 01-2.128-2.127z"/>
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="font-display text-sm tracking-[0.2em] text-muted-foreground">
        ABJAD GAMES
      </p>

      <div className="flex items-center gap-5">
        {socials.map((s) => (
          <motion.a
            key={s.name}
            href={s.href}
            target={s.comingSoon ? undefined : "_blank"}
            rel={s.comingSoon ? undefined : "noopener noreferrer"}
            aria-label={s.name}
            className={`text-muted-foreground hover:text-primary transition-colors duration-300 ${s.comingSoon ? "opacity-40 pointer-events-none" : ""}`}
            whileHover={{ y: -4, scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            title={s.comingSoon ? "Coming Soon" : s.name}
          >
            <motion.span
              className="block"
              whileHover={{ filter: "drop-shadow(0 0 8px hsl(38 92% 50% / 0.5))" }}
            >
              {s.icon}
            </motion.span>
          </motion.a>
        ))}
      </div>

      <p className="text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} Abjad Games. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
