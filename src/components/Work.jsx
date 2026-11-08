import { useEffect, useRef } from "react";
import { projects, workIntro } from "../data.js";
import CurvedCarousel from "./CurvedCarousel.jsx";

const ICONS = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 19 5.5-9 4 6 2.5-3.5L21 19z" />
      <circle cx="16.5" cy="6.5" r="2" />
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />
    </svg>
  ),
};

export default function Work() {
  const ref = useRef(null);

  // Play the entrance once, when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("play");
      el.querySelectorAll(".r-card").forEach((c) => c.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { el.classList.add("play"); io.disconnect(); }
      },
      { threshold: 0.18 }
    );
    io.observe(el);

    // each card animates when it reaches the screen (matters on phones)
    const cio = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("show"); cio.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    el.querySelectorAll(".r-card").forEach((c) => cio.observe(c));
    return () => { io.disconnect(); cio.disconnect(); };
  }, []);

  let w = 0;
  const words = (line) =>
    line.split(" ").map((word) => (
      <span className="w" style={{ "--i": w++ }} key={w}>{word}&nbsp;</span>
    ));

  return (
    <section className="results" id="work" ref={ref}>
      <div className="results-inner">
        <span className="eyebrow r-fade"><b>01</b> Selected work</span>
        <h2 className="r-title">
          <span className="r-line">{words(workIntro.title[0])}</span>
          <span className="r-line">{words(workIntro.title[1])}</span>
        </h2>
        <p className="r-lead">{workIntro.lead}</p>
        <span className="r-rule" aria-hidden="true" />

      </div>

      <div className="curve-wrap r-curve">
        <span className="hand note-drag" aria-hidden="true">
          drag me!
          <svg viewBox="0 0 120 70" fill="none"><path pathLength="1" d="M8 10 C 40 6, 80 18, 96 52 M96 52 l-12 -4 M96 52 l3 -12" /></svg>
        </span>
        <CurvedCarousel items={projects} />
      </div>

      <div className="results-inner">
        <ul className="proj-list r-fade2">
          {projects.map((p) => {
            const url = p.live || p.code;
            return (
              <li key={p.title}>
                {url ? <a href={url} target="_blank" rel="noreferrer">{p.title} <span aria-hidden="true">↗</span></a> : <span>{p.title}</span>}
                <small>{p.tags?.slice(0, 2).join(" · ")}</small>
              </li>
            );
          })}
        </ul>

        <a className="r-btn" href={workIntro.moreUrl || "#contact"}>{workIntro.button}</a>
      </div>
    </section>
  );
}
