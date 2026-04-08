"use client";
import { useState, useEffect, useRef } from "react";
import {
  Cake, CakeSlice, CircleDot, Cookie, ShoppingCart, Mail, PartyPopper,
  ChefHat, AlertTriangle, X, Plus, Minus, Check, ChevronDown, ChevronLeft,
} from "lucide-react";

/* ═══════════════════════════════════════════
   KAKE AND KREAM v5
   Warm · Professional · Pastel accents · SVG icons
   ═══════════════════════════════════════════ */

const C = {
  bg: "var(--color-bg)",
  white: "var(--color-surface)",
  pink: "var(--color-primary)",
  coral: "var(--color-coral)",
  peach: "var(--color-peach)",
  yellow: "var(--color-yellow)",
  mint: "var(--color-mint)",
  sky: "var(--color-sky)",
  lavender: "var(--color-lavender)",
  ink: "var(--color-ink)",
  sub: "var(--color-sub)",
  muted: "var(--color-muted)",
  border: "var(--color-border)",
  card: "var(--color-surface)",
  warm: "var(--color-surface-warm)",
  secondary: "var(--color-secondary)",
};

/* Raw hex values — only used where CSS var + alpha concatenation is needed */
const RAW = {
  pink: "#F2A0B5",
  coral: "#F4978E",
  peach: "#F8C4A4",
  yellow: "#F7D794",
  mint: "#A8DFC8",
  sky: "#A0C4E8",
  lavender: "#C4B5E0",
};

const F = {
  d: "var(--font-display)",
  b: "var(--font-body)",
};

const FLAVORS = [
  { id: "choc-van", label: "Chocolate + Vanilla", desc: "Sprinkles & cherry · Filling: ganache or caramel", color: C.peach, raw: RAW.peach },
  { id: "choc-choc", label: "Double Chocolate", desc: "Chocolate shavings · Filling: ganache", color: C.coral, raw: RAW.coral },
  { id: "choc-straw", label: "Chocolate Strawberry", desc: "Fresh strawberry buttercream · Filling: strawberry", color: C.pink, raw: RAW.pink },
  { id: "choc-cookie", label: "Cookies and Cream", desc: "Oreo cookies & cookies and cream buttercream", color: C.lavender, raw: RAW.lavender },
  { id: "choc-marsh", label: "S'mores Chocolate", desc: "Mini marshmallows & ganache drizzle", color: C.peach, raw: RAW.peach },
  { id: "choc-mocha", label: "Mocha", desc: "Coffee-kissed chocolate with ganache", color: C.coral, raw: RAW.coral },
  { id: "choc-coco", label: "Chocolate Coconut", desc: "Unsweetened coconut topping", color: C.mint, raw: RAW.mint },
  { id: "van-van", label: "Vanilla Squared", desc: "Classic vanilla buttercream & sprinkles", color: C.yellow, raw: RAW.yellow },
  { id: "van-coco", label: "Vanilla Coconut", desc: "Toasted coconut flakes", color: C.mint, raw: RAW.mint },
  { id: "van-choc", label: "Vanilla Chocolate", desc: "Rich chocolate buttercream · Filling: ganache", color: C.coral, raw: RAW.coral },
  { id: "van-straw", label: "Strawberry Bliss", desc: "Strawberry buttercream & strawberry slice", color: C.pink, raw: RAW.pink },
  { id: "van-cara", label: "Caramel Dream", desc: "Caramel buttercream & caramel drizzle", color: C.peach, raw: RAW.peach },
  { id: "van-cotton", label: "Cotton Candy", desc: "Cotton candy bites & sprinkles", color: C.lavender, raw: RAW.lavender },
  { id: "rv-cc", label: "Red Velvet", desc: "Cream cheese buttercream", color: C.coral, raw: RAW.coral },
  { id: "conf-van", label: "Confetti Vanilla", desc: "Vanilla almond cake with sprinkles", color: C.yellow, raw: RAW.yellow },
  { id: "conf-choc", label: "Confetti Chocolate", desc: "Chocolate buttercream · Filling: ganache", color: C.peach, raw: RAW.peach },
  { id: "conf-straw", label: "Confetti Strawberry", desc: "Strawberry buttercream · Filling: strawberry", color: C.pink, raw: RAW.pink },
];

const BUNDTS = [
  { id: "b-van", name: "Vanilla", desc: "Cinnamon walnut streusel & glaze", price: 45, color: C.yellow, raw: RAW.yellow },
  { id: "b-marble", name: "Marble", desc: "Ganache topping", price: 55, color: C.peach, raw: RAW.peach },
  { id: "b-rv", name: "Red Velvet", desc: "Cream cheese glaze", price: 55, color: C.coral, raw: RAW.coral },
  { id: "b-choc", name: "Chocolate", desc: "Ganache topping", price: 55, color: C.coral, raw: RAW.coral },
];

