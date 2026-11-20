/* Shared design tokens. Values mirror the C / RAW / F objects defined
   inside KakeAndKream.jsx and CustomCakes.jsx so new pages match exactly. */

export const C = {
  bg: "var(--color-bg)",
  white: "var(--color-surface)",
  cream: "var(--color-cream)",
  pink: "var(--color-primary)",
  coral: "var(--color-coral)",
  yellow: "var(--color-yellow)",
  brown: "var(--color-brown)",
  ink: "var(--color-ink)",
  sub: "var(--color-sub)",
  surfRose: "var(--color-surface-rose)",
  surfMint: "var(--color-surface-mint)",
  surfLav: "var(--color-surface-lavender)",
  secondary: "var(--color-secondary)",
  border: "var(--color-border)",
  muted: "var(--color-muted)",
};

/* Raw hex values — only used where CSS var + alpha concatenation is needed */
export const RAW = {
  pink: "#FF69B4",
  brown: "#5C3A28",
  yellow: "#FFD54F",
};

export const F = {
  d: "var(--font-display)",
  b: "var(--font-body)",
  a: "var(--font-accent)",
};
