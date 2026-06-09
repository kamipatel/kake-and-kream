"use client";
import React from "react";
import Image from "next/image";
import logoFull from "@/app/logo.png";
import { Mail, Globe } from "lucide-react";

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

export function Footer() {
  return (
    <footer style={{ position: "relative", padding: "60px 24px 40px", textAlign: "center", background: "var(--color-brown)", color: "var(--color-cream)", overflow: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <Image
            src={logoFull}
            alt="Kake N Kream"
            width={240}
            height={240}
            sizes="90px"
            style={{ width: 90, height: "auto", display: "block", borderRadius: "50%" }}
          />
        </div>
        
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>Kake N Kream</h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-cream)", margin: "0 0 20px", fontWeight: 400, opacity: 0.85 }}>
          Handcrafted baked goods · St. Charles, MO
        </p>

        {/* Contact & Social Links */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginBottom: 24, fontFamily: "var(--font-body)", fontSize: 15 }}>
          <a href="https://instagram.com/kakenkream" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-cream)", textDecoration: "none", opacity: 0.9, transition: "opacity 0.2s" }} className="hover:opacity-100">
            <InstagramIcon size={18} style={{ color: "var(--color-primary)" }} />
            <span>@kakenkream</span>
          </a>
          <a href="https://facebook.com/kakenkream" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-cream)", textDecoration: "none", opacity: 0.9, transition: "opacity 0.2s" }} className="hover:opacity-100">
            <FacebookIcon size={18} style={{ color: "var(--color-primary)" }} />
            <span>/kakenkream</span>
          </a>
          <a href="mailto:hello@kakenkream.com" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-cream)", textDecoration: "none", opacity: 0.9, transition: "opacity 0.2s" }} className="hover:opacity-100">
            <Mail size={18} strokeWidth={2} style={{ color: "var(--color-primary)" }} />
            <span>hello@kakenkream.com</span>
          </a>
          <a href="https://www.kakenkream.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-cream)", textDecoration: "none", opacity: 0.9, transition: "opacity 0.2s" }} className="hover:opacity-100">
            <Globe size={18} strokeWidth={2} style={{ color: "var(--color-primary)" }} />
            <span>www.kakenkream.com</span>
          </a>
        </div>

        <div style={{ width: "100%", height: 1, background: "rgba(255, 250, 247, 0.15)", margin: "0 auto 20px" }} />

        <div style={{ fontSize: 13, color: "var(--color-cream)", fontWeight: 400, opacity: 0.7, fontFamily: "var(--font-body)" }}>
          &copy; {new Date().getFullYear()} Kake N Kream
        </div>
        <div style={{ fontSize: 12, color: "var(--color-cream)", marginTop: 8, fontWeight: 400, opacity: 0.55, fontFamily: "var(--font-body)" }}>
          Built by <a href="https://foundry-red.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Foundry</a>
        </div>
      </div>
    </footer>
  );
}
