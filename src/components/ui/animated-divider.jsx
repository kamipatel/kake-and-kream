"use client";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AnimatedDivider({ variant = "dots", className }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === "dots") {
    return (
      <div ref={ref} className={cn("flex items-center justify-center gap-3 py-6", className)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: inView ? 8 : 0,
              height: inView ? 8 : 0,
              borderRadius: "50%",
              background: "#FF69B4",
              transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
              opacity: inView ? 1 : 0,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div ref={ref} className={cn("overflow-hidden py-4", className)}>
        <svg viewBox="0 0 1200 40" className="w-full h-8" preserveAspectRatio="none">
          <path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="#FFD54F"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1800,
              strokeDashoffset: inView ? 0 : 1800,
              transition: "stroke-dashoffset 1.5s ease",
            }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "beam") {
    return (
      <div ref={ref} className={cn("flex items-center justify-center py-6", className)}>
        <div
          style={{
            height: 2,
            width: inView ? "60%" : "0%",
            background: "linear-gradient(90deg, transparent, #5C3A28, transparent)",
            transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
            borderRadius: 1,
          }}
        />
      </div>
    );
  }

  return null;
}
