import { useEffect, useRef, useState } from "react";
import { profile, about, skills, projects } from "../data.js";

// Fade sections in as they scroll into view
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionHead({ index, label, title }) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">
        <b>{index}</b> {label}
      </span>
      <h2>{title}</h2>
    </div>
  );
}

// Counts up once when it scrolls into view
function Counter({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setVal(to); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1400;
      const tick = (now) => {
        const k = Math.min((now - start) / dur, 1);
        setVal(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

// A short hand-drawn arrow that draws itself when its parent is revealed
const Arrow = ({ d, vb = "0 0 80 60" }) => (
  <svg className="hand-arrow" viewBox={vb} fill="none" aria-hidden="true"><path pathLength="1" d={d} /></svg>
);

export function About() {
  const stats = [
    { to: projects.length, label: "projects shipped", note: "and counting!" },
    { to: 144, label: "hours of team training", sub: "CodeMap 2026 · TAQAT" },
    { to: 91.31, decimals: 2, suffix: "%", label: "university GPA" },
  ];
  return (
    <section className="section" id="about">
      <SectionHead index="02" label="About" title={about.title} />
      <div className="about-grid">
        <div className="about-text reveal">
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {profile.cvUrl && (
            <div className="cv-row">
              <a className="btn" href={profile.cvUrl} target="_blank" rel="noreferrer">
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <span className="hand note-cv" aria-hidden="true">
                <Arrow d="M70 40 C 52 44, 30 40, 10 22 M10 22 l3 12 M10 22 l12 1" />
                1 page, ATS-friendly ✓
              </span>
            </div>
          )}
        </div>
        <dl className="facts reveal">
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="stats reveal">
        {stats.map((st) => (
          <li key={st.label}>
            <strong><Counter to={st.to} decimals={st.decimals} suffix={st.suffix} /></strong>
            <span>{st.label}</span>
            {st.sub && <small>{st.sub}</small>}
            {st.note && (
              <em className="hand note-count" aria-hidden="true">
                <Arrow vb="0 0 70 50" d="M62 8 C 40 6, 22 16, 12 38 M12 38 l-1 -12 M12 38 l10 -6" />
                {st.note}
              </em>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

const SERVICES = [
  { icon: "M3 5h18v14H3z M3 9h18 M7 7h.01", title: "Websites & landing pages", text: "Fast, responsive sites for businesses and personal brands, from Figma to a live link." },
  { icon: "M4 20V10M10 20V4M16 20v-7M22 20H2", title: "Web apps & dashboards", text: "React + TypeScript apps with real data, charts, maps and booking flows." },
  { icon: "M4 5h16v11H9l-5 4z M9 10.5h.01M12 10.5h.01M15 10.5h.01", title: "Arabic/English & AI", text: "Right-to-left Arabic sites with English versions, and AI chatbots like the one on this page." },
];

export function Skills() {
  const rowA = skills[0].tools;
  const rowB = [...skills[1].tools, ...skills[2].tools];
  const Row = ({ items, dir }) => (
    <div className={`marq ${dir}`} aria-hidden="true">
      <div className="marq-track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
  return (
    <section className="section skills-sec" id="skills">
      <SectionHead index="03" label="What I do" title="Web, mobile & AI." />
      <div className="marqs reveal">
        <Row items={rowA} dir="left" />
        <Row items={rowB} dir="right" />
        <p className="sr-only">Tools: {[...rowA, ...rowB].join(", ")}</p>
      </div>
      <div className="services">
        {SERVICES.map((sv, i) => (
          <article className="service reveal" style={{ "--d": `${i * 120}ms` }} key={sv.title}>
            <span className="service-ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={sv.icon} /></svg>
            </span>
            <h3>{sv.title}</h3>
            <p>{sv.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