const PRODUCTS = [
  { id: "cupcakes", name: "Cupcakes", icon: Cake, price: "$4.50–$5 each", note: "Filling +$0.50 · Min 1 dozen · One flavor per dozen", color: C.pink, raw: RAW.pink, min: 12, step: 12 },
  { id: "mini", name: "Mini Cakes", icon: CakeSlice, price: "Per dozen", note: "Min 2 dozen · One flavor per dozen", color: C.peach, raw: RAW.peach, min: 24, step: 12 },
  { id: "bundt", name: "Bundt Cakes", icon: CircleDot, price: "From $45", note: "Full-size · Sold individually", color: C.yellow, raw: RAW.yellow, min: 1, step: 1 },
  { id: "sheet", name: "Sheet Cakes", icon: Cake, price: "From $110", note: "9×13 · Price varies", color: C.lavender, raw: RAW.lavender, min: 1, step: 1 },
  { id: "brownies", name: "Brownies", icon: Cookie, price: "$3 each", note: "Fudgy chocolate · Min 1 dozen", color: C.mint, raw: RAW.mint, min: 12, step: 12 },
];

const ICON_PROPS = { size: 28, strokeWidth: 2.5 };

const PRODUCT_IMAGES = {
  cupcakes: {
    thumb: "/images/cupcake-red-velvet-closeup.jpeg",
    gallery: ["/images/cupcake-red-velvet-closeup.jpeg", "/images/cupcake-red-velvet-display.jpeg"],
  },
  sheet: {
    thumb: "/images/cake-lavender-rosette.jpeg",
    gallery: [
      "/images/cake-lavender-rosette.jpeg",
      "/images/cake-yellow-rainbow.jpeg",
      "/images/cake-coconut-cherry.jpeg",
      "/images/cake-almond-cherry.jpeg",
      "/images/cake-mocha-bonbon.jpeg",
    ],
  },
};

function Reveal({ children, d = 0, style = {} }) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  const prefersReduced = useRef(false);
  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced.current) { setV(true); return; }
    const el = r.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: `all 0.5s ease ${d}s`, ...style }}>{children}</div>;
}

