import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "https://kake-and-kream.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kake N Kream — Handcrafted Baked Goods · St. Charles, MO",
  description: "Handcrafted cupcakes, mini cakes, bundt cakes, sheet cakes & brownies made fresh to order in St. Charles, MO. Pickup Fridays.",
  openGraph: {
    title: "Kake N Kream — Handcrafted Baked Goods",
    description: "Cupcakes, cakes & brownies baked fresh to order in St. Charles, MO.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kake N Kream — Handcrafted Baked Goods",
    description: "Cupcakes, cakes & brownies baked fresh to order in St. Charles, MO.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
