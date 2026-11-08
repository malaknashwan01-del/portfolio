import { useEffect, useRef } from "react";

// ------------------------------------------------------------
//  Curved, draggable project carousel ("inside of a cylinder")
//  Cards drift right → left, follow the pointer 1:1 when dragged,
//  coast with momentum, and open the project on click.
// ------------------------------------------------------------

const AUTO_SPEED = 46;   // frame units per second
const DECAY = 0.05;      // velocity left after 1s of coasting (≈95% lost)

// Rounded quad path through 4 corner points (clockwise), corner radius r
function roundedPath(pts, r) {
  const n = pts.length;
  const seg = (a, b, d) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const k = Math.min(d, len / 2) / len;
    return [a[0] + dx * k, a[1] + dy * k];
  };
  let d = "";
  for (let i = 0; i < n; i++) {
    const p = pts[i], prev = pts[(i - 1 + n) % n], next = pts[(i + 1) % n];
    const a = seg(p, prev, r), b = seg(p, next, r);
    d += (i === 0 ? `M${a[0]},${a[1]}` : `L${a[0]},${a[1]}`) + `Q${p[0]},${p[1]} ${b[0]},${b[1]}`;
  }
  return d + "Z";
}

export default function CurvedCarousel({ items }) {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const state = useRef({ offset: 0, vel: 0, dragging: false, hover: false, moved: 0 });

  // repeat the projects so the loop always covers the screen
  const REPEAT = 4;
  const list = Array.from({ length: items.length * REPEAT }, (_, i) => items[i % items.length]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const s = state.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, u = 1, mobile = false;

    const measure = () => {
      W = wrap.clientWidth;
      mobile = W <= 820;
      u = mobile ? W / 640 : W / 1440;
      H = (mobile ? 330 : 330) * u;
      wrap.style.height = `${H}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    let raf, last = performance.now();
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!s.dragging) {
        if (Math.abs(s.vel) > 1) {
          s.offset += s.vel * dt;
          s.vel *= Math.pow(DECAY, dt);
        } else {
          s.vel = 0;
          if (!reduce) s.offset += AUTO_SPEED * u * (s.hover ? 0.25 : 1) * dt;
        }
      }

      const bw = (mobile ? 250 : 300) * u;   // card width at the centre
      const bh = bw * 0.64;                   // card height at the centre
      const pitch = bw + 34 * u;
      const L = list.length * pitch;
      const cx = W / 2, S = W / 2;

      list.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        let t = ((i * pitch - s.offset) % L + L) % L - L / 2;     // offset from centre
        const x = cx + t * (1 + 0.1 * (t / S) ** 2);               // pushed outward
        const d = Math.min(Math.abs(x - cx) / S, 1.6);
        const w = bw * (1 + 0.22 * d * d);
        const xl = x - w / 2, xr = x + w / 2;
        const q = (xx) => Math.min(Math.abs(xx - cx) / S, 1.6);
        const h = (qq) => bh * (1 + 0.62 * qq ** 2.6);
        const hl = h(q(xl)), hr = h(q(xr));
        const hm = Math.max(hl, hr);
        const cy = H / 2 - 8 * u * d * d;

        if (xr < -40 || xl > W + 40) { el.style.visibility = "hidden"; return; }
        el.style.visibility = "visible";
        el.style.transform = `translate3d(${xl}px, ${cy - hm / 2}px, 0)`;
        el.style.width = `${w}px`;
        el.style.height = `${hm}px`;
        const r = 14 * u;
        el.style.clipPath = `path("${roundedPath([
          [0, (hm - hl) / 2], [w, (hm - hr) / 2], [w, (hm + hr) / 2], [0, (hm + hl) / 2],
        ], r)}")`;
        el.style.setProperty("--cap", `${(hm - Math.min(hl, hr)) / 2 + 12 * u}px`);
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // ---- drag ----
    let lastX = 0, lastT = 0, startX = 0;
    const down = (e) => {
      s.dragging = true; s.vel = 0; s.moved = 0;
      startX = lastX = e.clientX; lastT = performance.now();
      wrap.setPointerCapture(e.pointerId);
      wrap.classList.add("grabbing");
    };
    const move = (e) => {
      if (!s.dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      s.offset -= dx;
      const dtt = Math.max((now - lastT) / 1000, 0.001);
      s.vel = 0.8 * (-dx / dtt) + 0.2 * s.vel;
      s.moved = Math.max(s.moved, Math.abs(e.clientX - startX));
      lastX = e.clientX; lastT = now;
    };
    const up = (e) => {
      if (!s.dragging) return;
      s.dragging = false;
      wrap.classList.remove("grabbing");
      if (performance.now() - lastT > 80) s.vel = 0;   // released after stopping
      if (s.moved < 6) {                                // a click, not a drag
        const hit = document.elementsFromPoint(e.clientX, e.clientY).find((n) => n.dataset?.idx);
        const p = hit && list[+hit.dataset.idx];
        const url = p && (p.live || p.code);
        if (url) window.open(url, "_blank", "noopener");
      }
    };
    const enter = () => { s.hover = true; };
    const leave = () => { s.hover = false; };
    wrap.addEventListener("pointerdown", down);
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerup", up);
    wrap.addEventListener("pointercancel", up);
    wrap.addEventListener("pointerenter", enter);
    wrap.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointerdown", down);
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerup", up);
      wrap.removeEventListener("pointercancel", up);
      wrap.removeEventListener("pointerenter", enter);
      wrap.removeEventListener("pointerleave", leave);
    };
  }, [list.length]);

  return (
    <div className="curve" ref={wrapRef} role="region" aria-label="Projects carousel — drag to explore">
      {list.map((p, i) => (
        <div className={`curve-card${p.live || p.code ? " linked" : ""}`} key={i} data-idx={i}
             ref={(el) => (cardRefs.current[i] = el)} aria-hidden={i >= items.length}>
          {p.image && <img src={p.image} alt="" draggable="false" loading={i < items.length ? "eager" : "lazy"} />}
          <div className="curve-cap" data-idx={i}>
            <span>{p.type}</span>
            <b>{p.title}</b>
          </div>
          {(p.live || p.code) && <span className="curve-play" aria-hidden="true">↗</span>}
        </div>
      ))}
    </div>
  );
}
