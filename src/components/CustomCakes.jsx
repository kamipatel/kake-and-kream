"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoFull from "@/app/logo.png";
import logoIcon from "@/app/icon.png";
import {
  Globe, Mail, ChevronDown, Check, AlertTriangle, ChevronLeft,
  X, Calendar, Users, DollarSign, Clock, HelpCircle, FileText, Heart
} from "lucide-react";
import { SpotlightNav } from "@/components/ui/spotlight-nav";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import { AnimatedDivider } from "@/components/ui/animated-divider";
import { Footer } from "@/components/layout/Footer";

const InstagramIcon = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const C = {
  bg: "var(--color-bg)",
  white: "var(--color-surface)",
  cream: "var(--color-cream)",
  pink: "var(--color-primary)",
  coral: "var(--color-coral)",
  peach: "var(--color-peach)",
  yellow: "var(--color-yellow)",
  mint: "var(--color-mint)",
  sky: "var(--color-sky)",
  lavender: "var(--color-lavender)",
  brown: "var(--color-brown)",
  ink: "var(--color-ink)",
  sub: "var(--color-sub)",
  card: "var(--color-surface)",
  warm: "var(--color-surface-warm)",
  surfRose: "var(--color-surface-rose)",
  surfMint: "var(--color-surface-mint)",
  surfLav: "var(--color-surface-lavender)",
  secondary: "var(--color-secondary)",
  border: "var(--color-border)",
  muted: "var(--color-muted)",
};

const F = {
  d: "var(--font-display)",
  b: "var(--font-body)",
  a: "var(--font-accent)",
};

// All real photos from public/images to maximize visual impact
const ALL_PHOTOS = [
  // Birthday Cakes
  { src: "/images/IMG_7865.jpeg", category: "Birthday Cakes", alt: "Special occasion birthday cake" },
  { src: "/images/IMG_7868.jpeg", category: "Birthday Cakes", alt: "Gorgeous birthday cake" },
  { src: "/images/IMG_0829.jpeg", category: "Birthday Cakes", alt: "Custom birthday cake design" },
  { src: "/images/IMG_9959.jpeg", category: "Birthday Cakes", alt: "Detailed birthday celebration cake" },
  { src: "/images/2022-04-02_08-45-28_000 (2022-05-12T23_27_10.241).jpeg", category: "Birthday Cakes", alt: "Celebration birthday cake" },
  { src: "/images/2022-04-02_08-46-18_000 (2022-05-12T23_27_03.198).jpeg", category: "Birthday Cakes", alt: "Festive celebration cake" },
  { src: "/images/e2b93684-85b3-4a02-93de-ca2e5b769589.jpeg", category: "Birthday Cakes", alt: "Custom birthday cake with accents" },
  { src: "/images/FullSizeRender.jpeg", category: "Birthday Cakes", alt: "Special tall celebration cake" },
  { src: "/images/IMG_0113 4.jpeg", category: "Birthday Cakes", alt: "Decorated party cake" },
  
  // Kids Cakes
  { src: "/images/custom-pink-spiderman-cakes.jpeg", category: "Kids Cakes", alt: "Pink Spiderman cake" },
  { src: "/images/cake-yellow-rainbow.jpeg", category: "Kids Cakes", alt: "Yellow rainbow kids cake" },
  { src: "/images/IMG_3462.jpeg", category: "Kids Cakes", alt: "Fun kids birthday cake" },


  // Vintage Cakes
  { src: "/images/cake-mocha-bonbon.jpeg", category: "Vintage Cakes", alt: "Vintage mocha bonbon cake" },
  { src: "/images/cake-coconut-cherry.jpeg", category: "Vintage Cakes", alt: "Vintage coconut cherry cake" },
  { src: "/images/cake-almond-cherry.jpeg", category: "Vintage Cakes", alt: "Vintage almond cherry cake" },
  { src: "/images/2022-02-26_16-06-06_160.jpeg", category: "Vintage Cakes", alt: "Retro piped vintage cake" },
  { src: "/images/2022-04-01_12-08-16_032.jpeg", category: "Vintage Cakes", alt: "Elegant vintage lambeth cake" },
  { src: "/images/DSC_0044.jpeg", category: "Vintage Cakes", alt: "Classic styled vintage cake" },
  { src: "/images/IMG_1859.jpeg", category: "Vintage Cakes", alt: "Delicate piped details cake" },
  { src: "/images/IMG_5368.jpeg", category: "Vintage Cakes", alt: "Ornate vintage buttercream cake" },
  { src: "/images/bundt-glazed.jpeg", category: "Vintage Cakes", alt: "Perfectly glazed bundt cake" },
  { src: "/images/mini-cakes.jpg", category: "Vintage Cakes", alt: "Assorted vintage mini cakes" },

  // Minimal / Luxury Cakes
  { src: "/images/IMG_6384.jpeg", category: "Minimal / Luxury Cakes", alt: "Luxury minimalist cake" },
  { src: "/images/IMG_6389.jpeg", category: "Minimal / Luxury Cakes", alt: "Elegant luxury cake" },
  { src: "/images/IMG_6914.jpeg", category: "Minimal / Luxury Cakes", alt: "Sleek minimal cake" },
  { src: "/images/IMG_6915.jpg", category: "Minimal / Luxury Cakes", alt: "Modern luxury cake" },
  { src: "/images/IMG_7946.jpeg", category: "Minimal / Luxury Cakes", alt: "Sophisticated modern design" },
  { src: "/images/IMG_7947.jpeg", category: "Minimal / Luxury Cakes", alt: "Chic luxury celebration cake" },
  { src: "/images/cupcake-red-velvet-closeup.jpeg", category: "Minimal / Luxury Cakes", alt: "Artisanal red velvet cupcake" },
  { src: "/images/cupcake-red-velvet-display.jpeg", category: "Minimal / Luxury Cakes", alt: "Premium cupcake arrangement" },

  // Theme Cakes
  { src: "/images/2022-06-18_22-13-26_732.jpeg", category: "Theme Cakes", alt: "Jack Daniels themed cake" },
  { src: "/images/custom-graduation-longhorns.jpeg", category: "Theme Cakes", alt: "Graduation Longhorns cake" },
  { src: "/images/custom-graduation-longhorns-2.jpeg", category: "Theme Cakes", alt: "Graduation themed cake" },
  { src: "/images/2023-03-27_00-04-09_132.jpeg", category: "Theme Cakes", alt: "Specialty custom themed cake" },
  { src: "/images/sheet-cake.jpg", category: "Theme Cakes", alt: "Custom themed sheet cake" },

  // Tier Cakes
  { src: "/images/hero-pink-tiered-cake.jpeg", category: "Tier Cakes", alt: "Elegant pink tiered cake" },
  { src: "/images/IMG_6918.jpeg", category: "Tier Cakes", alt: "Multi-tiered celebration cake" },
  { src: "/images/IMG_6919.jpeg", category: "Tier Cakes", alt: "Stunning tiered wedding cake" },
  { src: "/images/hero-pink-drip-cake.jpeg", category: "Tier Cakes", alt: "Drip style tiered cake" }
];

