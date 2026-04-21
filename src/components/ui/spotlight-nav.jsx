"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoFull from "@/app/logo.png";
import logoIcon from "@/app/icon.png";
import { Cake, User, HelpCircle, ShoppingCart } from "lucide-react";

const NavItem = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  indicatorPosition,
  position,
}) => {
  const distance = Math.abs(indicatorPosition - position);
  const spotlightOpacity = isActive ? 1 : Math.max(0, 1 - distance * 0.6);

  return (
    <button
      className="relative flex flex-col items-center justify-center px-5 py-2.5 mx-1 transition-all duration-400 group md:px-5 md:py-2.5 px-3 py-1.5"
      onClick={onClick}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-24 rounded-full blur-lg transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,105,180,0.5), transparent)",
          opacity: spotlightOpacity,
          transitionDelay: isActive ? "0.1s" : "0s",
        }}
      />
      <Icon
        className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-200 ${
          isActive
            ? "text-white"
            : "text-[#FFFAF7]/60 group-hover:text-[#FFFAF7]/90"
        }`}
        strokeWidth={isActive ? 2.5 : 2}
      />
      <span
        className={`text-[9px] md:text-[11px] mt-0.5 md:mt-1 font-medium transition-colors duration-200 ${
          isActive
            ? "text-white"
            : "text-[#FFFAF7]/60 group-hover:text-[#FFFAF7]/90"
        }`}
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        {label}
      </span>
    </button>
  );
};

export function SpotlightNav({ cart, onCartClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visible = true;

  const navItems = [
    { icon: Cake, label: "Menu", href: "#menu" },
    { icon: User, label: "About", href: "#about" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
  ];

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

  // Width per item: ~56px on mobile, ~72px on desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const itemWidth = isMobile ? 56 : 72;
  const logoWidth = isMobile ? 44 : 164;
  const indicatorLeft = logoWidth + activeIndex * itemWidth + (isMobile ? 8 : 12);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : -20}px)`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="relative flex items-center px-2 py-1 md:px-3 md:py-1.5 rounded-2xl shadow-xl border backdrop-blur-md"
        style={{
          background: "rgba(92,58,40,0.92)",
          borderColor: "rgba(255,105,180,0.25)",
          boxShadow: "0 8px 32px rgba(92,58,40,0.4), 0 0 0 1px rgba(255,105,180,0.1)",
        }}
      >
        {/* Sliding indicator line */}
        <div
          className="absolute top-0 h-[2px] rounded-full transition-all duration-400 ease-in-out"
          style={{
            left: `${indicatorLeft}px`,
            width: `${itemWidth - 8}px`,
            background: "linear-gradient(90deg, transparent, #FF69B4, transparent)",
            transform: "translateY(-1px)",
          }}
        />

        {/* Logo */}
        <div className="flex items-center px-1.5 md:px-2.5">
          <Image
            src={logoIcon}
            alt="Kake N Kream"
            width={36}
            height={36}
            className="block md:hidden w-7 h-7 rounded"
          />
          <Image
            src={logoFull}
            alt="Kake N Kream"
            width={140}
            height={79}
            className="hidden md:block rounded"
            style={{ width: 140, height: "auto" }}
          />
        </div>

        {navItems.map((item, index) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeIndex === index}
            onClick={() => handleClick(index, item.href)}
            indicatorPosition={activeIndex}
            position={index}
          />
        ))}

        {/* Cart button */}
        <button
          onClick={onCartClick}
          className="relative flex flex-col items-center justify-center px-3 py-1.5 md:px-5 md:py-2.5 mx-1 transition-all duration-200 group"
        >
          <div className="relative">
            <ShoppingCart
              className="w-4 h-4 md:w-5 md:h-5 text-[#FFFAF7]/60 group-hover:text-[#FF69B4] transition-colors duration-200"
              strokeWidth={2}
            />
            {cart.length > 0 && (
              <span
                className="absolute -top-1.5 -right-2 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: "#FF69B4", color: "#fff" }}
              >
                {cart.length}
              </span>
            )}
          </div>
          <span
            className="text-[9px] md:text-[11px] mt-0.5 md:mt-1 font-medium text-[#FFFAF7]/60 group-hover:text-[#FF69B4] transition-colors duration-200"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
}
