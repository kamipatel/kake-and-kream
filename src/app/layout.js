import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "https://kake-and-kream.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kake N Kream — Handcrafted Baked Goods · St. Louis, MO",
  description: "Handcrafted cupcakes, mini cakes, bundt cakes, sheet cakes & brownies made fresh to order in St. Louis, MO. Pickup Fridays.",
  openGraph: {
    title: "Kake N Kream — Handcrafted Baked Goods",
    description: "Cupcakes, cakes & brownies baked fresh to order in St. Louis, MO.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kake N Kream — Handcrafted Baked Goods",
    description: "Cupcakes, cakes & brownies baked fresh to order in St. Louis, MO.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
