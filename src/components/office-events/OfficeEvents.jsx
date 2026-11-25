"use client";
import Image from "next/image";
import { Briefcase, Presentation, Cake, Gift, Coffee, Package, Clock, MapPin } from "lucide-react";
import { SpotlightNav } from "@/components/ui/spotlight-nav";
import { useCart } from "@/components/cart/CartContext";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import { AnimatedDivider } from "@/components/ui/animated-divider";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/office-events/SectionHeader";
import { OfficeProducts } from "@/components/office-events/OfficeProducts";
import { OfficeInquiryForm } from "@/components/office-events/OfficeInquiryForm";
import { C, F, RAW } from "@/lib/theme";

/* Office ordering terms shown on this page.
   NOTE: These are the site's current GENERAL ordering terms. The client has
   not yet given office-specific terms. Every minimum, notice period and
   pickup statement on this page must read from this object — update it here
   once office terms are confirmed. */
const OFFICE_ORDER_INFO = {
  minimum: "1 dozen minimum per flavor",
  notice: "3 to 4 days advance notice, more for large orders",
  fulfillment: "Pickup in the St. Charles, MO area",
};

const INQUIRY_ANCHOR = "#office-inquiry";

const OCCASIONS = [
  { text: "Team meetings and training sessions", icon: Presentation, color: C.pink, raw: RAW.pink },
  { text: "Employee birthdays and appreciation days", icon: Cake, color: C.brown, raw: RAW.brown },
  { text: "Office celebrations and client gifting", icon: Gift, color: C.pink, raw: RAW.pink },
  { text: "Coffee breaks and special occasions", icon: Coffee, color: C.brown, raw: RAW.brown },
];

const ORDER_DETAILS = [
  { key: "minimum", label: "Minimum Order", icon: Package },
  { key: "notice", label: "Advance Notice", icon: Clock },
  { key: "fulfillment", label: "Pickup", icon: MapPin },
];

function InquiryButton({ children }) {
  return (
    <a href={INQUIRY_ANCHOR} style={{ display: "inline-block", textDecoration: "none" }}>
      <ShimmerButton background="#FF69B4" shimmerColor="#FFD54F" shimmerSize="0.06em" borderRadius="14px" className="font-display text-base font-semibold px-9 py-4 shadow-lg oe-hover-btn">
        {children}
      </ShimmerButton>
    </a>
  );
}

function IconTile({ icon: Icon, color, raw }) {
  return (
    <div style={{ width: 56, height: 56, borderRadius: 14, background: raw + (color === C.brown ? "30" : "60"), display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color, flexShrink: 0 }}>
      <Icon size={28} strokeWidth={2} />
    </div>
  );
}

