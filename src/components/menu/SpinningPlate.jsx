"use client";
import { useState, useRef, useEffect, useCallback, useId } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { C, RAW, F } from "@/lib/theme";
import { PRODUCTS, PRODUCT_IMAGES, formatPrice, CUSTOM_FLAVOR_NOTE } from "@/data/menu";

/* A ceramic-plate carousel for the menu. Items sit around the rim; the plate
   turns so the chosen one lands at the top marker. Everything shown here is
   read from @/data/menu so it can never drift from the menu cards below.

   Interaction: click a dish, drag/swipe the plate, the arrow buttons, or the
   left/right arrow keys. Honors prefers-reduced-motion by cutting the spin. */

const PLATE_IDS = ["mini", "brownies", "cupcakes", "bundt"];

const ITEMS = PLATE_IDS.map((id) => {
  const p = PRODUCTS.find((x) => x.id === id);
  return { ...p, img: PRODUCT_IMAGES[id]?.thumb };
}).filter((p) => p.id && p.img);

const STEP = 360 / ITEMS.length;
const mod = (n, m) => ((n % m) + m) % m;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function SpinningPlate({ onSelect }) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const dragging = useRef(null);
  const justDragged = useRef(false);
  const plateRef = useRef(null);
  const reduced = useReducedMotion();
  const headingId = useId();
  const detailsRef = useRef(null);

  /* On phones the site's floating buttons sit over the plate controls. Flag the
     body while the controls are on screen so the CSS below can tuck them away. */
  useEffect(() => {
    const el = detailsRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      document.body.toggleAttribute("data-plate-controls", entry.isIntersecting);
    });
    io.observe(el);
    return () => { io.disconnect(); document.body.removeAttribute("data-plate-controls"); };
  }, []);

  const item = ITEMS[active];

  const go = useCallback((delta) => setActive((i) => mod(i + delta, ITEMS.length)), []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(ITEMS.length - 1); }
  };

  /* Drag: horizontal travel across the plate's width maps to rotation, then
     snaps to the nearest dish on release. Pointer events cover touch + mouse. */
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragging.current = { x: e.clientX, dx: 0, moved: false };
  };
  const onPointerMove = (e) => {
    const d = dragging.current;
    if (!d) return;
    const w = plateRef.current?.offsetWidth || 300;
    d.dx = e.clientX - d.x;
    if (!d.moved && Math.abs(d.dx) > 6) {
      d.moved = true;
      /* Only capture once it is a real drag, so a plain tap still reaches the dish button. */
      try { plateRef.current?.setPointerCapture?.(e.pointerId); } catch (_) {}
    }
    if (d.moved) setDrag((d.dx / w) * STEP * 1.6);
  };
  const endDrag = () => {
    const d = dragging.current;
    if (!d) return;
    dragging.current = null;
    if (d.moved) {
      const w = plateRef.current?.offsetWidth || 300;
      const steps = Math.round(((d.dx / w) * STEP * 1.6) / STEP);
      if (steps) go(-steps);
      justDragged.current = true;
      setTimeout(() => { justDragged.current = false; }, 0);
    }
    setDrag(0);
  };

  const angle = 180 - active * STEP + drag;
  const spin = reduced ? "none" : "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      style={{
        display: "grid", gap: 28, alignItems: "center", justifyItems: "center",
        gridTemplateColumns: "min(340px, 78vw) minmax(0, 1fr)",
        maxWidth: 940, margin: "0 auto 56px", padding: "0 4px",
        "--plate": "min(340px, 78vw)", "--dish": "clamp(64px, 19vw, 92px)",
        "--r": "calc(var(--plate) / 2 - var(--dish) / 2 - 12px)",
      }}
      className="kk-plate-wrap"
    >
      {/* ── Plate ── */}
      <div style={{ position: "relative", width: "var(--plate)", height: "var(--plate)" }}>
        {/* marker at 6 o'clock */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent",
          borderBottom: `12px solid ${C.pink}`, zIndex: 3,
        }} />
        <div
          ref={plateRef}
          tabIndex={0}
          role="group"
          aria-labelledby={headingId}
          aria-describedby={`${headingId}-hint`}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onDragStart={(e) => e.preventDefault()}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: `radial-gradient(circle at 50% 38%, ${C.white} 0%, ${C.cream} 62%, ${C.bg} 100%)`,
            border: `3px solid ${C.border}`,
            boxShadow: `0 18px 38px rgba(92,58,40,0.13), inset 0 0 0 10px rgba(255,255,255,0.55)`,
            touchAction: "pan-y", cursor: "grab", outlineOffset: 4, userSelect: "none", WebkitUserSelect: "none",
          }}
          className="kk-plate-disc"
        >
          {/* inner rim */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: "15%", borderRadius: "50%",
            border: `2px dashed ${C.border}`, opacity: 0.75,
          }} />

          {/* rotating ring of dishes */}
          <div style={{
            position: "absolute", inset: 0,
            transform: `rotate(${angle}deg)`,
            transition: drag ? "none" : spin,
          }}>
            {ITEMS.map((it, i) => {
              const a = i * STEP;
              const isActive = i === active;
              return (
                <button
                  key={it.id}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`${it.name}, ${it.price}`}
                  onClick={() => { if (!justDragged.current) setActive(i); }}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "var(--dish)", height: "var(--dish)", margin: 0, padding: 0,
                    transform: `translate(-50%, -50%) rotate(${a}deg) translateY(calc(var(--r) * -1)) rotate(${-a - angle}deg) scale(${isActive ? 1.16 : 1})`,
                    transition: drag ? "none" : spin,
                    borderRadius: "50%", overflow: "hidden", cursor: "pointer",
                    border: `3px solid ${isActive ? C.pink : C.white}`,
                    boxShadow: isActive
                      ? `0 8px 20px ${RAW.pink}55`
                      : "0 4px 12px rgba(92,58,40,0.16)",
                    background: C.white,
                  }}
                >
                  <Image
                    src={it.img}
                    alt=""
                    draggable={false}
                    width={120}
                    height={120}
                    sizes="120px"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </button>
              );
            })}
          </div>

          {/* centre label */}
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            textAlign: "center", pointerEvents: "none", width: "46%",
          }}>
            <p style={{ fontFamily: F.d, fontSize: "clamp(15px, 4.4vw, 19px)", fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.2 }}>
              {item.price}
            </p>
            <p style={{ fontFamily: F.b, fontSize: 12, color: C.sub, margin: "4px 0 0", fontWeight: 500 }}>
              spin the plate
            </p>
          </div>
        </div>
      </div>

      {/* ── Details ── */}
      <div className="kk-plate-details" ref={detailsRef} style={{ textAlign: "left", width: "100%", maxWidth: 380 }}>
        <p id={`${headingId}-hint`} style={{ fontFamily: F.b, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.pink, fontWeight: 700, margin: "0 0 6px" }}>
          On the plate
        </p>
        <h3 id={headingId} style={{ fontFamily: F.d, fontSize: "clamp(24px, 6vw, 31px)", fontWeight: 700, color: C.ink, margin: "0 0 6px", lineHeight: 1.15 }}>
          {item.name}
        </h3>
        <p aria-live="polite" style={{ fontFamily: F.d, fontSize: 20, fontWeight: 700, color: C.pink, margin: "0 0 10px" }}>
          {item.price}
        </p>
        {item.subtitle && (
          <p style={{ fontFamily: F.b, fontSize: 15, color: C.sub, margin: "0 0 10px", lineHeight: 1.55, fontWeight: 400 }}>
            {item.subtitle}
          </p>
        )}
        <p style={{ fontFamily: F.b, fontSize: 14, color: C.sub, margin: "0 0 14px", fontWeight: 500 }}>
          {item.note}
        </p>

        {item.flavors && (
          <ul className="kk-plate-flavors" style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexWrap: "wrap", gap: 7 }}>
            {item.flavors.map((f) => (
              <li key={f.id} style={{
                fontFamily: F.b, fontSize: 13, fontWeight: 500, color: C.ink,
                background: C.white, border: `2px solid ${C.border}`,
                borderRadius: 999, padding: "5px 12px", whiteSpace: "nowrap",
              }}>
                {f.name} <span style={{ color: C.pink, fontWeight: 700 }}>{formatPrice(f.price)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="kk-plate-actions" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => onSelect?.(item.id)}
            className="kk-btn"
            style={{
              fontFamily: F.d, fontSize: 16, fontWeight: 600, padding: "12px 26px",
              borderRadius: 12, border: "none", background: C.pink, color: C.white,
              cursor: "pointer", transition: "all 250ms ease",
            }}
          >
            View Options
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" aria-label="Previous item" onClick={() => go(-1)} style={arrowStyle}>
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button type="button" aria-label="Next item" onClick={() => go(1)} style={arrowStyle}>
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <p style={{ fontFamily: F.b, fontSize: 13, color: C.sub, margin: "14px 0 0", fontWeight: 400, lineHeight: 1.5 }}>
          {CUSTOM_FLAVOR_NOTE}
        </p>
      </div>

      <style>{`
        .kk-plate-disc:active { cursor: grabbing; }
        @media (max-width: 760px) {
          body[data-plate-controls] .kk-float { opacity: 0 !important; pointer-events: none !important; }
        }
        @media (max-width: 760px) {
          .kk-plate-wrap { grid-template-columns: 1fr !important; justify-items: center; }
          .kk-plate-details { text-align: center; }
          .kk-plate-flavors { justify-content: center; }
          .kk-plate-actions { justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kk-plate-wrap * { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

const arrowStyle = {
  width: 44, height: 44, borderRadius: 12, cursor: "pointer",
  border: `2px solid ${C.border}`, background: C.white, color: C.ink,
  display: "flex", alignItems: "center", justifyContent: "center",
};
