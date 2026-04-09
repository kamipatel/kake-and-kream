import "./globals.css";

export const metadata = {
  title: "Kake N Kream — Handcrafted Baked Goods · St. Louis, MO",
  description: "Handcrafted cupcakes, mini cakes, bundt cakes, sheet cakes & brownies made fresh to order in St. Louis, MO. Pickup Fridays.",
  openGraph: {
    title: "Kake N Kream — Handcrafted Baked Goods",
    description: "Cupcakes, cakes & brownies baked fresh to order in St. Louis, MO.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