function Qty({ value, onChange, min, step }) {
  const isDoz = step >= 12;
  const displayVal = isDoz ? `${value / 12} Dozen${value / 12 > 1 ? "s" : ""}` : value;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", borderRadius: 16, border: `3px solid ${C.ink}`, background: C.white, overflow: "hidden" }}>
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - step))}
        style={{ width: 56, height: 56, border: "none", background: "none", fontSize: 24, fontWeight: 800, cursor: "pointer", color: value <= min ? C.muted : C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Minus size={20} strokeWidth={3} />
      </button>
      <span style={{ minWidth: 120, padding: "0 12px", textAlign: "center", fontFamily: F.b, fontSize: 18, fontWeight: 800, color: C.ink }}>{displayVal}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(value + step)}
        style={{ width: 56, height: 56, border: "none", background: "none", fontSize: 24, fontWeight: 800, cursor: "pointer", color: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Plus size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

export default function KakeAndKream() {
  const [cart, setCart] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState("home");
  const [drawer, setDrawer] = useState(false);
  const [sel, setSel] = useState("");
  const [qty, setQtyVal] = useState(12);
  const [filling, setFilling] = useState(false);
  const [selBundt, setSelBundt] = useState("");
  const [sheetNote, setSheetNote] = useState("");
  const [cust, setCust] = useState({ fn: "", ln: "", email: "", phone: "", date: "", allergy: "", notes: "" });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [view]);

  const add = (item) => { setCart(p => [...p, { ...item, _id: Date.now() + Math.random() }]); setSel(""); setFilling(false); setSelBundt(""); setSheetNote(""); };
  const rm = (id) => setCart(p => p.filter(i => i._id !== id));

  const openProd = (id) => {
    const p = PRODUCTS.find(x => x.id === id);
    setQtyVal(p.min); setSel(""); setSelBundt(""); setFilling(false); setSheetNote("");
    setView("p:" + id);
  };

  const pid = view.startsWith("p:") ? view.slice(2) : null;
  const prod = pid ? PRODUCTS.find(p => p.id === pid) : null;

  const inp = (field) => ({
    width: "100%", padding: "14px 18px", borderRadius: 12,
    border: `2px solid ${errors[field] ? C.coral : C.border}`,
    fontFamily: F.b, fontSize: 16, outline: "none", background: C.white,
    boxSizing: "border-box", fontWeight: 600, color: C.ink,
    transition: "border-color 250ms ease",
  });
  const labelStyle = { display: "block", fontSize: 14, fontWeight: 700, color: C.sub, marginBottom: 6 };
  const reqStar = <span style={{ color: C.coral, marginLeft: 2 }}>*</span>;
  const errMsg = (field) => errors[field] ? <p role="alert" style={{ fontSize: 13, color: C.coral, fontWeight: 700, marginTop: 4 }}>{errors[field]}</p> : null;

  const faqs = [
    { q: "Do you deliver?", a: "Pickup only — Fridays from our home in the Austin area." },
    { q: "Minimum orders?", a: "Cupcakes & brownies: 1 dozen. Mini cakes: 2 dozen. Bundt & sheet: individual." },
    { q: "Can I mix flavors?", a: "Each dozen is one flavor, but you can order multiple dozens in different flavors." },
    { q: "Custom cakes?", a: "Not yet — just our signature menu. Custom cakes coming soon!" },
    { q: "Payment?", a: "50% upfront via Venmo/Zelle after confirmation, 50% at pickup." },
    { q: "How much notice?", a: "At least 1 week. Everything is baked fresh." },
    { q: "Allergy-free?", a: "No — same equipment for all products. Please note allergies in your order." },
  ];

  // ─── Cart Drawer ───
  const CartDrawer = () => {
    if (!drawer) return null;
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", justifyContent: "flex-end" }}>
        <div onClick={() => setDrawer(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
        <div role="dialog" aria-label="Shopping cart" style={{ position: "relative", width: "min(420px, 94vw)", height: "100%", background: C.bg, boxShadow: "-2px 0 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", animation: "si .25s ease" }}>
          <style>{`@keyframes si{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
          <div style={{ padding: "20px 24px", borderBottom: `2px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: F.d, fontSize: 26, fontWeight: 700, margin: 0 }}>My Cart ({cart.length})</h3>
            <button aria-label="Close cart" onClick={() => setDrawer(false)} style={{ background: C.border, border: "none", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", color: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: C.sub }}>
                <ShoppingCart size={40} strokeWidth={1.5} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p style={{ fontSize: 18, fontWeight: 600 }}>Your cart is empty</p>
              </div>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < cart.length - 1 ? `2px solid ${C.border}` : "none" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 18 }}>{item.type}</div>
                      <div style={{ fontSize: 16, color: C.sub, fontWeight: 600 }}>{item.flavor} x {item.qty}{item.filling ? " + filling" : ""}</div>
                      {item.notes && <div style={{ fontSize: 14, color: C.muted, fontStyle: "italic", fontWeight: 500 }}>{item.notes}</div>}
                    </div>
                    <button aria-label={`Remove ${item.type}`} onClick={() => rm(item._id)} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${C.coral}`, background: C.white, cursor: "pointer", color: C.coral, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 250ms ease" }}>
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                ))}
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: `3px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 14 }}>
                  <p style={{ fontFamily: F.d, fontSize: 22, fontWeight: 800, margin: 0 }}>Your Pickup Info</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>First name{reqStar}</label>
                      <input value={cust.fn} onChange={e => { setCust(p => ({ ...p, fn: e.target.value })); setErrors(p => ({ ...p, fn: undefined })); }} style={inp("fn")} placeholder="Jane" />
                      {errMsg("fn")}
                    </div>
                    <div>
                      <label style={labelStyle}>Last name{reqStar}</label>
                      <input value={cust.ln} onChange={e => { setCust(p => ({ ...p, ln: e.target.value })); setErrors(p => ({ ...p, ln: undefined })); }} style={inp("ln")} placeholder="Doe" />
                      {errMsg("ln")}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email{reqStar}</label>
                    <input type="email" value={cust.email} onChange={e => { setCust(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }} style={inp("email")} placeholder="jane@example.com" />
                    {errMsg("email")}
                  </div>
                  <div>
                    <label style={labelStyle}>Phone number</label>
                    <input type="tel" value={cust.phone} onChange={e => setCust(p => ({ ...p, phone: e.target.value }))} style={inp("phone")} placeholder="(512) 555-1234" />
                  </div>
                  <div>
                    <label style={labelStyle}>Pickup Friday (min 1 week notice){reqStar}</label>
                    <input type="date" value={cust.date} onChange={e => { setCust(p => ({ ...p, date: e.target.value })); setErrors(p => ({ ...p, date: undefined })); }} style={{ ...inp("date"), height: 52 }} />
                    {errMsg("date")}
                  </div>
                  <div>
                    <label style={labelStyle}>Any food allergies?</label>
                    <input value={cust.allergy} onChange={e => setCust(p => ({ ...p, allergy: e.target.value }))} style={inp("allergy")} placeholder="e.g. nuts, dairy" />
                  </div>
                  <div>
                    <label style={labelStyle}>Additional notes for Kalyani</label>
                    <textarea rows={2} value={cust.notes} onChange={e => setCust(p => ({ ...p, notes: e.target.value }))} style={{ ...inp("notes"), resize: "vertical" }} placeholder="Special requests, decorations, etc." />
                  </div>
                  <div style={{ padding: "14px 16px", borderRadius: 14, background: RAW.yellow + "30", fontSize: 14, color: C.ink, lineHeight: 1.5, border: `2px solid ${C.yellow}`, fontWeight: 700, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <AlertTriangle size={18} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>ATTENTION: Our kitchen is NOT allergy-free. Submitting this form does not book your order — it is only booked when the 50% deposit is paid.</span>
                  </div>
                  <button className="kk-btn" disabled={submitting} onClick={async () => {
                    const errs = {};
                    if (!cust.fn.trim()) errs.fn = "First name is required";
                    if (!cust.ln.trim()) errs.ln = "Last name is required";
                    if (!cust.email.trim()) errs.email = "Email is required";
                    if (!cust.date) errs.date = "Pickup date is required";
                    if (Object.keys(errs).length) { setErrors(errs); return; }
                    setErrors({});
                    const order = cart.map((item, i) => `${i + 1}. ${item.type} — ${item.flavor} x ${item.qty}${item.filling ? " (+ filling)" : ""}${item.notes ? ` [${item.notes}]` : ""}`).join("\n");
                    const payload = { firstName: cust.fn, lastName: cust.ln, email: cust.email, _replyto: cust.email, phone: cust.phone, pickupDate: cust.date, allergies: cust.allergy, notes: cust.notes, order };
                    setSubmitting(true);
                    try {
                      const [res] = await Promise.all([
                        fetch("https://formspree.io/f/mgopbwvv", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", Accept: "application/json" },
                          body: JSON.stringify(payload),
                        }),
                        fetch("https://script.google.com/macros/s/AKfycbwoZyte94gO6UxjRGkOaTkuCD_AbrKD7lZjh3_OkfahLBG0cjFX36lTQ6TzFsLB5azM/exec", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                          mode: "no-cors",
                        }),
                      ]);
                      if (!res.ok) throw new Error("Submission failed");
                      setDrawer(false); setView("done");
                    } catch { alert("Something went wrong — please try again."); } finally { setSubmitting(false); }
                  }} style={{ width: "100%", padding: "18px", borderRadius: 16, border: "none", background: submitting ? C.muted : C.pink, color: C.white, fontFamily: F.d, fontSize: 20, fontWeight: 800, cursor: submitting ? "not-allowed" : "pointer", boxShadow: submitting ? "none" : `0 8px 24px ${RAW.pink}44`, transition: "all 250ms ease" }}>
                    {submitting ? "Sending..." : "Submit Order Request"}
                  </button>
                  <p style={{ fontSize: 16, color: C.sub, textAlign: "center", fontWeight: 700 }}>We'll email you within 24 hours.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── Submitted ───
  if (view === "done") {
    return (
      <div style={{ fontFamily: F.b, color: C.ink, background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: RAW.mint + "25", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <PartyPopper size={36} strokeWidth={2} style={{ color: C.mint }} />
          </div>
          <h1 style={{ fontFamily: F.d, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Order Request Sent!</h1>
          <p style={{ fontSize: 16, color: C.sub, lineHeight: 1.6, marginBottom: 28, fontWeight: 500 }}>We'll email you within 24 hours to confirm details and share payment info.</p>
          <button className="kk-btn" onClick={() => { setView("home"); setCart([]); }} style={{ fontFamily: F.d, fontSize: 16, fontWeight: 600, padding: "14px 32px", borderRadius: 12, border: "none", background: C.pink, color: C.white, cursor: "pointer", transition: "all 250ms ease" }}>Back to Home</button>
        </div>
      </div>
    );
  }

  // ─── Product Detail ───
  if (prod) {
    const hasFl = pid === "cupcakes" || pid === "mini";
    const isBundt = pid === "bundt";
    const isSheet = pid === "sheet";
    const isBrown = pid === "brownies";
    const canAdd = hasFl ? !!sel : isBundt ? !!selBundt : true;
    const Icon = prod.icon;

    const doAdd = () => {
      if (hasFl && sel) { const fl = FLAVORS.find(f => f.id === sel); add({ type: prod.name, flavor: fl.label, qty, filling: pid === "cupcakes" && filling, desc: fl.desc }); }
      else if (isBundt && selBundt) { const b = BUNDTS.find(o => o.id === selBundt); add({ type: "Bundt Cake", flavor: b.name, qty, price: b.price }); }
      else if (isSheet) { add({ type: "Sheet Cake", flavor: "9x13", qty: 1, notes: sheetNote, price: 110 }); }
      else if (isBrown) { add({ type: "Brownies", flavor: "Fudgy Chocolate", qty }); }
    };

    return (
      <div style={{ fontFamily: F.b, color: C.ink, background: C.bg, minHeight: "100vh" }}>
        <Styles />

        {/* Top bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(254,252,250,0.93)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <button className="kk-btn" onClick={() => setView("home")} style={{ padding: "10px 18px", borderRadius: 12, border: `2px solid ${C.ink}`, background: C.white, cursor: "pointer", fontFamily: F.b, fontSize: 16, fontWeight: 800, color: C.ink, display: "flex", alignItems: "center", gap: 6, transition: "all 250ms ease" }}>
              <ChevronLeft size={18} strokeWidth={2.5} /> Back to Menu
            </button>
            <CartBtn cart={cart} onClick={() => setDrawer(true)} />
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 80px" }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: prod.raw + "20", fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 14 }}>
              <Icon size={20} strokeWidth={2.5} /> {prod.name}
            </div>
            <h1 style={{ fontFamily: F.d, fontSize: 36, fontWeight: 800, margin: "0 0 6px" }}>{prod.name}</h1>
            <p style={{ fontSize: 26, fontWeight: 800, color: C.ink, margin: "0 0 10px", fontFamily: F.d }}>{prod.price}</p>
            <p style={{ fontSize: 16, color: C.sub, fontWeight: 700 }}>{prod.note}</p>
          </div>

          {/* Photo gallery */}
          {PRODUCT_IMAGES[pid] && (
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: PRODUCT_IMAGES[pid].gallery.length === 1 ? "1fr" : PRODUCT_IMAGES[pid].gallery.length === 2 ? "1fr 1fr" : "1fr 1fr",
                gap: 8,
              }}>
                {PRODUCT_IMAGES[pid].gallery.map((src, i) => {
                  const isFirstOfOdd = i === 0 && PRODUCT_IMAGES[pid].gallery.length % 2 !== 0 && PRODUCT_IMAGES[pid].gallery.length > 1;
                  return (
                    <div key={src} style={{
                      borderRadius: 14, overflow: "hidden",
                      aspectRatio: isFirstOfOdd ? "16/9" : "4/3",
                      gridColumn: isFirstOfOdd ? "1 / -1" : "auto",
                    }}>
                      <img src={src} alt={`${prod.name} example ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Flavors */}
          {hasFl && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Select a flavor</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                {FLAVORS.map(fl => {
                  const active = sel === fl.id;
                  return (
                    <button key={fl.id} onClick={() => setSel(fl.id)} style={{
                      display: "flex", flexDirection: "column", gap: 6, padding: "14px",
                      borderRadius: 12, border: `2px solid ${active ? prod.color : C.border}`,
                      background: active ? prod.raw + "10" : C.white,
                      cursor: "pointer", textAlign: "left", transition: "all 250ms ease", outline: "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: fl.color, flexShrink: 0 }} />
                        <span style={{ fontWeight: 800, fontSize: 15 }}>{fl.label}</span>
                        {active && <Check size={16} strokeWidth={3} style={{ color: prod.color, marginLeft: "auto" }} />}
                      </div>
                      <div style={{ fontSize: 14, color: C.sub, fontWeight: 600 }}>{fl.desc}</div>
                    </button>
                  );
                })}
              </div>
              {pid === "cupcakes" && (
                <label style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                  <input type="checkbox" checked={filling} onChange={e => setFilling(e.target.checked)} style={{ accentColor: RAW.yellow, width: 22, height: 22 }} />
                  Add filling (+$0.50 each)
                </label>
              )}
            </div>
          )}

          {/* Bundt */}
          {isBundt && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Select a flavor</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {BUNDTS.map(b => {
                  const active = selBundt === b.id;
                  return (
                    <button key={b.id} onClick={() => setSelBundt(b.id)} style={{
                      padding: "16px 14px", borderRadius: 12, textAlign: "center", cursor: "pointer",
                      border: `2px solid ${active ? b.color : C.border}`, background: active ? b.raw + "12" : C.white,
                      transition: "all 250ms ease", outline: "none",
                    }}>
                      <div style={{ fontFamily: F.d, fontSize: 17, fontWeight: 700 }}>{b.name}</div>
                      <div style={{ fontSize: 14, color: C.sub, margin: "6px 0 10px", fontWeight: 600 }}>{b.desc}</div>
                      <div style={{ fontFamily: F.d, fontSize: 20, fontWeight: 700, color: b.color }}>${b.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sheet */}
          {isSheet && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F.d, fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Describe your order</p>
              <p style={{ fontSize: 16, color: C.ink, marginBottom: 12, fontWeight: 600 }}>Flavor, occasion, colors — we'll confirm details.</p>
              <textarea value={sheetNote} onChange={e => setSheetNote(e.target.value)} rows={3} placeholder="e.g. Chocolate with vanilla buttercream..." style={{ ...inp("sheetNote"), resize: "vertical" }} />
            </div>
          )}

          {/* Brownies */}
          {isBrown && (
            <div style={{ padding: "20px", borderRadius: 14, background: prod.raw + "15", marginBottom: 28, textAlign: "center", border: `2px solid ${prod.color}` }}>
              <span style={{ fontFamily: F.d, fontSize: 20, fontWeight: 800 }}>Fudgy Chocolate Brownies</span>
              <span style={{ fontSize: 18, color: prod.color, fontWeight: 800, marginLeft: 12 }}>$3 each</span>
            </div>
          )}

          {/* Quantity */}
          {!isSheet && (
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, padding: "20px", borderRadius: 14, background: C.white, border: `2px solid ${C.border}` }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: C.ink }}>Quantity</span>
              <Qty value={qty} onChange={setQtyVal} min={prod.min} step={prod.step} />
            </div>
          )}

          {/* Add button */}
          <button className="kk-btn" onClick={doAdd} disabled={!canAdd} style={{
            width: "100%", padding: "18px", borderRadius: 14, border: "none",
            background: canAdd ? prod.color : C.border, color: canAdd ? C.white : C.muted,
            fontFamily: F.d, fontSize: 18, fontWeight: 700, cursor: canAdd ? "pointer" : "not-allowed",
            transition: "all 250ms ease",
            boxShadow: canAdd ? `0 6px 20px ${prod.raw}40` : "none",
          }}>
            {canAdd ? `Add ${qty / (prod.step >= 12 ? 12 : 1)} ${prod.step >= 12 ? (qty / 12 === 1 ? 'Dozen' : 'Dozens') : (qty === 1 ? 'Item' : 'Items')} to Cart` : "Please select a flavor"}
          </button>

          {cart.length > 0 && (
            <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 14, background: RAW.pink + "12", border: `2px solid ${C.pink}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.ink, display: "flex", alignItems: "center", gap: 8 }}>
                <Check size={18} strokeWidth={3} style={{ color: C.pink }} /> {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
              </span>
              <button className="kk-btn" onClick={() => setDrawer(true)} style={{ background: C.pink, color: C.white, border: "none", padding: "10px 20px", borderRadius: 10, fontFamily: F.b, fontSize: 15, fontWeight: 800, cursor: "pointer", transition: "all 250ms ease" }}>Check Out</button>
            </div>
          )}
        </div>
        <CartDrawer />
      </div>
    );
  }

  // ─── HOME ───
  return (
    <div style={{ fontFamily: F.b, color: C.ink, background: C.bg, overflowX: "hidden" }}>
      <Styles />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(254,252,250,0.93)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 250ms ease", padding: "0 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontFamily: F.d, fontSize: 26, fontWeight: 800, color: C.ink }}>
            Kake <span style={{ color: C.pink }}>N</span> Kream
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[["Menu", "#menu"], ["About", "#about"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={l} href={h} className="kk-nav-link" style={{ fontSize: 16, fontWeight: 800, color: C.ink, textDecoration: "none", padding: "10px 14px", borderRadius: 8, transition: "color 250ms ease" }}>{l}</a>
            ))}
            <CartBtn cart={cart} onClick={() => setDrawer(true)} />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 560 }}>
          <Reveal>
            <div style={{ width: "min(280px, 70vw)", height: "min(280px, 70vw)", borderRadius: 999, overflow: "hidden", margin: "0 auto 28px", boxShadow: `0 12px 40px ${RAW.pink}30`, border: `4px solid ${C.white}` }}>
              <img src="/images/hero-pink-drip-cake.jpeg" alt="Pink drip cake with chocolate ganache and rosettes" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </Reveal>
          <Reveal d={0.05}>
            <h1 style={{ fontFamily: F.d, fontSize: "clamp(36px, 8vw, 60px)", fontWeight: 800, color: C.ink, lineHeight: 1.1, margin: "0 0 14px" }}>
              Baked with Love
            </h1>
          </Reveal>
          <Reveal d={0.1}>
            <p style={{ fontFamily: F.d, fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 500, color: C.sub, lineHeight: 1.5, margin: "0 0 32px" }}>
              Handcrafted cupcakes, cakes and brownies<br />made fresh to order in Austin, TX
            </p>
          </Reveal>
          <Reveal d={0.15}>
            <a href="#menu" className="kk-btn" style={{ display: "inline-block", fontFamily: F.d, fontSize: 16, fontWeight: 600, color: C.white, background: C.pink, textDecoration: "none", padding: "16px 36px", borderRadius: 14, transition: "all 250ms ease", boxShadow: `0 6px 20px ${RAW.pink}35` }}>
              Browse Menu
            </a>
          </Reveal>
          <Reveal d={0.2}>
            <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                ["Pickup Only", RAW.pink], ["Fridays", RAW.coral], ["Venmo / Zelle", RAW.yellow], ["Made Fresh", RAW.mint],
              ].map(([t, c], i) => (
                <span key={i} style={{ padding: "12px 24px", borderRadius: 14, background: c + "20", color: C.ink, fontSize: 15, fontWeight: 800, border: `2px solid ${c}40` }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: C.border, margin: "0 24px" }} />

      {/* Menu */}
      <section id="menu" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 800, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Our Menu</p>
          <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 7vw, 44px)", fontWeight: 800, textAlign: "center", margin: "0 0 12px" }}>What are you craving?</h2>
          <p style={{ fontFamily: F.b, fontSize: 18, color: C.sub, textAlign: "center", marginBottom: 40, fontWeight: 600 }}>Tap to see flavors and add to cart</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, alignItems: "stretch" }}>
          {PRODUCTS.map((p, i) => {
            const PIcon = p.icon;
            const imgs = PRODUCT_IMAGES[p.id];
            return (
              <Reveal key={p.id} d={i * 0.04} style={{ display: "flex" }}>
                <button className="kk-card" onClick={() => openProd(p.id)} aria-label={`${p.name} — ${p.price}`} style={{
                  width: "100%", padding: 0, borderRadius: 16,
                  border: `2px solid ${C.border}`, background: C.white, cursor: "pointer",
                  textAlign: "left", transition: "all 250ms ease", outline: "none",
                  display: "flex", flexDirection: "column", overflow: "hidden",
                }}>
                  {imgs ? (
                    <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: p.raw + "10" }}>
                      <img src={imgs.thumb} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  ) : (
                    <div style={{ width: "100%", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", background: p.raw + "10", color: p.color }}>
                      <PIcon size={48} strokeWidth={1.5} />
                    </div>
                  )}
                  <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ fontFamily: F.d, fontSize: 22, fontWeight: 800 }}>{p.name}</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: p.color }}>{p.price}</div>
                    </div>
                    <p style={{ fontSize: 14, color: C.sub, margin: "0 0 12px", lineHeight: 1.4, fontWeight: 600 }}>{p.note}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: p.color }}>View options</span>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 24px", background: C.warm }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 800, color: C.mint, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>How It Works</p>
            <h2 style={{ fontFamily: F.d, fontSize: 30, fontWeight: 700, textAlign: "center", margin: "0 0 32px" }}>Easy as 1, 2, 3</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { n: "1", t: "Build Your Cart", d: "Browse, pick flavors, add items.", icon: ShoppingCart, c: C.pink, rc: RAW.pink },
              { n: "2", t: "Submit and Confirm", d: "We'll email to confirm and share payment info.", icon: Mail, c: C.yellow, rc: RAW.yellow },
              { n: "3", t: "Pickup Friday", d: "Pick up fresh. Pay remaining 50%.", icon: PartyPopper, c: C.mint, rc: RAW.mint },
            ].map((s, i) => {
              const SIcon = s.icon;
              return (
                <Reveal key={i} d={i * 0.05}>
                  <div style={{ padding: "32px 24px", borderRadius: 18, border: `2px solid ${C.border}`, textAlign: "center", background: C.white }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: s.rc + "18", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: s.c }}>
                      <SIcon size={28} strokeWidth={2} />
                    </div>
                    <div style={{ fontFamily: F.d, fontSize: 40, fontWeight: 900, color: s.c, marginBottom: 4 }}>{s.n}</div>
                    <h3 style={{ fontFamily: F.d, fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>{s.t}</h3>
                    <p style={{ fontSize: 15, color: C.sub, margin: 0, lineHeight: 1.5, fontWeight: 600 }}>{s.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 800, color: C.lavender, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>About</p>
            <h2 style={{ fontFamily: F.d, fontSize: 30, fontWeight: 700, margin: "0 0 16px" }}>Meet the Baker</h2>
          </Reveal>
          <Reveal d={0.05}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 14px", background: RAW.peach + "30", display: "flex", alignItems: "center", justifyContent: "center", color: C.peach }}>
              <ChefHat size={34} strokeWidth={2} />
            </div>
          </Reveal>
          <Reveal d={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 18, color: C.sub, lineHeight: 1.7, fontWeight: 600 }}>
              Hi, I'm Kalyani! I've been baking for family and friends for years and I'm so excited to share my treats with Austin. Every item is baked fresh to order with love.
            </p>
            <p style={{ fontSize: 14, color: C.muted, marginTop: 12, fontWeight: 700 }}>Kalyani's words and photo coming soon!</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 24px", background: C.white }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 800, color: C.sky, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>FAQ</p>
            <h2 style={{ fontFamily: F.d, fontSize: 32, fontWeight: 800, textAlign: "center", margin: "0 0 32px" }}>Questions?</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((f, i) => (
              <Reveal key={i} d={i * 0.02}>
                <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <button
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", padding: "18px 24px", background: "none", border: "none",
                      cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between",
                      alignItems: "center", fontFamily: F.b, fontSize: 17, fontWeight: 800, color: C.ink,
                    }}
                  >
                    {f.q}
                    <ChevronDown size={20} strokeWidth={2.5} style={{ color: C.muted, transition: "transform 250ms ease", transform: openFaq === i ? "rotate(180deg)" : "none", flexShrink: 0 }} />
                  </button>
                  <div role="region" aria-hidden={openFaq !== i} style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 250ms ease" }}>
                    <p style={{ padding: "0 24px 20px", fontSize: 16, color: C.sub, lineHeight: 1.5, margin: 0, fontWeight: 600 }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{ background: C.secondary, padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: C.white, lineHeight: 1.5, maxWidth: 750, margin: "0 auto", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <AlertTriangle size={16} strokeWidth={2.5} style={{ flexShrink: 0 }} />
          This food is made in a home kitchen and is not inspected by the Department of State Health Services or a local health department.
        </p>
      </div>

      {/* Footer */}
      <footer style={{ padding: "48px 24px 32px", textAlign: "center", background: C.warm }}>
        <div style={{ fontFamily: F.d, fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Kake <span style={{ color: C.pink }}>N</span> Kream</div>
        <p style={{ fontFamily: F.b, fontSize: 16, color: C.sub, margin: "0 0 12px", fontWeight: 600 }}>Handcrafted baked goods · Austin, TX</p>
        <div style={{ fontSize: 13, color: C.muted, fontWeight: 700 }}>&copy; {new Date().getFullYear()} Kake N Kream</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 10, fontWeight: 600, opacity: 0.6 }}>Built by <a href="https://foundry-red.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: C.pink, textDecoration: "none" }}>Foundry</a></div>
      </footer>

      {/* Floating cart */}
      {scrolled && cart.length > 0 && (
        <button aria-label="Open cart" onClick={() => setDrawer(true)} style={{ position: "fixed", bottom: 20, right: 20, zIndex: 90, background: C.pink, color: C.white, padding: "16px 24px", borderRadius: 16, fontFamily: F.d, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 8, transition: "all 250ms ease" }}>
          <ShoppingCart size={20} strokeWidth={2.5} /> Cart ({cart.length})
        </button>
      )}

      <CartDrawer />
    </div>
  );
}

// ─── Shared Components ───

function CartBtn({ cart, onClick }) {
  return (
    <button className="kk-btn" onClick={onClick} aria-label="Open cart" style={{
      position: "relative", background: C.pink, color: C.white, border: "none",
      padding: "10px 20px", borderRadius: 12, fontFamily: F.b, fontSize: 16, fontWeight: 800, cursor: "pointer",
      boxShadow: `0 4px 12px ${RAW.pink}44`, display: "flex", alignItems: "center", gap: 8, transition: "all 250ms ease",
    }}>
      <ShoppingCart size={18} strokeWidth={2.5} />
      Cart {cart.length > 0 && <span style={{ background: C.white, color: C.ink, borderRadius: "50%", padding: "2px 8px", fontSize: 13, fontWeight: 900 }}>{cart.length}</span>}
    </button>
  );
}

function Styles() {
  return (
    <style>{`
      .kk-card:hover { border-color: var(--color-primary) !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
      .kk-card:active { transform: translateY(0); }
      .kk-btn:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-1px); }
      .kk-btn:active:not(:disabled) { transform: translateY(1px); filter: brightness(0.97); }
      .kk-nav-link:hover { color: var(--color-primary) !important; background: rgba(242,160,181,0.08); }
    `}</style>
  );
}