export default function CustomCakes() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [servings, setServings] = useState("");
  const [themeColors, setThemeColors] = useState("");
  const [cakeFlavor, setCakeFlavor] = useState("Vanilla");
  const [filling, setFilling] = useState("Chocolate Ganache");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!eventDate) newErrors.eventDate = "Event date is required";
    if (!servings || servings <= 0) newErrors.servings = "Number of servings is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      _subject: `Custom Cake Inquiry from ${name}`,
      name,
      email,
      phone,
      eventDate,
      servings,
      themeColors,
      cakeFlavor,
      filling,
      budget,
      details,
      orderType: "Custom Cake Inquiry",
      _replyto: email
    };

    try {
      // 1. Submit to Formspree
      const formspreeRes = await fetch("https://formspree.io/f/mgopbwvv", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!formspreeRes.ok) {
        throw new Error("Formspree submission failed");
      }

      // 2. Submit to Google Sheets (fire-and-forget, like homepage)
      fetch("https://script.google.com/macros/s/AKfycbwgCGQoPo3QXuLX3iRxzdDwBTz06L7xMtnHmBMXT2ciSGLNSTuYbBGQRk_beixXVLYS/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      }).catch(err => console.error("Google Sheets error:", err));

      setSubmitted(true);
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setEventDate("");
      setServings("");
      setThemeColors("");
      setCakeFlavor("Vanilla");
      setFilling("Chocolate Ganache");
      setBudget("");
      setDetails("");
    } catch (err) {
      alert("Something went wrong with the submission. Please try again or message us directly on Instagram @kakenkream.");
    } finally {
      setSubmitting(false);
    }
  };

  const policies = [
    {
      title: "Order Notice Requirements",
      content: (
        <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
          <li><strong>Brownies & Bundt Cakes:</strong> 3 days notice</li>
          <li><strong>Cupcakes:</strong> 4 days notice</li>
          <li><strong>Mini Cakes:</strong> 4 days notice</li>
          <li><strong>Custom Celebration Cakes:</strong> 2 weeks (14 days) notice</li>
          <li style={{ marginTop: 8 }}>Orders are accepted on a first-come, first-served basis and are confirmed only after payment is received.</li>
        </ul>
      )
    },
    {
      title: "Rush Orders",
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p style={{ marginBottom: 8 }}>Rush orders are accepted only if schedule allows, with an additional fee. A rush order is any order placed with less than the minimum notice listed above.</p>
          <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: 0 }}>
            <li><strong>Menu Items (Brownies, Bundt, Cupcakes, Mini Cakes):</strong> Rush fee is 15% of order total (minimum $10–$15 depending on order size).</li>
            <li><strong>Custom Celebration Cakes:</strong> Rush fee is 20–30% of order total.</li>
            <li>Availability depends on design complexity and schedule.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Payment Policy",
      content: (
        <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
          <li>Orders are only confirmed once payment is received.</li>
          <li><strong>Menu Items:</strong> Full payment required at time of ordering. Non-refundable once payment is received and confirmed.</li>
          <li><strong>Custom Celebration Cakes:</strong> 50% non-refundable deposit required to reserve date. Remaining 50% due 3 days before pickup.</li>
        </ul>
      )
    },
    {
      title: "Refund Policy",
      content: (
        <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
          <li>Due to the custom and perishable nature of our products:</li>
          <li>Menu Items are non-refundable once payment is received and the order is confirmed.</li>
          <li>Custom cake deposits (50%) are non-refundable as they reserve your date and preparation time.</li>
        </ul>
      )
    },
    {
      title: "Changes & Cancellations",
      content: (
        <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
          <li>Changes to design or details are not guaranteed within 48–72 hours of pickup.</li>
          <li>Cancellations after payment are not eligible for refund.</li>
        </ul>
      )
    },
    {
      title: "Pickup Only",
      content: (
        <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
          <li>All orders are pickup only.</li>
          <li>Pickup details and address in St. Charles will be shared once the order is confirmed.</li>
        </ul>
      )
    }
  ];

  const faqs = [
    {
      q: "How far ahead should I order?",
      a: "At least 2 weeks (14 days) notice for custom cakes. See our full policy for other items."
    },
    {
      q: "Do you make eggless cakes?",
      a: "No, our cakes contain eggs."
    },
    {
      q: "Can I send inspiration photos?",
      a: "Yes! Share your ideas through the inquiry form, or send inspiration photos directly to our Instagram @kakenkream or email us."
    },
    {
      q: "Do you deliver?",
      a: "No, all orders are pickup only in St. Charles."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Venmo and Zelle."
    }
  ];

  return (
    <div style={{ fontFamily: F.b, color: C.ink, background: C.bg, overflowX: "hidden", minHeight: "100vh" }}>
      
      {/* Styles Injection for transitions and classes */}
      <style>{`
        .cc-hover-btn {
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cc-hover-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.25);
        }
        .cc-input {
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cc-input:focus {
          border-color: ${C.pink} !important;
          box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.25) !important;
          outline: none;
        }
        .gallery-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(92, 58, 40, 0.12);
        }
      `}</style>

      {/* Nav */}
      <SpotlightNav cart={[]} onCartClick={() => {}} />

      {/* 1. Hero Section */}
      <section style={{ width: "100vw", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 24px 70px", background: C.bg, position: "relative", overflow: "hidden" }}>
        
        {/* Particles background */}
        <div className="hidden md:block absolute inset-0" style={{ zIndex: 0, opacity: 0.25 }}>
          <Particles className="absolute inset-0" quantity={20} color="#FF69B4" size={0.4} staticity={80} ease={80} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          
          {/* Left Column: Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <BlurFade delay={0.1}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: "rgba(255,105,180,0.08)", color: C.pink, fontSize: 14, fontWeight: 600, fontFamily: F.d, textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
                <Heart size={16} fill={C.pink} /> Custom Designs
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <h1 id="hero-heading" style={{ fontFamily: F.d, fontSize: "clamp(34px, 4.5vw, 52px)", fontWeight: 500, color: C.ink, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
                Custom Cakes for Birthdays, Baby Showers & Special Celebrations
              </h1>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p style={{ fontFamily: F.b, fontSize: "clamp(17px, 2.2vw, 20px)", fontWeight: 400, color: C.sub, lineHeight: 1.6, margin: "0 0 36px" }}>
                Handmade in St. Charles with fresh ingredients and elegant designs.
              </p>
            </BlurFade>

            {/* CTA + Social Row */}
            <BlurFade delay={0.4}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", md: { alignItems: "flex-start" } }} className="items-center md:items-start">
                <a href="#inquiry-form" style={{ textDecoration: "none" }}>
                  <ShimmerButton
                    background={C.pink}
                    shimmerColor={C.yellow}
                    shimmerSize="0.06em"
                    borderRadius="14px"
                    className="font-display text-base font-semibold px-9 py-4 shadow-lg cc-hover-btn"
                  >
                    Order Inquiry
                  </ShimmerButton>
                </a>

                {/* Social links row */}
                <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 12 }}>
                  <a href="https://instagram.com/kakenkream" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: "50%", background: C.white, border: `2px solid ${C.border}`, color: C.pink, transition: "all 0.2s" }} className="hover:scale-105">
                    <InstagramIcon size={20} />
                  </a>
                  <a href="https://facebook.com/kakenkream" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: "50%", background: C.white, border: `2px solid ${C.border}`, color: C.pink, transition: "all 0.2s" }} className="hover:scale-105">
                    <FacebookIcon size={20} />
                  </a>
                  <a href="https://www.kakenkream.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: "50%", background: C.white, border: `2px solid ${C.border}`, color: C.pink, transition: "all 0.2s" }} className="hover:scale-105">
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Hero Cake Photo */}
          <div className="order-1 md:order-2 flex justify-center">
            <BlurFade delay={0.2} yOffset={0} blur="8px">
              <div style={{ position: "relative", maxWidth: 420 }}>
                {/* Floating decor */}
                <span style={{ position: "absolute", top: -12, left: -12, fontSize: 32, zIndex: 20, pointerEvents: "none", animation: "heroFloat 3s ease-in-out infinite" }}>✨</span>
                <span style={{ position: "absolute", bottom: "10%", right: -16, fontSize: 28, zIndex: 20, pointerEvents: "none", animation: "heroFloat 4s ease-in-out infinite 1.5s" }}>💖</span>
                
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 45px rgba(255,105,180,0.18), 0 20px 60px rgba(92,58,40,0.1)" }}>
                  <Image
                    src="/images/hero-pink-drip-cake.jpeg"
                    alt="Elegant Custom Celebration Cake"
                    width={800}
                    height={1000}
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

      <AnimatedDivider variant="wave" />

      {/* 2. Cake Gallery */}
      <section id="gallery" style={{ padding: "100px 24px", background: C.surfRose }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Portfolio</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 42px)", fontWeight: 700, textAlign: "center", margin: "0 0 12px", color: C.brown }}>Our Cake Gallery</h2>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 36px" }} />
          </BlurFade>

          {/* Photos Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {ALL_PHOTOS.map((photo, index) => (
              <BlurFade key={photo.src} delay={0.1 + index * 0.05} inView>
                <div
                  className="gallery-card"
                  style={{ borderRadius: 16, overflow: "hidden", background: C.white, border: `2.5px solid ${C.border}`, cursor: "pointer" }}
                  onClick={() => setLightboxImg(photo)}
                >
                  <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

        </div>
      </section>

      <AnimatedDivider variant="dots" />

      {/* 3. Flavors & Fillings Section */}
      <section id="flavors" style={{ padding: "100px 24px", background: C.surfMint }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Delicious Options</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 42px)", fontWeight: 700, textAlign: "center", margin: "0 0 12px", color: C.brown }}>Flavors & Fillings</h2>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 40px" }} />
          </BlurFade>

          {/* Cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: 36 }}>
            {/* Cake Flavors */}
            <BlurFade inView delay={0.15}>
              <div style={{ padding: "36px 30px", borderRadius: 18, border: `3.5px solid ${C.pink}`, background: C.white }}>
                <h3 style={{ fontFamily: F.d, fontSize: 24, fontWeight: 600, color: C.pink, marginBottom: 20, textAlign: "center" }}>Cake Flavors</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Funfetti"].map(flavor => (
                    <div key={flavor} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 17, fontWeight: 500 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(255,105,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.pink }}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span>{flavor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Fillings */}
            <BlurFade inView delay={0.2}>
              <div style={{ padding: "36px 30px", borderRadius: 18, border: `3.5px solid ${C.brown}`, background: C.white }}>
                <h3 style={{ fontFamily: F.d, fontSize: 24, fontWeight: 600, color: C.brown, marginBottom: 20, textAlign: "center" }}>Fillings</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {["Chocolate Ganache", "Oreo Cream", "Strawberry Compote", "Biscoff", "Cream Cheese Frosting"].map(filling => (
                    <div key={filling} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 17, fontWeight: 500 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(92,58,40,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.brown }}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span>{filling}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>

          <BlurFade inView delay={0.25}>
            <p style={{ textAlign: "center", fontSize: 16, color: C.sub, lineHeight: 1.6, maxWidth: 640, margin: "0 auto", fontWeight: 500 }}>
              Customize your cake with your choice of cake flavor, filling, and frosting to create a design tailored to your event.
            </p>
          </BlurFade>

        </div>
      </section>

      <AnimatedDivider variant="wave" />

      {/* 4. Cake Sizes & Starting Prices */}
      <section id="pricing" style={{ padding: "100px 24px", background: C.surfLav }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Pricing</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 42px)", fontWeight: 700, textAlign: "center", margin: "0 0 8px", color: C.brown }}>Cake Sizes & Starting Prices</h2>
            <p style={{ fontFamily: F.b, fontSize: 17, color: C.sub, textAlign: "center", marginBottom: 12, fontWeight: 500 }}>All cakes are made fresh to order.</p>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 40px" }} />
          </BlurFade>

          {/* Pricing cards instead of raw table */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            {[
              { size: "6-inch tall cake", desc: "3 layers, serves 10–12", price: "$75+" },
              { size: "8-inch tall cake", desc: "3 layers, serves 18–20", price: "$95+" },
              { size: "Custom tiered cakes", desc: "Events", price: "Quote on request" }
            ].map((item, idx) => (
              <BlurFade key={idx} inView delay={0.1 + idx * 0.05}>
                <div style={{ display: "flex", flexDirection: "column", md: { flexDirection: "row" }, justifyContent: "space-between", alignItems: "center", padding: "24px 30px", borderRadius: 16, border: `2.5px solid ${C.border}`, background: C.white, gap: 16 }} className="flex-col md:flex-row text-center md:text-left">
                  <div>
                    <h3 style={{ fontFamily: F.d, fontSize: 20, fontWeight: 600, color: C.brown, marginBottom: 4 }}>{item.size}</h3>
                    <p style={{ fontSize: 15, color: C.sub, margin: 0, fontWeight: 500 }}>{item.desc}</p>
                  </div>
                  <div style={{ fontFamily: F.d, fontSize: 24, fontWeight: 700, color: C.pink, padding: "8px 20px", borderRadius: 12, background: "rgba(255,105,180,0.08)", minWidth: 140, textAlign: "center" }}>
                    {item.price}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade inView delay={0.25}>
            <p style={{ textAlign: "center", fontSize: 15, color: C.muted, fontWeight: 500, fontStyle: "italic" }}>
              Final pricing depends on design complexity, florals, toppers, and custom details.
            </p>
          </BlurFade>

        </div>
      </section>

      <AnimatedDivider variant="dots" />

      {/* 5. How to Order */}
      <section id="how-to-order" style={{ padding: "100px 24px", background: C.surfMint }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Process</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 42px)", fontWeight: 700, textAlign: "center", margin: "0 0 8px", color: C.brown }}>How to Order</h2>
            <p style={{ fontFamily: F.b, fontSize: 17, color: C.sub, textAlign: "center", marginBottom: 12, fontWeight: 500 }}>We make the ordering process simple and personalized:</p>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 40px" }} />
          </BlurFade>

          {/* Numbered Steps Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { step: 1, text: "Submit your cake inquiry form below" },
              { step: 2, text: "Share your date, theme, and inspiration photos" },
              { step: 3, text: "Receive a custom design quote" },
              { step: 4, text: "Confirm with a deposit to reserve your date" },
              { step: 5, text: "Enjoy pickup of your fresh custom cake in St. Charles" }
            ].map((item, idx) => (
              <BlurFade key={idx} inView delay={0.1 + idx * 0.05}>
                <div style={{ height: "100%", padding: "30px 24px", borderRadius: 16, border: `2.5px solid ${C.brown}`, background: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.pink, color: C.white, fontFamily: F.d, fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    {item.step}
                  </div>
                  <p style={{ fontSize: 15, color: C.ink, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{item.text}</p>
                </div>
              </BlurFade>
            ))}
          </div>

        </div>
      </section>

      <AnimatedDivider variant="wave" />

      {/* 6. Important Information */}
      <section id="important-info" style={{ padding: "100px 24px", background: C.surfRose }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <div style={{ padding: "36px 30px", borderRadius: 18, border: `3.5px solid ${C.pink}`, background: C.white, boxShadow: "0 6px 20px rgba(255,105,180,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, color: C.pink }}>
                <AlertTriangle size={28} strokeWidth={2.5} />
                <h2 style={{ fontFamily: F.d, fontSize: 24, fontWeight: 700, margin: 0 }}>Important Information</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Please place orders at least 14 days in advance",
                  "Custom cakes require a non-refundable deposit to secure your date",
                  "All cakes are made to order",
                  "We currently offer pickup in St. Charles",
                  "Cakes may contain allergens including dairy, eggs, wheat, and nuts"
                ].map((info, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 16, fontWeight: 500, color: C.ink }}>
                    <div style={{ minWidth: 20, height: 20, borderRadius: "50%", background: "rgba(255,105,180,0.12)", color: C.pink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, marginTop: 2 }}>
                      ✓
                    </div>
                    <span>{info}</span>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

        </div>
      </section>

      <AnimatedDivider variant="dots" />

      {/* 7. KakenKream Policy (Accordion) */}
      <section id="policy" style={{ padding: "100px 24px", background: C.surfLav }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Policies</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 40px)", fontWeight: 700, textAlign: "center", margin: "0 0 12px", color: C.brown }}>Kake N Kream Policy</h2>
            <p style={{ fontFamily: F.b, fontSize: 16, color: C.sub, textAlign: "center", marginBottom: 32, lineHeight: 1.6, fontWeight: 500 }}>
              At Kake N Kream, every dessert is freshly made to order with care, attention to detail, and quality ingredients. To ensure smooth scheduling and consistent quality, please review our policy below.
            </p>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 36px" }} />
          </BlurFade>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {policies.map((p, i) => {
              const isOpen = openPolicy === i;
              return (
                <BlurFade key={i} delay={i * 0.05} inView>
                  <div style={{ borderRadius: 16, border: isOpen ? `2px solid ${C.pink}` : `1px solid rgba(0,0,0,0.08)`, overflow: "hidden", background: C.white, transition: "all 300ms ease", boxShadow: isOpen ? "0 4px 16px rgba(255,105,180,0.12)" : "0 2px 8px rgba(0,0,0,0.03)" }}>
                    <button
                      aria-expanded={isOpen}
                      onClick={() => setOpenPolicy(isOpen ? null : i)}
                      style={{
                        width: "100%", padding: "20px 24px", background: "none", border: "none",
                        cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between",
                        alignItems: "center", fontFamily: F.d, fontSize: 17, fontWeight: 600, color: isOpen ? C.pink : C.brown,
                        transition: "color 300ms ease",
                      }}
                    >
                      {p.title}
                      <ChevronDown size={20} strokeWidth={2.5} style={{ color: isOpen ? C.pink : C.sub, transition: "transform 300ms ease", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }} />
                    </button>
                    <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}>
                      <div style={{ padding: "0 24px 24px", fontSize: 15, color: C.sub, lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                        {p.content}
                      </div>
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>

        </div>
      </section>

      <AnimatedDivider variant="wave" />

      {/* 8. Inquiry Form */}
      <section id="inquiry-form" style={{ padding: "100px 24px", background: C.surfMint }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Inquiry</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 40px)", fontWeight: 700, textAlign: "center", margin: "0 0 12px", color: C.brown }}>Request a Custom Cake</h2>
            <p style={{ fontFamily: F.b, fontSize: 16, color: C.sub, textAlign: "center", marginBottom: 36, lineHeight: 1.6, fontWeight: 500 }}>
              Have questions before placing an order? Feel free to reach out — we&apos;re happy to help with design ideas, pricing, or availability.
            </p>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 40px" }} />
          </BlurFade>

          {submitted ? (
            <BlurFade>
              <div style={{ padding: "40px 30px", borderRadius: 18, border: `3px solid ${C.pink}`, background: C.white, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,105,180,0.12)", color: C.pink, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 style={{ fontFamily: F.d, fontSize: 24, fontWeight: 700, color: C.brown, marginBottom: 8 }}>Thank you!</h3>
                <p style={{ fontSize: 16, color: C.sub, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  We&apos;ll respond with availability and a custom quote.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 24,
                    padding: "10px 20px",
                    borderRadius: 12,
                    border: `2px solid ${C.pink}`,
                    background: C.white,
                    color: C.pink,
                    fontFamily: F.d,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            </BlurFade>
          ) : (
            <BlurFade inView delay={0.15}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20, background: C.white, padding: "36px 30px", borderRadius: 18, border: `3px solid ${C.border}`, boxShadow: "0 6px 20px rgba(0,0,0,0.02)" }}>
                
                <input type="hidden" name="orderType" value="Custom Cake Inquiry" />

                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Name <span style={{ color: C.coral }}>*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${errors.name ? C.coral : C.border}`, fontFamily: F.b, fontSize: 16 }}
                    className="cc-input"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p style={{ color: C.coral, fontSize: 13, marginTop: 4, fontWeight: 500 }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Email <span style={{ color: C.coral }}>*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${errors.email ? C.coral : C.border}`, fontFamily: F.b, fontSize: 16 }}
                    className="cc-input"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p style={{ color: C.coral, fontSize: 13, marginTop: 4, fontWeight: 500 }}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Phone <span style={{ fontSize: 12, opacity: 0.7 }}>(optional)</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${C.border}`, fontFamily: F.b, fontSize: 16 }}
                    className="cc-input"
                    placeholder="(636) 555-1234"
                  />
                </div>

                {/* Event Date & Servings */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Event Date <span style={{ color: C.coral }}>*</span></label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={e => { setEventDate(e.target.value); if (errors.eventDate) setErrors(p => ({ ...p, eventDate: undefined })); }}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `2px solid ${errors.eventDate ? C.coral : C.border}`, fontFamily: F.b, fontSize: 16, height: 52 }}
                      className="cc-input"
                    />
                    {errors.eventDate && <p style={{ color: C.coral, fontSize: 13, marginTop: 4, fontWeight: 500 }}>{errors.eventDate}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Servings <span style={{ color: C.coral }}>*</span></label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={servings}
                      onChange={e => { setServings(e.target.value); if (errors.servings) setErrors(p => ({ ...p, servings: undefined })); }}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `2px solid ${errors.servings ? C.coral : C.border}`, fontFamily: F.b, fontSize: 16, height: 52 }}
                      className="cc-input"
                      placeholder="e.g. 15"
                    />
                    {errors.servings && <p style={{ color: C.coral, fontSize: 13, marginTop: 4, fontWeight: 500 }}>{errors.servings}</p>}
                  </div>
                </div>

                {/* Theme / Colors */}
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Theme / Colors <span style={{ fontSize: 12, opacity: 0.7 }}>(optional)</span></label>
                  <input
                    type="text"
                    value={themeColors}
                    onChange={e => setThemeColors(e.target.value)}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${C.border}`, fontFamily: F.b, fontSize: 16 }}
                    className="cc-input"
                    placeholder="e.g. Pastel Pink & Gold, Spiderman"
                  />
                </div>

                {/* Flavor & Filling Dropdowns */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Cake Flavor</label>
                    <select
                      value={cakeFlavor}
                      onChange={e => setCakeFlavor(e.target.value)}
                      style={{
                        width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${C.border}`, fontFamily: F.b, fontSize: 16,
                        appearance: "none", WebkitAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235C5652' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
                        backgroundSize: "16px", cursor: "pointer",
                      }}
                      className="cc-input"
                    >
                      {["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Funfetti"].map(fl => <option key={fl} value={fl}>{fl}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Filling</label>
                    <select
                      value={filling}
                      onChange={e => setFilling(e.target.value)}
                      style={{
                        width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${C.border}`, fontFamily: F.b, fontSize: 16,
                        appearance: "none", WebkitAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235C5652' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
                        backgroundSize: "16px", cursor: "pointer",
                      }}
                      className="cc-input"
                    >
                      {["Chocolate Ganache", "Oreo Cream", "Strawberry Compote", "Biscoff", "Cream Cheese Frosting"].map(fi => <option key={fi} value={fi}>{fi}</option>)}
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Budget <span style={{ fontSize: 12, opacity: 0.7 }}>(optional)</span></label>
                  <input
                    type="text"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${C.border}`, fontFamily: F.b, fontSize: 16 }}
                    className="cc-input"
                    placeholder="e.g. $100-$150"
                  />
                </div>

                {/* Additional Details */}
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Additional Details <span style={{ fontSize: 12, opacity: 0.7 }}>(optional)</span></label>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${C.border}`, fontFamily: F.b, fontSize: 16, resize: "vertical" }}
                    className="cc-input"
                    placeholder="Describe your vision, toppers, florals, or specific design details..."
                  />
                </div>

                {/* Inspiration Photos Note */}
                <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,105,180,0.05)", border: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <InfoIcon size={18} style={{ color: C.pink, marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: C.sub, margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                    <strong>Inspiration Photos:</strong> Send inspiration photos to our Instagram <a href="https://instagram.com/kakenkream" target="_blank" rel="noopener noreferrer" style={{ color: C.pink, fontWeight: 600 }}>@kakenkream</a> or email us.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: 14,
                    border: "none",
                    background: C.pink,
                    color: "white",
                    fontFamily: F.d,
                    fontSize: 17,
                    fontWeight: 600,
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: `0 6px 20px rgba(255,105,180,0.25)`,
                    transition: "all 0.2s",
                    opacity: submitting ? 0.8 : 1,
                  }}
                  className="cc-hover-btn"
                >
                  {submitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                </button>
              </form>
            </BlurFade>
          )}

        </div>
      </section>

      <AnimatedDivider variant="wave" />

      {/* 9. Testimonials */}
      <section id="testimonials" style={{ padding: "100px 24px", background: C.surfRose }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Reviews</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 40px)", fontWeight: 700, textAlign: "center", margin: "0 0 12px", color: C.brown }}>What Our Customers Say</h2>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 40px" }} />
          </BlurFade>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { text: "The cake looked stunning and tasted amazing!", author: "Happy Customer", color: C.surfMint, border: C.pink },
              { text: "Perfect for my daughter's birthday!", author: "Satisfied Parent", color: C.surfLav, border: C.brown },
              { text: "Beautiful design and so delicious. Will order again!", author: "Repeat Customer", color: C.surfMint, border: C.pink }
            ].map((t, idx) => (
              <BlurFade key={idx} inView delay={0.1 + idx * 0.08} className="h-full">
                <div style={{ height: "100%", padding: "30px", borderRadius: 16, border: `2.5px solid ${t.border}`, background: t.color, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <p style={{ fontStyle: "italic", fontSize: 16, color: C.ink, lineHeight: 1.5, margin: "0 0 16px", fontWeight: 500 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.brown }}>&mdash; {t.author}</span>
                </div>
              </BlurFade>
            ))}
          </div>

        </div>
      </section>

      <AnimatedDivider variant="dots" />

      {/* 10. FAQ Section */}
      <section id="faq" style={{ padding: "100px 24px", background: C.surfLav }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          
          <BlurFade inView delay={0.1}>
            <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>Help</p>
            <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 40px)", fontWeight: 700, textAlign: "center", margin: "0 0 12px", color: C.brown }}>Frequently Asked Questions</h2>
            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 36px" }} />
          </BlurFade>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <BlurFade key={i} delay={i * 0.05} inView>
                  <div style={{ borderRadius: 16, border: isOpen ? `2px solid ${C.pink}` : `1px solid rgba(0,0,0,0.08)`, overflow: "hidden", background: C.white, transition: "all 300ms ease", boxShadow: isOpen ? "0 4px 16px rgba(255,105,180,0.12)" : "0 2px 8px rgba(0,0,0,0.03)" }}>
                    <button
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{
                        width: "100%", padding: "20px 24px", background: "none", border: "none",
                        cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between",
                        alignItems: "center", fontFamily: F.d, fontSize: 17, fontWeight: 600, color: isOpen ? C.pink : C.brown,
                        transition: "color 300ms ease",
                      }}
                    >
                      {f.q}
                      <ChevronDown size={20} strokeWidth={2.5} style={{ color: isOpen ? C.pink : C.sub, transition: "transform 300ms ease", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }} />
                    </button>
                    <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}>
                      <p style={{ padding: "0 24px 24px", fontSize: 15, color: C.sub, lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>

        </div>
      </section>

      <AnimatedDivider variant="wave" />

      {/* 11. KakenKream Promise */}
      <section id="promise" style={{ padding: "100px 24px", background: C.surfMint, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <BlurFade inView delay={0.1}>
            <div style={{ display: "inline-flex", width: 56, height: 56, borderRadius: "50%", background: "rgba(255,105,180,0.08)", color: C.pink, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Heart size={28} fill={C.pink} />
            </div>
            <h3 style={{ fontFamily: F.d, fontSize: 26, fontWeight: 700, color: C.brown, marginBottom: 16 }}>Our Promise</h3>
            <p style={{ fontSize: 17, color: C.sub, lineHeight: 1.7, marginBottom: 24, fontWeight: 500 }}>
              &ldquo;Every cake is created with care, quality ingredients, and attention to detail. Our goal is to make your celebration feel special &mdash; not just with taste, but with a design that tells your story.&rdquo;
            </p>
            <p style={{ fontSize: 16, color: C.brown, fontWeight: 600, marginBottom: 12 }}>
              Thank you for supporting Kake N Kream. Every dessert is handcrafted with care, creativity, and attention to detail. We truly appreciate your trust.
            </p>
            <p style={{ fontSize: 14, color: C.muted, fontWeight: 500, fontStyle: "italic", margin: 0 }}>
              We will respond with availability and a custom quote.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Lightbox / Modal */}
      {lightboxImg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", animation: "fadeIn 200ms ease" }} onClick={() => setLightboxImg(null)}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <div style={{ position: "relative", maxWidth: "min(680px, 94vw)", maxHeight: "90vh", borderRadius: 16, overflow: "hidden", border: `3px solid ${C.white}`, background: C.white }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImg(null)}
              style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "rgba(0,0,0,0.5)", border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}
              className="hover:scale-105"
            >
              <X size={20} />
            </button>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", display: "block" }}
            />
            <div style={{ padding: "16px 20px", background: C.white, textAlign: "center" }}>
              <p style={{ fontFamily: F.d, fontSize: 16, fontWeight: 600, color: C.brown, margin: 0 }}>{lightboxImg.category} &mdash; {lightboxImg.alt}</p>
            </div>
          </div>
        </div>
      )}

      {/* 12. Quick Contact Buttons (visible on scroll) */}
      {scrolled && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 90, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
          <a
            href="https://instagram.com/kakenkream"
            target="_blank"
            rel="noopener noreferrer"
            className="kk-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: C.pink,
              color: "white",
              padding: "12px 20px",
              borderRadius: 30,
              fontFamily: F.d,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 250ms ease",
            }}
          >
            <InstagramIcon size={18} />
            <span>Chat on Instagram</span>
          </a>
          <a
            href="mailto:hello@kakenkream.com"
            className="kk-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--color-brown)",
              color: "white",
              padding: "12px 20px",
              borderRadius: 30,
              fontFamily: F.d,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 250ms ease",
            }}
          >
            <Mail size={18} />
            <span>Quick Question?</span>
          </a>
        </div>
      )}

    </div>
  );
}

// Inline SVG helper component for Lucide Info icon
function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
