"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   KAKE AND KREAM v4
   Minimalist · No gradients · Pastel accents
   ═══════════════════════════════════════════ */

const C = {
  bg: "#FEFCFA",
  white: "#FFFFFF",
  pink: "#F2A0B5",
  coral: "#F4978E",
  peach: "#F8C4A4",
  yellow: "#F7D794",
  mint: "#A8DFC8",
  sky: "#A0C4E8",
  lavender: "#C4B5E0",
  ink: "#2A2230",
  sub: "#847889",
  muted: "#B5AABB",
  border: "#EDEBF0",
  card: "#FFFFFF",
};

const F = {
  d: "'Fredoka', sans-serif",
  b: "'Nunito', sans-serif",
  a: "'Playfair Display', serif",
};

const FLAVORS = [
  { id: "choc-van", label: "Chocolate + Vanilla", desc: "Sprinkles & cherry · Filling: ganache or caramel", color: C.peach },
  { id: "choc-choc", label: "Double Chocolate", desc: "Chocolate shavings · Filling: ganache", color: C.coral },
  { id: "choc-straw", label: "Chocolate Strawberry", desc: "Fresh strawberry buttercream · Filling: strawberry", color: C.pink },
  { id: "choc-cookie", label: "Cookies and Cream", desc: "Oreo cookies & cookies and cream buttercream", color: C.lavender },
  { id: "choc-marsh", label: "S'mores Chocolate", desc: "Mini marshmallows & ganache drizzle", color: C.peach },
  { id: "choc-mocha", label: "Mocha", desc: "Coffee-kissed chocolate with ganache", color: C.coral },
  { id: "choc-coco", label: "Chocolate Coconut", desc: "Unsweetened coconut topping", color: C.mint },
  { id: "van-van", label: "Vanilla Squared", desc: "Classic vanilla buttercream & sprinkles", color: C.yellow },
  { id: "van-coco", label: "Vanilla Coconut", desc: "Toasted coconut flakes", color: C.mint },
  { id: "van-choc", label: "Vanilla Chocolate", desc: "Rich chocolate buttercream · Filling: ganache", color: C.coral },
  { id: "van-straw", label: "Strawberry Bliss", desc: "Strawberry buttercream & strawberry slice", color: C.pink },
  { id: "van-cara", label: "Caramel Dream", desc: "Caramel buttercream & caramel drizzle", color: C.peach },
  { id: "van-cotton", label: "Cotton Candy", desc: "Cotton candy bites & sprinkles", color: C.lavender },
  { id: "rv-cc", label: "Red Velvet", desc: "Cream cheese buttercream", color: C.coral },
  { id: "conf-van", label: "Confetti Vanilla", desc: "Vanilla almond cake with sprinkles", color: C.yellow },
  { id: "conf-choc", label: "Confetti Chocolate", desc: "Chocolate buttercream · Filling: ganache", color: C.peach },
  { id: "conf-straw", label: "Confetti Strawberry", desc: "Strawberry buttercream · Filling: strawberry", color: C.pink },
];

const BUNDTS = [
  { id: "b-van", name: "Vanilla", desc: "Cinnamon walnut streusel & glaze", price: 45, color: C.yellow },
  { id: "b-marble", name: "Marble", desc: "Ganache topping", price: 55, color: C.peach },
  { id: "b-rv", name: "Red Velvet", desc: "Cream cheese glaze", price: 55, color: C.coral },
  { id: "b-choc", name: "Chocolate", desc: "Ganache topping", price: 55, color: C.coral },
];

const PRODUCTS = [
  { id: "cupcakes", name: "Cupcakes", emoji: "🧁", price: "$4.50–$5 each", note: "Filling +$0.50 · Min 1 dozen · One flavor per dozen", color: C.pink, min: 12, step: 12 },
  { id: "mini", name: "Mini Cakes", emoji: "🍰", price: "Per dozen", note: "Min 2 dozen · One flavor per dozen", color: C.peach, min: 24, step: 12 },
  { id: "bundt", name: "Bundt Cakes", emoji: "🍩", price: "From $45", note: "Full-size · Sold individually", color: C.yellow, min: 1, step: 1 },
  { id: "sheet", name: "Sheet Cakes", emoji: "🎂", price: "From $110", note: "9×13 · Price varies", color: C.lavender, min: 1, step: 1 },
  { id: "brownies", name: "Brownies", emoji: "🍫", price: "$3 each", note: "Fudgy chocolate · Min 1 dozen", color: C.mint, min: 12, step: 12 },
];

