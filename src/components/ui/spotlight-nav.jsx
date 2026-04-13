"use client";
import React, { useState, useEffect } from "react";
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
      className="relative flex flex-col items-center justify-center px-5 py-2.5 mx-1 transition-all duration-400 group"
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
        className={`w-5 h-5 transition-colors duration-200 ${
          isActive
            ? "text-white"
            : "text-[#FFFAF7]/60 group-hover:text-[#FFFAF7]/90"
        }`}
        strokeWidth={isActive ? 2.5 : 2}
      />
      <span
        className={`text-[11px] mt-1 font-medium transition-colors duration-200 ${
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

  const handleClick = (index, href) => {
    setActiveIndex(index);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Width per item: ~72px, so indicator offset = index * 72 + padding
  const itemWidth = 72;
  const indicatorLeft = activeIndex * itemWidth + 12;

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : -20}px)`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="relative flex items-center px-3 py-1.5 rounded-2xl shadow-xl border backdrop-blur-md"
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
          className="relative flex flex-col items-center justify-center px-5 py-2.5 mx-1 transition-all duration-200 group"
        >
          <div className="relative">
            <ShoppingCart
              className="w-5 h-5 text-[#FFFAF7]/60 group-hover:text-[#FF69B4] transition-colors duration-200"
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
            className="text-[11px] mt-1 font-medium text-[#FFFAF7]/60 group-hover:text-[#FF69B4] transition-colors duration-200"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
}
