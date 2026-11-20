"use client";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeader } from "@/components/office-events/SectionHeader";
import { PRODUCTS, PRODUCT_IMAGES, CUSTOM_FLAVOR_NOTE, formatPrice } from "@/data/menu";
import { C, F } from "@/lib/theme";

/* Only these items are offered on the Office Events page.
   Prices, flavors and photos all come from the shared menu data. */
const OFFICE_PRODUCT_IDS = ["mini", "brownies", "cupcakes"];

const OFFICE_PRODUCTS = OFFICE_PRODUCT_IDS
  .map(id => PRODUCTS.find(p => p.id === id))
  .filter(Boolean);

function FlavorList({ product }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {product.flavors.map(f => (
        <li key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, fontSize: 15, color: C.ink, fontWeight: 500, lineHeight: 1.4 }}>
          <span>{f.name}</span>
          <span style={{ fontFamily: F.d, fontSize: 16, fontWeight: 600, color: C.brown, whiteSpace: "nowrap" }}>
            {formatPrice(f.price)}
            {product.unit && <span style={{ fontFamily: F.b, fontSize: 13, fontWeight: 500, color: C.sub }}> {product.unit}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProductCard({ product }) {
  const photo = PRODUCT_IMAGES[product.id]?.thumb;
  return (
    <article style={{ height: "100%", borderRadius: 16, border: `3px solid ${product.color}`, background: C.white, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {photo && (
        <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#FFF5F0" }}>
          <img src={photo} alt={product.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
        </div>
      )}
      <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: F.d, fontSize: 22, fontWeight: 600, margin: 0, color: C.ink }}>{product.name}</h3>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.brown }}>{product.price}</div>
        </div>
        {product.subtitle && (
          <p style={{ fontSize: 14, color: C.sub, margin: "0 0 4px", lineHeight: 1.4, fontWeight: 400 }}>{product.subtitle}</p>
        )}
        <p style={{ fontFamily: F.d, fontSize: 13, fontWeight: 600, color: C.pink, letterSpacing: 1.5, textTransform: "uppercase", margin: "14px 0 10px" }}>
          Flavors
        </p>
        <FlavorList product={product} />
      </div>
    </article>
  );
}

export function OfficeProducts() {
  return (
    <section id="office-treats" style={{ padding: "100px 24px", background: C.surfRose }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader eyebrow="Office Favorites" title="Treats Your Team Will Love" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, alignItems: "stretch" }}>
          {OFFICE_PRODUCTS.map((p, i) => (
            <BlurFade key={p.id} inView delay={0.15 + i * 0.08} className="h-full">
              <ProductCard product={p} />
            </BlurFade>
          ))}
        </div>

        <p style={{ fontFamily: F.a, fontSize: 15, color: C.sub, textAlign: "center", margin: "32px auto 0", maxWidth: 520, lineHeight: 1.6, fontWeight: 400 }}>
          Flavor availability may vary. {CUSTOM_FLAVOR_NOTE}
        </p>
      </div>
    </section>
  );
}
