import { useEffect, useState } from "react";
import { profile, nav } from "../data.js";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href="#top">
        <span className="brand-mark" aria-hidden="true">{profile.initial}</span>
        {profile.name}
      </a>
      <nav className="links">
        {nav.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
        <a className="cta" href="#contact">
          Say hi! <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
