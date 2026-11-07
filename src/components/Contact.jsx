import { useState } from "react";
import { profile, socials, contact } from "../data.js";

const ICONS = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7 3 12l5 5M16 7l5 5-5 5" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
    </svg>
  ),
  CV: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  ),
};

// "github.com/malaknashwan01-del" from a full URL
const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const encode = (data) =>
  Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&");

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", "bot-field": "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = profile.email;
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Netlify Forms: works once the site is deployed on Netlify
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
      if (!res.ok) throw new Error(res.status);
      setStatus("sent");
      setForm({ name: "", email: "", message: "", "bot-field": "" });
    } catch {
      setStatus("error");
    }
  };

  const cards = [
    ...socials.filter((s) => s.url).map((s) => ({ label: s.label, sub: handle(s.url), url: s.url, icon: ICONS[s.label] || ICONS.default })),
    ...(profile.cvUrl ? [{ label: "Download CV", sub: "PDF · 1 page", url: profile.cvUrl, icon: ICONS.CV, download: true }] : []),
  ];

  return (
    <section className="section contact" id="contact">
      <div className="contact-grid">
        <div className="contact-left reveal">
          <span className="eyebrow"><b>04</b> Contact</span>
          <h2 className="contact-title">Let's build something together.</h2>

          {profile.available && (
            <p className="avail">
              <i aria-hidden="true" />
              <span><b>{contact.availability}</b> · {contact.reply}</span>
            </p>
          )}

          <div className="email-row">
            <a className="btn email-btn" href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className={`copy-btn${copied ? " is-copied" : ""}`} onClick={copyEmail}
                    aria-label="Copy email address">
              {copied ? "Copied ✓" : "Copy"}
            </button>
            <span className="sr-only" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</span>
          </div>

          {cards.length > 0 && (
            <ul className="link-cards">
              {cards.map((c) => (
                <li key={c.label}>
                  <a href={c.url} target="_blank" rel="noreferrer" {...(c.download ? { download: "" } : {})}>
                    <span className="lc-icon" aria-hidden="true">{c.icon}</span>
                    <span className="lc-text">
                      <b>{c.label}</b>
                      <small>{c.sub}</small>
                    </span>
                    <span className="lc-arrow" aria-hidden="true">{c.download ? "↓" : "↗"}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form className="contact-form reveal" name="contact" method="POST" data-netlify="true"
              netlify-honeypot="bot-field" onSubmit={onSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <p className="hp" aria-hidden="true">
            <label>Don't fill this out: <input name="bot-field" value={form["bot-field"]} onChange={onChange} tabIndex={-1} autoComplete="off" /></label>
          </p>

          <h3>Send a message</h3>
          <label className="field">
            <span>Name</span>
            <input name="name" type="text" required autoComplete="name" placeholder="Your name"
                   value={form.name} onChange={onChange} />
          </label>
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" required autoComplete="email" placeholder="you@company.com"
                   value={form.email} onChange={onChange} />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea name="message" required rows="5" placeholder="Tell me about the role or project…"
                      value={form.message} onChange={onChange} />
          </label>

          <button className="btn send-btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
          </button>

          <p className={`form-msg ${status}`} role="status" aria-live="polite">
            {status === "sent" && "Thanks! Your message was sent — I'll get back to you soon."}
            {status === "error" && (
              <>Couldn't send right now. Please email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>
            )}
          </p>
        </form>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
