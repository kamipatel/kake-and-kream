"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";

/* Cart state lives here instead of inside KakeAndKream.jsx so that the drawer
   is mounted on every route. Before this, /custom-cakes and /office-events
   rendered the nav's Cart button with a no-op handler and shipped no drawer,
   so clicking Cart on those pages did nothing. */

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [cust, setCust] = useState({ fn: "", ln: "", email: "", phone: "", date: "", allergy: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const add = useCallback((item) => {
    setCart(p => [...p, { ...item, _id: Date.now() + Math.random() }]);
  }, []);

  const rm = useCallback((id) => setCart(p => p.filter(i => i._id !== id)), []);
  const openDrawer = useCallback(() => setDrawer(true), []);
  const closeDrawer = useCallback(() => setDrawer(false), []);

  /* The confirmation screen lives in the homepage component, so an order placed
     from a subpage routes home first and the homepage renders it from `ordered`. */
  const handleSubmitSuccess = useCallback(() => {
    setOrdered(true);
    if (pathname !== "/") router.push("/");
  }, [pathname, router]);

  const resetOrder = useCallback(() => {
    setOrdered(false);
    setCart([]);
    setCust({ fn: "", ln: "", email: "", phone: "", date: "", allergy: "", notes: "" });
    setErrors({});
  }, []);

  return (
    <CartContext.Provider value={{ cart, add, rm, drawer, openDrawer, closeDrawer, ordered, resetOrder }}>
      {children}
      <CartDrawer
        cart={cart}
        drawer={drawer}
        setDrawer={setDrawer}
        onRemoveItem={rm}
        cust={cust}
        setCust={setCust}
        errors={errors}
        setErrors={setErrors}
        submitting={submitting}
        setSubmitting={setSubmitting}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </CartContext.Provider>
  );
}
