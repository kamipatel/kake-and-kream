"use client";
import { BlurFade } from "@/components/ui/blur-fade";
import { C, F } from "@/lib/theme";

/* Eyebrow + heading + pink bar, styled to match the section headers
   on the Custom Cakes page. */
export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <BlurFade inView delay={0.1}>
      <p style={{ fontFamily: F.d, fontSize: 14, fontWeight: 600, color: C.pink, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px, 6vw, 42px)", fontWeight: 700, textAlign: "center", margin: "0 0 12px", color: C.brown }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: F.b, fontSize: 17, color: C.sub, textAlign: "center", marginBottom: 12, fontWeight: 500, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
      <div style={{ width: 50, height: 4, borderRadius: 2, background: C.pink, margin: "0 auto 40px" }} />
    </BlurFade>
  );
}
