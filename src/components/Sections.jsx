import { useEffect } from "react";
import { profile, about, skills } from "../data.js";

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

export function About() {
  return (
    <section className="section" id="about">
      <SectionHead index="02" label="About" title={about.title} />
      <div className="about-grid">
        <div className="about-text reveal">
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {profile.cvUrl && (
            <a className="btn" href={profile.cvUrl} target="_blank" rel="noreferrer">
              Download CV <span aria-hidden="true">↓</span>
            </a>
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
    </section>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHead index="03" label="What I do" title="Web, mobile & AI." />
      <div className="skills-grid">
        {skills.map((s) => (
          <div className="skill reveal" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul className="chips">
              {s.tools.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
