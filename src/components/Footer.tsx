const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-sm tracking-[0.2em] text-muted-foreground">
        ABJAD GAMES
      </p>
      <p className="text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} Abjad Games. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
