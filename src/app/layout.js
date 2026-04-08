import "./globals.css";

export const metadata = {
  title: "Kake N Kream — Handcrafted Baked Goods · Austin, TX",
  description: "Handcrafted cupcakes, mini cakes, bundt cakes, sheet cakes & brownies made fresh to order in Austin, TX. Pickup Fridays.",
  openGraph: {
    title: "Kake N Kream — Handcrafted Baked Goods",
    description: "Cupcakes, cakes & brownies baked fresh to order in Austin, TX.",
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
