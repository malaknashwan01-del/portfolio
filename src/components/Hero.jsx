import { useEffect, useRef, useState } from "react";
import { profile, marquee, tag } from "../data.js";

const FRONT_URL =
  "/images/front.webp";
const BACK_URL =
  "/images/back.webp";
const LIFE = 1100;

const GHOST = marquee.ghost;
const SOLID = marquee.solid;

// Cover-fit, centred horizontally, anchored to the bottom
function drawCover(c, img) {
  const cw = c.canvas.width, ch = c.canvas.height;
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  if (!iw || !ih || !cw || !ch) return;
  const s = Math.max(cw / iw, ch / ih);
  const dw = iw * s, dh = ih * s;
  c.drawImage(img, (cw - dw) / 2, ch - dh, dw, dh);
}

export default function Hero() {
  const heroRef = useRef(null);
  const figureRef = useRef(null);
  const frontRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const figure = figureRef.current;
    const front = frontRef.current;
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    const ctx = canvas.getContext("2d");

    // Live touch detection
    const touchMQ = matchMedia("(hover: none), (pointer: coarse)");
    let coarse = false;
    const syncTouch = () => {
      coarse = touchMQ.matches;
      setTouch(coarse);
    };
    syncTouch();
    touchMQ.addEventListener("change", syncTouch);

    // Offscreen canvases
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d");
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d");

    // Images
    let backReady = false;
    const back = new Image();
    back.onload = () => { backReady = true; };
    back.src = BACK_URL;

    let frontReady = false;
    const onFront = () => {
      frontReady = true;
      canvas.classList.add("ready");
      // hand over from the plain <img> to the canvas once the canvas has painted
      setTimeout(() => figure.classList.add("live"), 850);
    };
    if (front.complete && front.naturalWidth) onFront();
    else front.addEventListener("load", onFront);

    // Sizing
    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      const r = figure.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      const pw = Math.round(W * dpr), ph = Math.round(H * dpr);
      canvas.width = mask.width = buf.width = pw;
      canvas.height = mask.height = buf.height = ph;
    };
    resize();
    window.addEventListener("load", resize);
    window.addEventListener("resize", resize);

    // Stamps
    let stamps = [];
    let last = null;
    let lastMove = 0;

    const addStamp = (x, y, now) => {
      const base = Math.max(W, 260) * (coarse ? 0.15 : 0.12);
      const n = 3 + Math.floor(Math.random() * 3);
      const lobes = [];
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * base * 0.45;
        lobes.push({
          dx: Math.cos(a) * d,
          dy: Math.sin(a) * d,
          r: base * (0.45 + Math.random() * 0.55),
        });
      }
      stamps.push({ x, y, t: now, lobes });
    };

    const pointerTo = (clientX, clientY, now) => {
      const r = figure.getBoundingClientRect();
      const x = clientX - r.left, y = clientY - r.top;
      if (last) {
        const step = Math.max(W, 260) * 0.04;
        const dx = x - last.x, dy = y - last.y;
        const count = Math.min(Math.floor(Math.hypot(dx, dy) / step), 40);
        for (let i = 1; i <= count; i++) {
          const f = i / (count + 1);
          addStamp(last.x + dx * f, last.y + dy * f, now);
        }
      }
      addStamp(x, y, now);
      last = { x, y };
      lastMove = now;
    };

    const onMove = (e) => {
      pointerTo(e.clientX, e.clientY, performance.now());
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursor.classList.add("on");
    };
    const onLeave = () => {
      last = null;
      cursor.classList.remove("on");
    };
    const onDown = (e) => pointerTo(e.clientX, e.clientY, performance.now());

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("pointerdown", onDown);

    // Auto-wander (touch only)
    let autoT = 0;
    let autoLast = null;
    const autoWander = (now) => {
      if (now - lastMove < 2500) { autoLast = null; return; }
      autoT += 0.016;
      const x = W * (0.5 + Math.sin(autoT * 1.3) * 0.28);
      const y = H * (0.32 + Math.sin(autoT * 0.9 + 1) * 0.22);
      if (!autoLast || Math.hypot(x - autoLast.x, y - autoLast.y) > W * 0.02) {
        addStamp(x, y, now);
        autoLast = { x, y };
      }
    };

    // Render loop
    let raf;
    const frame = (now) => {
      if (coarse) autoWander(now);
      stamps = stamps.filter((s) => now - s.t <= LIFE);

      // Mask
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.clearRect(0, 0, W, H);
      mctx.fillStyle = "#000";
      for (const s of stamps) {
        const k = 1 - (now - s.t) / LIFE;
        if (k <= 0) continue;
        const scale = k < 0.75 ? k / 0.75 : 1;
        const rs = Math.pow(scale, 0.8);
        for (const l of s.lobes) {
          mctx.beginPath();
          mctx.arc(s.x + l.dx * scale, s.y + l.dy * scale, l.r * rs, 0, Math.PI * 2);
          mctx.fill();
        }
      }

      // Main canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frontReady) drawCover(ctx, front);

      if (stamps.length) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(mask, 0, 0);
        ctx.globalCompositeOperation = "source-over";

        if (backReady) {
          bctx.setTransform(1, 0, 0, 1, 0, 0);
          bctx.globalCompositeOperation = "source-over";
          bctx.clearRect(0, 0, buf.width, buf.height);
          bctx.drawImage(mask, 0, 0);
          bctx.globalCompositeOperation = "source-in";
          drawCover(bctx, back);
          bctx.globalCompositeOperation = "source-over";
          ctx.drawImage(buf, 0, 0);
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      touchMQ.removeEventListener("change", syncTouch);
      window.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
      front.removeEventListener("load", onFront);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("pointerdown", onDown);
      back.onload = null;
    };
  }, []);

  return (
    <>
      <section className="hero" id="top" ref={heroRef} aria-label={`${profile.name} — ${profile.role}`}>
        <div className="hero-intro">
          {profile.available && <span className="status"><i />Available for work</span>}
          <h1>{profile.name}</h1>
          <p>{profile.role}</p>
        </div>

        <div className="marquees" aria-hidden="true">
          <div className="row ghost">
            {[0, 1, 2, 3].map((i) => <span key={i}>{GHOST}</span>)}
          </div>
          <div className="row solid">
            {[0, 1, 2, 3].map((i) => <span key={i}>{SOLID}</span>)}
          </div>
        </div>

        <div className="figure" id="figure" ref={figureRef}>
          <img id="front" ref={frontRef} alt={`Portrait of ${profile.name}`} src={FRONT_URL} />
          <canvas id="reveal" ref={canvasRef} aria-hidden="true" />
        </div>

        <p className="hint">
          <i />
          <span id="hintText">{touch ? "Drag to launch" : "Move your cursor to launch"}</span>
        </p>
        <span className="tag">{tag}</span>
      </section>
      <div className="cursor" id="cursor" ref={cursorRef} />
    </>
  );
}