function Hero() {
  return (
    <section style={{ width: "100%", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 24px 70px", background: C.bg, position: "relative", overflow: "hidden" }}>
      <div className="hidden md:block absolute inset-0" style={{ zIndex: 0, opacity: 0.25 }}>
        <Particles className="absolute inset-0" quantity={20} color="#FF69B4" size={0.4} staticity={80} ease={80} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div className="order-2 md:order-1 text-center md:text-left">
          <BlurFade delay={0.1}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: "rgba(255,105,180,0.08)", color: C.pink, fontSize: 14, fontWeight: 600, fontFamily: F.d, textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
              <Briefcase size={16} strokeWidth={2.5} /> Office & Corporate Orders
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 style={{ fontFamily: F.d, fontSize: "clamp(34px, 4.5vw, 52px)", fontWeight: 500, color: C.ink, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
              Mini Cakes &amp; Treats for Your Team
            </h1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p style={{ fontFamily: F.b, fontSize: "clamp(17px, 2.2vw, 20px)", fontWeight: 400, color: C.sub, lineHeight: 1.6, margin: "0 0 36px" }}>
              Freshly baked treats for office meetings, team celebrations, employee appreciation and gifting.
            </p>
          </BlurFade>
          <BlurFade delay={0.4}>
            <div className="flex justify-center md:justify-start">
              <InquiryButton>Send an Inquiry</InquiryButton>
            </div>
          </BlurFade>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <BlurFade delay={0.2} yOffset={0} blur="8px">
            <div style={{ position: "relative", maxWidth: 420 }}>
              <span aria-hidden="true" style={{ position: "absolute", top: -12, left: -12, fontSize: 32, zIndex: 20, pointerEvents: "none", animation: "heroFloat 3s ease-in-out infinite" }}>✨</span>
              <span aria-hidden="true" style={{ position: "absolute", bottom: "10%", right: -16, fontSize: 28, zIndex: 20, pointerEvents: "none", animation: "heroFloat 4s ease-in-out infinite 1.5s" }}>💖</span>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 45px rgba(255,105,180,0.18), 0 20px 60px rgba(92,58,40,0.1)" }}>
                <Image
                  src="/images/IMG_7946.jpeg"
                  alt="Trays of Kake N Kream mini cakes with assorted frostings"
                  width={800}
                  height={1075}
                  priority
                  sizes="(max-width: 768px) 85vw, 420px"
                  className="max-h-[300px] md:max-h-[460px]"
                  style={{ width: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

function Occasions() {
  return (
    <section id="occasions" style={{ padding: "100px 24px", background: C.surfMint }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader eyebrow="Occasions" title="Perfect for your office" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {OCCASIONS.map((o, i) => (
            <BlurFade key={o.text} inView delay={0.1 + i * 0.08} className="h-full">
              <div style={{ height: "100%", padding: "30px 24px", borderRadius: 16, border: `2.5px solid ${C.brown}`, background: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconTile icon={o.icon} color={o.color} raw={o.raw} />
                <p style={{ fontSize: 16, color: C.ink, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{o.text}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderingDetails() {
  return (
    <section id="ordering-details" style={{ padding: "100px 24px", background: C.surfMint }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader eyebrow="Ordering" title="Ordering Details" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {ORDER_DETAILS.map((d, i) => (
            <BlurFade key={d.key} inView delay={0.1 + i * 0.08} className="h-full">
              <div style={{ height: "100%", padding: "32px 24px", borderRadius: 18, border: `3px solid ${C.brown}`, background: C.white, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <IconTile icon={d.icon} color={C.pink} raw={RAW.pink} />
                <h3 style={{ fontFamily: F.d, fontSize: 20, fontWeight: 600, color: C.brown, margin: "0 0 8px" }}>{d.label}</h3>
                <p style={{ fontSize: 16, color: C.sub, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{OFFICE_ORDER_INFO[d.key]}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section id="office-cta" style={{ padding: "100px 24px", background: C.surfRose }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <BlurFade inView delay={0.1}>
          <div style={{ padding: "44px 30px", borderRadius: 18, border: `3.5px solid ${C.pink}`, background: C.white, boxShadow: "0 6px 20px rgba(255,105,180,0.08)", textAlign: "center" }}>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 700, color: C.brown, margin: "0 0 12px" }}>Planning an office event?</h2>
            <p style={{ fontSize: 17, color: C.sub, lineHeight: 1.6, margin: "0 auto 28px", maxWidth: 520, fontWeight: 500 }}>
              Contact us to discuss your treat selections, quantities and advance ordering requirements.
            </p>
            <div className="flex justify-center">
              <InquiryButton>Send an Inquiry</InquiryButton>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

function PageStyles() {
  return (
    <style>{`
      .oe-hover-btn { transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1); }
      .oe-hover-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255, 105, 180, 0.25); }
      .oe-btn { transition: all 250ms ease; }
      .oe-btn:hover { filter: brightness(1.06); transform: translateY(-1px); }
      .oe-input { transition: border-color 0.2s, box-shadow 0.2s; }
      .oe-input:focus { border-color: ${C.pink} !important; box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.25) !important; outline: none; }
    `}</style>
  );
}

export default function OfficeEvents() {
  const { cart, openDrawer } = useCart();
  return (
    <div style={{ fontFamily: F.b, color: C.ink, background: C.bg, overflowX: "hidden", minHeight: "100vh" }}>
      <PageStyles />
      <SpotlightNav cart={cart} onCartClick={openDrawer} />
      <Hero />
      <AnimatedDivider variant="wave" />
      <Occasions />
      <AnimatedDivider variant="dots" />
      <OfficeProducts />
      <AnimatedDivider variant="wave" />
      <OrderingDetails />
      <AnimatedDivider variant="dots" />
      <ClosingCta />
      <AnimatedDivider variant="wave" />
      <OfficeInquiryForm orderInfo={OFFICE_ORDER_INFO} />
      <Footer />
    </div>
  );
}
