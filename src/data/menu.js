import { Cake, CakeSlice, CircleDot, Cookie } from "lucide-react";
import { C, RAW } from "@/lib/theme";

/* Single source of truth for menu items, flavors, prices and photos.
   Used by the main menu (KakeAndKream.jsx) and the Office Events page,
   so prices can never drift between pages. */

const SIGNATURE_FLAVORS = ["Chocolate", "Red Velvet", "Biscoff", "Cookies & Cream"];
const toFlavors = (prefix, names, price) =>
  names.map(name => ({ id: `${prefix}-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`, name, price }));

const MINI_FLAVORS = [
  ...toFlavors("m", SIGNATURE_FLAVORS, 7),
  { id: "m-dubai", name: "Dubai Chocolate Inspired", price: 8 },
];
const CUPCAKE_FLAVORS = toFlavors("c", SIGNATURE_FLAVORS, 4);
const BROWNIE_FLAVORS = [
  { id: "br-classic", name: "Classic Chocolate Brownie", price: 3.5 },
  { id: "br-dubai", name: "Dubai Chocolate Brownie", price: 7 },
];
const BUNDTS = [
  { id: "b-van", name: "Vanilla", desc: "Cinnamon & toasted walnut streusel, topped with glaze", price: 45 },
  { id: "b-marble", name: "Marble", desc: "Ganache topping", price: 55 },
  { id: "b-rv", name: "Red Velvet", desc: "Cream cheese glaze", price: 55 },
  { id: "b-choc", name: "Chocolate", desc: "Ganache topping", price: 55 },
];

export const CUSTOM_FLAVOR_NOTE = "Custom flavor requests welcome with advance notice, subject to availability.";

export const PRODUCTS = [
  { id: "mini", name: "Signature Mini Cakes", icon: CakeSlice, price: "$7–$8 each", unit: "each", note: "Min 1 dozen · One flavor per dozen", color: C.pink, raw: RAW.pink, min: 12, step: 12, subtitle: "Bite-sized treats, 2–3 inches each. Perfect for parties.", flavors: MINI_FLAVORS },
  { id: "brownies", name: "Brownies", icon: Cookie, price: "$3.50–$7 each", unit: "each", note: "Min 1 dozen · One flavor per dozen", color: C.brown, raw: RAW.brown, min: 12, step: 12, flavors: BROWNIE_FLAVORS },
  { id: "cupcakes", name: "Cupcakes", icon: Cake, price: "$4 each", unit: "each", note: "Min 1 dozen · One flavor per dozen", color: C.brown, raw: RAW.brown, min: 12, step: 12, flavors: CUPCAKE_FLAVORS },
  { id: "bundt", name: "Bundt Cakes", icon: CircleDot, price: "From $45", note: "Full-size · Sold individually", color: C.pink, raw: RAW.pink, min: 1, step: 1, flavors: BUNDTS },
  { id: "sheet", name: "Sheet Cakes", icon: Cake, price: "Contact for quote", note: "9×13 · Price varies by size & flavor", color: C.brown, raw: RAW.brown, min: 1, step: 1 },
];

export const formatPrice = (n) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);

export const PRODUCT_IMAGES = {
  cupcakes: {
    thumb: "/images/cupcake-red-velvet-closeup.jpeg",
    gallery: ["/images/cupcake-red-velvet-closeup.jpeg", "/images/cupcake-red-velvet-display.jpeg"],
  },
  mini: {
    thumb: "/images/IMG_7947.jpeg",
    gallery: ["/images/IMG_7947.jpeg", "/images/IMG_7946.jpeg"],
  },
  bundt: {
    thumb: "/images/bundt-glazed.jpeg",
    gallery: ["/images/bundt-glazed.jpeg"],
  },
  sheet: {
    thumb: "/images/sheet-cake.jpg",
    gallery: ["/images/sheet-cake.jpg"],
  },
  brownies: {
    thumb: "/images/DSC_0044.jpeg",
    gallery: ["/images/DSC_0044.jpeg"],
  },
};