function Reveal({ children, d = 0 }) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: `all 0.5s ease ${d}s` }}>{children}</div>;
}

function Qty({ value, onChange, min, step }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", borderRadius: 10, border: `2px solid ${C.border}`, background: C.white }}>
      <button onClick={() => onChange(Math.max(min, value - step))} style={{ width: 36, height: 36, border: "none", background: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", color: value <= min ? C.muted : C.ink }}>−</button>
      <span style={{ width: 40, textAlign: "center", fontFamily: F.b, fontSize: 14, fontWeight: 700 }}>{value}</span>
      <button onClick={() => onChange(value + step)} style={{ width: 36, height: 36, border: "none", background: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", color: C.ink }}>+</button>
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

  const inp = { width: "100%", padding: "10px 14px", borderRadius: 10, border: `2px solid ${C.border}`, fontFamily: F.b, fontSize: 14, outline: "none", background: C.white, boxSizing: "border-box" };
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
        <div onClick={() => setDrawer(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
        <div style={{ position: "relative", width: "min(420px, 94vw)", height: "100%", background: C.bg, boxShadow: "-2px 0 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", animation: "si .2s ease" }}>
          <style>{`@keyframes si{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, margin: 0 }}>Cart ({cart.length})</h3>
            <button onClick={() => setDrawer(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.muted }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: "center", padding: "40px 0", color: C.muted, fontSize: 14 }}>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < cart.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{item.type}</div>
                      <div style={{ fontSize: 12, color: C.sub }}>{item.flavor} × {item.qty}{item.filling ? " + filling" : ""}</div>
                      {item.notes && <div style={{ fontSize: 11, color: C.muted, fontStyle: "italic" }}>{item.notes}</div>}
                    </div>
                    <button onClick={() => rm(item._id)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${C.border}`, background: C.white, cursor: "pointer", fontSize: 12, color: C.coral }}>✕</button>
                  </div>
                ))}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `2px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontFamily: F.d, fontSize: 15, fontWeight: 600, margin: 0 }}>Your Info</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <input value={cust.fn} onChange={e => setCust(p => ({ ...p, fn: e.target.value }))} style={inp} placeholder="First name *" />
                    <input value={cust.ln} onChange={e => setCust(p => ({ ...p, ln: e.target.value }))} style={inp} placeholder="Last name *" />
                  </div>
                  <input type="email" value={cust.email} onChange={e => setCust(p => ({ ...p, email: e.target.value }))} style={inp} placeholder="Email *" />
                  <input value={cust.phone} onChange={e => setCust(p => ({ ...p, phone: e.target.value }))} style={inp} placeholder="Phone" />
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: C.sub, display: "block", marginBottom: 3 }}>Pickup Friday *</label>
                    <input type="date" value={cust.date} onChange={e => setCust(p => ({ ...p, date: e.target.value }))} style={inp} />
                  </div>
                  <input value={cust.allergy} onChange={e => setCust(p => ({ ...p, allergy: e.target.value }))} style={inp} placeholder="Food allergies" />
                  <textarea rows={2} value={cust.notes} onChange={e => setCust(p => ({ ...p, notes: e.target.value }))} style={{ ...inp, resize: "vertical" }} placeholder="Additional notes" />
                  <div style={{ padding: "10px 12px", borderRadius: 10, background: C.yellow + "25", fontSize: 11, color: C.sub, lineHeight: 1.5 }}>
                    ⚠️ Our kitchen is not allergy-free. Submitting does not book your order — it's booked when the 50% retainer is paid.
                  </div>
                  <button onClick={() => { setDrawer(false); setView("done"); }} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: C.pink, color: C.white, fontFamily: F.d, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    Submit Order Request
                  </button>
                  <p style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>We'll email within 24 hours to confirm.</p>
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
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontFamily: F.d, fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Order Request Sent!</h1>
          <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.6, marginBottom: 28 }}>We'll email you within 24 hours to confirm details and share payment info.</p>
          <button onClick={() => { setView("home"); setCart([]); }} style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 10, border: "none", background: C.pink, color: C.white, cursor: "pointer" }}>Back to Home</button>
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

    const doAdd = () => {
      if (hasFl && sel) { const fl = FLAVORS.find(f => f.id === sel); add({ type: prod.name, flavor: fl.label, qty, filling: pid === "cupcakes" && filling, desc: fl.desc }); }
      else if (isBundt && selBundt) { const b = BUNDTS.find(o => o.id === selBundt); add({ type: "Bundt Cake", flavor: b.name, qty, price: b.price }); }
      else if (isSheet) { add({ type: "Sheet Cake", flavor: "9×13", qty: 1, notes: sheetNote, price: 110 }); }
      else if (isBrown) { add({ type: "Brownies", flavor: "Fudgy Chocolate", qty }); }
    };

    return (
      <div style={{ fontFamily: F.b, color: C.ink, background: C.bg, minHeight: "100vh" }}>

        {/* Top bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: C.bg + "ee", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
            <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.b, fontSize: 13, fontWeight: 600, color: C.sub }}>← Menu</button>
            <CartBtn />
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 80px" }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 8, background: prod.color + "22", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 10 }}>
              {prod.emoji} {prod.name}
            </div>
            <h1 style={{ fontFamily: F.d, fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>{prod.name}</h1>
            <p style={{ fontSize: 18, fontWeight: 700, color: prod.color, margin: "0 0 4px", fontFamily: F.d }}>{prod.price}</p>
            <p style={{ fontSize: 13, color: C.sub }}>{prod.note}</p>
          </div>

          {/* Flavors */}
          {hasFl && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F.d, fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Select a flavor</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {FLAVORS.map(fl => {
                  const active = sel === fl.id;
                  return (
                    <button key={fl.id} onClick={() => setSel(fl.id)} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                      borderRadius: 12, border: `2px solid ${active ? prod.color : C.border}`,
                      background: active ? prod.color + "10" : C.white,
                      cursor: "pointer", textAlign: "left", transition: "all 0.15s", outline: "none",
                    }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: fl.color, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{fl.label}</span>
                        <span style={{ fontSize: 12, color: C.sub, marginLeft: 8 }}>{fl.desc}</span>
                      </div>
                      {active && <span style={{ color: prod.color, fontSize: 14, fontWeight: 700 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
              {pid === "cupcakes" && (
                <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  <input type="checkbox" checked={filling} onChange={e => setFilling(e.target.checked)} style={{ accentColor: C.yellow, width: 16, height: 16 }} />
                  Add filling (+$0.50 each)
                </label>
              )}
            </div>
          )}

          {/* Bundt */}
          {isBundt && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F.d, fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Select a flavor</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {BUNDTS.map(b => {
                  const active = selBundt === b.id;
                  return (
                    <button key={b.id} onClick={() => setSelBundt(b.id)} style={{
                      padding: "16px 14px", borderRadius: 12, textAlign: "center", cursor: "pointer",
                      border: `2px solid ${active ? b.color : C.border}`, background: active ? b.color + "12" : C.white,
                      transition: "all 0.15s", outline: "none",
                    }}>
                      <div style={{ fontFamily: F.d, fontSize: 15, fontWeight: 700 }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: C.sub, margin: "3px 0 6px" }}>{b.desc}</div>
                      <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 700, color: b.color }}>${b.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sheet */}
          {isSheet && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F.d, fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Describe your order</p>
              <p style={{ fontSize: 12, color: C.sub, marginBottom: 8 }}>Flavor, occasion, colors — we'll confirm pricing.</p>
              <textarea value={sheetNote} onChange={e => setSheetNote(e.target.value)} rows={3} placeholder="e.g. Chocolate with vanilla buttercream, birthday party..." style={{ ...inp, resize: "vertical" }} />
            </div>
          )}

          {/* Brownies */}
          {isBrown && (
            <div style={{ padding: "16px", borderRadius: 12, background: prod.color + "15", marginBottom: 24, textAlign: "center" }}>
              <span style={{ fontFamily: F.d, fontSize: 16, fontWeight: 700 }}>Fudgy Chocolate Brownies</span>
              <span style={{ fontSize: 15, color: prod.color, fontWeight: 700, marginLeft: 8 }}>$3 each</span>
            </div>
          )}

          {/* Quantity */}
          {!isSheet && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.sub }}>Qty{prod.step >= 12 ? " (dozen)" : ""}</span>
              <Qty value={qty} onChange={setQtyVal} min={prod.min} step={prod.step} />
              {prod.step >= 12 && <span style={{ fontSize: 12, color: C.muted }}>{qty / 12} doz</span>}
            </div>
          )}

          {/* Add button */}
          <button onClick={doAdd} disabled={!canAdd} style={{
            width: "100%", padding: "14px", borderRadius: 12, border: "none",
            background: canAdd ? prod.color : C.border, color: canAdd ? C.white : C.muted,
            fontFamily: F.d, fontSize: 15, fontWeight: 600, cursor: canAdd ? "pointer" : "not-allowed",
            transition: "all 0.15s",
          }}>
            {canAdd ? `Add to Cart` : "Select a flavor"}
          </button>

          {cart.length > 0 && (
            <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: C.mint + "20", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>✓ {cart.length} item{cart.length !== 1 ? "s" : ""} in cart</span>
              <button onClick={() => setDrawer(true)} style={{ background: C.mint, color: C.white, border: "none", padding: "6px 14px", borderRadius: 8, fontFamily: F.b, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>View Cart →</button>
            </div>
          )}
        </div>
        <CartDrawer />
      </div>
    );
  }

  // ─── Cart Button (reused) ───
  function CartBtn() {
    return (
      <button onClick={() => setDrawer(true)} style={{
        position: "relative", background: C.pink, color: C.white, border: "none",
        padding: "7px 14px", borderRadius: 8, fontFamily: F.b, fontSize: 12, fontWeight: 700, cursor: "pointer",
      }}>
        Cart {cart.length > 0 && <span style={{ background: C.yellow, color: C.ink, borderRadius: 6, padding: "1px 6px", fontSize: 10, fontWeight: 800, marginLeft: 4 }}>{cart.length}</span>}
      </button>
    );
  }

  // ─── HOME ───
  return (
    <div style={{ fontFamily: F.b, color: C.ink, background: C.bg, overflowX: "hidden" }}>


      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? C.bg + "ee" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.25s", padding: "0 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
          <span style={{ fontFamily: F.d, fontSize: 18, fontWeight: 700, color: C.ink }}>
            Kake <span style={{ color: C.pink }}>and</span> Kream
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {[["Menu", "#menu"], ["About", "#about"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={l} href={h} style={{ fontSize: 13, fontWeight: 600, color: C.sub, textDecoration: "none" }}>{l}</a>
            ))}
            <CartBtn />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "90px 24px 70px" }}>
        <div style={{ maxWidth: 520 }}>
          <Reveal><p style={{ fontSize: 44, marginBottom: 4 }}>🧁</p></Reveal>
          <Reveal d={0.05}>
            <h1 style={{ fontFamily: F.d, fontSize: "clamp(32px, 7vw, 52px)", fontWeight: 700, color: C.ink, lineHeight: 1.1, margin: "0 0 14px" }}>
              Baked with Love
            </h1>
          </Reveal>
          <Reveal d={0.1}>
            <p style={{ fontFamily: F.a, fontSize: "clamp(15px, 2.5vw, 18px)", color: C.sub, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 28px" }}>
              Handcrafted cupcakes, cakes and brownies<br />made fresh to order in Austin, TX
            </p>
          </Reveal>
          <Reveal d={0.15}>
            <a href="#menu" style={{ display: "inline-block", fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.white, background: C.pink, textDecoration: "none", padding: "12px 28px", borderRadius: 10, transition: "opacity 0.2s" }}>
              Browse Menu
            </a>
          </Reveal>
          <Reveal d={0.2}>
            <div style={{ marginTop: 28, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                ["Pickup Only", C.pink], ["Fridays", C.coral], ["Venmo / Zelle", C.yellow], ["Made Fresh", C.mint],
              ].map(([t, c], i) => (
                <span key={i} style={{ padding: "4px 12px", borderRadius: 6, background: c + "20", color: C.ink, fontSize: 11, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: C.border, margin: "0 24px" }} />

      {/* Menu */}
      <section id="menu" style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: F.d, fontSize: 12, fontWeight: 700, color: C.pink, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", marginBottom: 6 }}>Our Menu</p>
          <h2 style={{ fontFamily: F.d, fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 700, textAlign: "center", margin: "0 0 6px" }}>What are you craving?</h2>
          <p style={{ fontFamily: F.a, fontSize: 16, color: C.sub, fontStyle: "italic", textAlign: "center", marginBottom: 36 }}>Tap to see flavors and add to cart</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} d={i * 0.04}>
              <button onClick={() => openProd(p.id)} style={{
                width: "100%", padding: "24px 20px", borderRadius: 16,
                border: `2px solid ${C.border}`, background: C.white, cursor: "pointer",
                textAlign: "left", transition: "all 0.2s", outline: "none",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: p.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{p.emoji}</div>
                  <div>
                    <div style={{ fontFamily: F.d, fontSize: 16, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.price}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: C.sub, margin: "0 0 8px", lineHeight: 1.4 }}>{p.note}</p>
                <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>View options →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "64px 24px", background: C.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: F.d, fontSize: 12, fontWeight: 700, color: C.mint, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", marginBottom: 6 }}>How It Works</p>
            <h2 style={{ fontFamily: F.d, fontSize: 28, fontWeight: 700, textAlign: "center", margin: "0 0 32px" }}>Easy as 1, 2, 3</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { n: "1", t: "Build Your Cart", d: "Browse, pick flavors, add items.", i: "🛒", c: C.pink },
              { n: "2", t: "Submit and Confirm", d: "We'll email to confirm and share payment info.", i: "✉️", c: C.yellow },
              { n: "3", t: "Pickup Friday", d: "Pick up fresh. Pay remaining 50%.", i: "🎉", c: C.mint },
            ].map((s, i) => (
              <Reveal key={i} d={i * 0.05}>
                <div style={{ padding: "24px 18px", borderRadius: 14, border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: s.c + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto 8px" }}>{s.i}</div>
                  <div style={{ fontFamily: F.d, fontSize: 24, fontWeight: 700, color: s.c }}>{s.n}</div>
                  <h3 style={{ fontFamily: F.d, fontSize: 15, fontWeight: 700, margin: "2px 0 4px" }}>{s.t}</h3>
                  <p style={{ fontSize: 12, color: C.sub, margin: 0, lineHeight: 1.5 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: F.d, fontSize: 12, fontWeight: 700, color: C.lavender, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>About</p>
            <h2 style={{ fontFamily: F.d, fontSize: 26, fontWeight: 700, margin: "0 0 16px" }}>Meet the Baker</h2>
          </Reveal>
          <Reveal d={0.05}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 14px", background: C.peach, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>👩‍🍳</div>
          </Reveal>
          <Reveal d={0.1}>
            <p style={{ fontFamily: F.a, fontSize: 16, color: C.ink, lineHeight: 1.7, fontStyle: "italic" }}>
              Hi, I'm Kalyani! I've been baking for family and friends for years and I'm so excited to share my treats with Austin. Every item is baked fresh to order with love.
            </p>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 10, fontStyle: "italic" }}>Placeholder — will be updated with Kalyani's words and photo.</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "64px 24px", background: C.white }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: F.d, fontSize: 12, fontWeight: 700, color: C.sky, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", marginBottom: 6 }}>FAQ</p>
            <h2 style={{ fontFamily: F.d, fontSize: 24, fontWeight: 700, textAlign: "center", margin: "0 0 24px" }}>Questions?</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {faqs.map((f, i) => (
              <Reveal key={i} d={i * 0.02}>
                <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: "100%", padding: "13px 16px", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between",
                    alignItems: "center", fontFamily: F.b, fontSize: 13, fontWeight: 700, color: C.ink,
                  }}>
                    {f.q}
                    <span style={{ fontSize: 14, color: C.muted, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 120 : 0, overflow: "hidden", transition: "max-height 0.25s ease" }}>
                    <p style={{ padding: "0 16px 13px", fontSize: 12, color: C.sub, lineHeight: 1.5, margin: 0 }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{ background: C.pink, padding: "14px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: C.white, lineHeight: 1.5, maxWidth: 600, margin: "0 auto", fontWeight: 600 }}>
          ⚠️ This food is made in a home kitchen and is not inspected by the Department of State Health Services or a local health department.
        </p>
      </div>

      {/* Footer */}
      <footer style={{ padding: "32px 24px 20px", textAlign: "center" }}>
        <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Kake <span style={{ color: C.pink }}>and</span> Kream</div>
        <p style={{ fontFamily: F.a, fontSize: 13, color: C.sub, fontStyle: "italic", margin: "0 0 8px" }}>Handcrafted baked goods · Austin, TX</p>
        <div style={{ fontSize: 10, color: C.muted }}>© {new Date().getFullYear()} Kake and Kream</div>
        <div style={{ fontSize: 9, color: C.muted + "55", marginTop: 6 }}>Built by <a href="https://foundry-red.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: C.pink + "55", textDecoration: "none" }}>Foundry</a></div>
      </footer>

      {/* Floating cart */}
      {scrolled && cart.length > 0 && (
        <button onClick={() => setDrawer(true)} style={{ position: "fixed", bottom: 16, right: 16, zIndex: 90, background: C.pink, color: C.white, padding: "12px 18px", borderRadius: 10, fontFamily: F.d, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          🛒 Cart ({cart.length})
        </button>
      )}

      <CartDrawer />
    </div>
  );
}


