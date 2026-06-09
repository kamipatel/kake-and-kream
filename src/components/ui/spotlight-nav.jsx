"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoFull from "@/app/logo.png";
import logoIcon from "@/app/icon.png";
import { ShoppingCart, Menu, X } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { usePathname, useRouter } from "next/navigation";

const NavItem = ({
  label,
  isActive = false,
  onClick,
  scrolled,
}) => {
  return (
    <button
      className={`relative px-6 py-2.5 mx-1.5 transition-all duration-300 text-[18px] font-semibold rounded-xl
        ${isActive
          ? scrolled
            ? "text-[#FF69B4] bg-white/10"
            : "text-[#FF69B4] bg-[#FF69B4]/15 border-[3px] border-[#FF69B4]"
          : scrolled
            ? "text-[#FFFAF7]/80 hover:text-[#FFFAF7] hover:bg-white/5"
            : "text-[#5C3A28]/70 hover:text-[#5C3A28] hover:bg-[#5C3A28]/5"
        }`}
      onClick={onClick}
    >
      {label}
      {isActive && scrolled && (
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#FF69B4] rounded-full" />
      )}
    </button>
  );
};

const MobileNavItem = ({ label, isActive, onClick, scrolled }) => (
  <button
    className={`w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-200 border-b border-white/10
      ${isActive ? "text-[#FF69B4]" : "text-[#FFFAF7]/80 hover:text-[#FFFAF7]"}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export function SpotlightNav({ cart, onCartClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Custom Cakes", href: "/custom-cakes" },
    { label: "FAQ", href: "#faq" },
  ];

  const isCustomCakes = pathname === "/custom-cakes";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isCustomCakes) {
      setActiveIndex(2); // "Custom Cakes" is at index 2
      return;
    }

    const sectionsToObserve = navItems.filter(item => item.href.startsWith("#"));
    const observers = [];
    sectionsToObserve.forEach((item) => {
      const id = item.href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const idx = navItems.findIndex(n => n.href === item.href);
            if (idx !== -1) setActiveIndex(idx);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isCustomCakes]);

  const handleClick = (index, href) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      if (isCustomCakes) {
        router.push("/" + href);
      } else {
        setActiveIndex(index);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setActiveIndex(index);
      router.push(href);
      if (isCustomCakes && href === "/custom-cakes") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className="fixed top-4 w-full z-[100] transition-all duration-300 px-4 md:px-8 pointer-events-none"
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto relative overflow-hidden rounded-2xl transition-all duration-300"
          style={{
            padding: scrolled ? "20px 32px" : "24px 40px",
            background: scrolled ? "rgba(92,58,40,0.92)" : "rgba(255, 250, 247, 0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
            borderBottom: "1px solid #E8D8D0",
          }}
        >
          {/* BorderBeam on scroll */}
          {scrolled && (
            <BorderBeam
              colorFrom="#FF69B4"
              colorTo="#FFD54F"
              size={150}
              duration={10}
              borderWidth={1.5}
            />
          )}

          {/* Logo */}
          <div
            className="flex items-center flex-shrink-0 cursor-pointer"
            onClick={() => {
              if (isCustomCakes) {
                router.push("/");
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Image
              src={logoIcon}
              alt="Kake N Kream"
              width={60}
              height={60}
              className="block md:hidden rounded transition-all duration-300"
            />
            <Image
              src={logoFull}
              alt="Kake N Kream"
              width={200}
              height={100}
              className="hidden md:block rounded transition-all duration-300"
              style={{ width: "auto", height: 70 }}
            />
          </div>

          {/* Desktop nav links — centered */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
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

          {/* Right group: cart + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative flex items-center px-6 py-3.5 rounded-full transition-all duration-300 bg-[#FF69B4] text-white hover:bg-[#FF4DA6] shadow-xl hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5 mr-2" strokeWidth={2.5} />
              <span className="text-[16px] font-bold">
                Cart{cart.length > 0 && ` (${cart.length})`}
              </span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu
                className={`w-6 h-6 ${scrolled ? "text-[#FFFAF7]" : "text-[#5C3A28]"}`}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[150]" onClick={() => setMobileMenuOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Drawer panel */}
          <div
            className="absolute top-0 right-0 h-full w-[min(320px,85vw)] shadow-2xl"
            style={{ background: "rgba(92,58,40,0.98)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#FFFAF7]/70 hover:text-[#FFFAF7] transition-colors"
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>

            {/* Nav links */}
            <div className="mt-4">
              {navItems.map((item, index) => (
                <MobileNavItem
                  key={item.label}
                  label={item.label}
                  isActive={activeIndex === index}
                  onClick={() => handleClick(index, item.href)}
                  scrolled={true}
                />
              ))}
            </div>

            {/* Cart in drawer */}
            <div className="px-6 mt-8">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCartClick();
                }}
                className="w-full flex items-center justify-center px-6 py-3 rounded-full bg-[#FF69B4] text-white hover:bg-[#FF4DA6] transition-colors font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" strokeWidth={2.5} />
                Cart{cart.length > 0 && ` (${cart.length})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
