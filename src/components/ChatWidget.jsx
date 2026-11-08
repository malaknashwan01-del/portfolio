import { useEffect, useRef, useState } from "react";
import { assistant, profile } from "../data.js";
import { localAnswer } from "../localAnswers.js";

const ENDPOINT = "/api/chat";
const MAX_CHARS = 500;
const isArabic = (t) => /[؀-ۿ]/.test(t);

// Turn **bold**, links and emails into React nodes (no raw HTML is injected).
function renderText(text) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) out.push(<strong key={k++}>{tok.slice(2, -2)}</strong>);
    else if (tok.includes("@") && !tok.startsWith("http")) {
      const mail = tok.replace(/[.,;]+$/, "");
      out.push(<a key={k++} href={`mailto:${mail}`}>{mail}</a>);
      if (mail.length < tok.length) out.push(tok.slice(mail.length));
    } else {
      const url = tok.replace(/[.,;]+$/, "");
      out.push(<a key={k++} href={url} target="_blank" rel="noreferrer">{url.replace(/^https?:\/\//, "")}</a>);
      if (url.length < tok.length) out.push(tok.slice(url.length));
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}


export default function ChatWidget() {
  const prefersArabic = typeof navigator !== "undefined" && /^ar/i.test(navigator.language || "");
  const greeting = { role: "assistant", content: prefersArabic ? assistant.greetingAr : assistant.greeting, local: true };

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text) {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || busy) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // the greeting is shown locally only; send the real conversation
          messages: next.filter((m) => !m.local).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || "default");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      // AI not available (no key yet, free limit reached, offline) → answer from the site's own data
      setMessages((m) => [...m, { role: "assistant", content: localAnswer(content), local: true }]);
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e) => { e.preventDefault(); send(input); };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };
  const started = messages.some((m) => m.role === "user");

  return (
    <div className={`chat${open ? " is-open" : ""}`}>
      {open && (
        <section className="chat-panel" role="dialog" aria-label={assistant.name}>
          <header className="chat-head">
            <span className="chat-avatar" aria-hidden="true">{profile.initial}</span>
            <div>
              <b>{assistant.name}</b>
              <small><i aria-hidden="true" /> Online · AI</small>
            </div>
            <button type="button" className="chat-x" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>

          <div className="chat-list" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}${m.error ? " error" : ""}`} dir={isArabic(m.content) ? "rtl" : "ltr"}>
                {renderText(m.content)}
              </div>
            ))}
            {busy && (
              <div className="msg assistant typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            )}
            {!started && (
              <div className="chat-chips">
                {assistant.suggestions.map((q) => (
                  <button type="button" key={q} onClick={() => send(q)} dir={isArabic(q) ? "rtl" : "ltr"}>{q}</button>
                ))}
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <textarea
              ref={inputRef}
              rows="1"
              value={input}
              maxLength={MAX_CHARS}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about Malak… · اسأل عن ملك"
              aria-label="Your question"
              dir={isArabic(input) ? "rtl" : "ltr"}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
          <p className="chat-note">AI assistant · may make mistakes</p>
        </section>
      )}

      <button
        ref={btnRef}
        type="button"
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Ask about Malak"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z" /><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" /></svg>
            <span className="chat-fab-label">Ask about Malak</span>
          </>
        )}
      </button>
    </div>
  );
}
