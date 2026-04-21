"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoFull from "@/app/logo.png";
import logoIcon from "@/app/icon.png";
import { ShoppingCart } from "lucide-react";

const NavItem = ({
  label,
  isActive = false,
  onClick,
  scrolled,
}) => {
  return (
    <button
      className={`relative px-4 py-1.5 mx-0.5 md:mx-1 transition-all duration-300 rounded-full text-sm font-medium ${
        isActive
          ? (scrolled ? "text-[#FFFAF7] bg-[#FFFAF7]/10" : "text-[#5C3A28] bg-[#5C3A28]/5")
          : (scrolled ? "text-[#FFFAF7]/70 hover:text-[#FFFAF7]" : "text-[#5C3A28]/70 hover:text-[#5C3A28]")
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export function SpotlightNav({ cart, onCartClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const visible = true;

  const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const observers = [];
    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (index, href) => {
    setActiveIndex(index);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-4 w-full z-[100] transition-all duration-300 px-4 md:px-8 pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : -20}px)`,
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        <div 
          className="flex items-center transition-all duration-300 p-2 rounded-2xl"
          style={{
            background: scrolled ? "rgba(92,58,40,0.95)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          }}
        >
          {/* Logo */}
          <div className="flex items-center px-2 mr-4 md:mr-8 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:"smooth"})}>
            <Image
              src={logoIcon}
              alt="Kake N Kream"
              width={40}
              height={40}
              className={`block md:hidden rounded transition-all duration-300 ${scrolled ? "filter brightness-0 invert" : ""}`}
            />
            <Image
              src={logoFull}
              alt="Kake N Kream"
              width={140}
              height={79}
              className={`hidden md:block rounded transition-all duration-300 ${scrolled ? "filter brightness-0 invert" : ""}`}
              style={{ width: "auto", height: 40 }}
            />
          </div>

          <div className="flex items-center">
            {navItems.map((item, index) => (
              <NavItem
                key={item.label}
                label={item.label}
                isActive={activeIndex === index}
                onClick={() => handleClick(index, item.href)}
                scrolled={scrolled}
              />
            ))}
          </div>

          {/* Cart button */}
          <button
            onClick={onCartClick}
            className={`relative flex items-center ml-2 md:ml-4 px-4 py-2 rounded-full transition-all duration-300 group ${
              scrolled 
                ? "bg-[#FF69B4] text-white hover:bg-[#FF4DA6]" 
                : "bg-[#FF69B4] text-white hover:bg-[#FF4DA6] shadow-lg"
            }`}
          >
            <ShoppingCart className="w-4 h-4 md:w-4 md:h-4 mr-2" strokeWidth={2.5} />
            <span className="text-sm font-semibold truncate max-w-[60px] md:max-w-none">
              Cart {cart.length > 0 && `(${cart.length})`}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
