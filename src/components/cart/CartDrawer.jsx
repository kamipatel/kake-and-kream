"use client";
import { ShoppingCart, X, AlertTriangle } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { C, RAW, F } from "@/lib/theme";

/* Moved out of KakeAndKream.jsx so every route can mount it via CartProvider.
   Behaviour is unchanged from the homepage-only version. */
export function CartDrawer({ cart, drawer, setDrawer, onRemoveItem, cust, setCust, errors, setErrors, submitting, setSubmitting, onSubmitSuccess }) {
  const inp = (field) => ({
    width: "100%", padding: "14px 18px", borderRadius: 12,
    border: `2px solid ${errors[field] ? C.coral : C.border}`,
    fontFamily: F.b, fontSize: 16, outline: "none", background: C.white,
    boxSizing: "border-box", fontWeight: 400, color: C.ink,
    transition: "border-color 250ms ease", cursor: "text",
  });
  const labelStyle = { display: "block", fontSize: 14, fontWeight: 500, color: C.sub, marginBottom: 6 };
  const reqStar = <span style={{ color: C.coral, marginLeft: 2 }}>*</span>;
  const errMsg = (field) => errors[field] ? <p role="alert" style={{ fontSize: 13, color: C.coral, fontWeight: 400, marginTop: 4 }}>{errors[field]}</p> : null;

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
              <p style={{ fontSize: 18, fontWeight: 400 }}>Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < cart.length - 1 ? `2px solid ${C.border}` : "none" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 18 }}>{item.type}</div>
                    <div style={{ fontSize: 16, color: C.sub, fontWeight: 400 }}>{item.flavor} x {item.qty}</div>
                    {item.notes && <div style={{ fontSize: 14, color: C.sub, fontStyle: "italic", fontWeight: 500 }}>{item.notes}</div>}
                  </div>
                  <button aria-label={`Remove ${item.type}`} onClick={() => onRemoveItem(item._id)} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${C.coral}`, background: C.white, cursor: "pointer", color: C.coral, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 250ms ease" }}>
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: `3px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontFamily: F.d, fontSize: 22, fontWeight: 700, margin: 0 }}>Your Pickup Info</p>
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
                  <input type="tel" value={cust.phone} onChange={e => setCust(p => ({ ...p, phone: e.target.value }))} style={inp("phone")} placeholder="(636) 555-1234" />
                </div>
                <div>
                  <label style={labelStyle}>Pickup Date (see notice requirements){reqStar}</label>
                  <input type="date" value={cust.date} onChange={e => { setCust(p => ({ ...p, date: e.target.value })); setErrors(p => ({ ...p, date: undefined })); }} style={{ ...inp("date"), height: 52 }} />
                  {errMsg("date")}
                </div>
                <div>
                  <label style={labelStyle}>Any food allergens?</label>
                  <input value={cust.allergy} onChange={e => setCust(p => ({ ...p, allergy: e.target.value }))} style={inp("allergy")} placeholder="e.g. nuts, dairy" />
                </div>
                <div>
                  <label style={labelStyle}>Additional notes for Kalyani</label>
                  <textarea rows={2} value={cust.notes} onChange={e => setCust(p => ({ ...p, notes: e.target.value }))} style={{ ...inp("notes"), resize: "vertical" }} placeholder="Custom flavor requests, decorations, etc." />
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 14, background: RAW.yellow + "60", fontSize: 14, color: C.ink, lineHeight: 1.5, border: `2px solid ${C.yellow}`, fontWeight: 400, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <AlertTriangle size={18} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>ATTENTION: Our kitchen is NOT allergen-free. Submitting this form does not book your order — it is only booked when full payment is received.</span>
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 14, background: RAW.pink + "20", fontSize: 14, color: C.ink, lineHeight: 1.5, border: `2px solid ${C.border}`, fontWeight: 400 }}>
                  <p style={{ margin: 0, fontWeight: 500, color: C.brown }}>Payment &amp; Cancellation Policy</p>
                  <p style={{ margin: "6px 0 0", color: C.ink }}>Full payment is required once the order is confirmed. Payment is non-refundable in case of cancellation.</p>
                </div>
                <ShimmerButton background={submitting ? "#8B7D75" : "#FF69B4"} shimmerColor="#FFD54F" shimmerSize="0.06em" borderRadius="16px" disabled={submitting} className="w-full font-display text-xl font-semibold py-4" style={{ cursor: submitting ? "not-allowed" : "pointer" }} onClick={async () => {
                  const errs = {};
                  if (!cust.fn.trim()) errs.fn = "First name is required";
                  if (!cust.ln.trim()) errs.ln = "Last name is required";
                  if (!cust.email.trim()) errs.email = "Email is required";
                  if (!cust.date) errs.date = "Pickup date is required";
                  if (Object.keys(errs).length) { setErrors(errs); return; }
                  setErrors({});
                  const order = cart.map((item, i) => `${i + 1}. ${item.type} — ${item.flavor} x ${item.qty}${item.notes ? ` [${item.notes}]` : ""}`).join("\n");
                  const payload = { _subject: `New order from ${cust.fn} ${cust.ln}`, firstName: cust.fn, lastName: cust.ln, email: cust.email, _replyto: cust.email, phone: cust.phone, pickupDate: cust.date, allergens: cust.allergy, notes: cust.notes, order };
                  setSubmitting(true);
                  try {
                    const res = await fetch("https://formspree.io/f/mgopbwvv", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Accept: "application/json" },
                      body: JSON.stringify(payload),
                    });
                    if (!res.ok) throw new Error("Submission failed");
                    // Fire-and-forget: send to Google Sheets via Apps Script
                    fetch("https://script.google.com/macros/s/AKfycbwgCGQoPo3QXuLX3iRxzdDwBTz06L7xMtnHmBMXT2ciSGLNSTuYbBGQRk_beixXVLYS/exec", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                      mode: "no-cors",
                    }).catch(() => {});
                    setDrawer(false); onSubmitSuccess();
                  } catch { alert("Something went wrong — please try again."); } finally { setSubmitting(false); }
                }}>
                  {submitting ? "Sending..." : "Submit Order Request"}
                </ShimmerButton>
                <p style={{ fontSize: 16, color: C.sub, textAlign: "center", fontWeight: 400 }}>We'll email you within 24 hours.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
