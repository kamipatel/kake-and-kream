// Plain <img> that serves right-sized copies through Next's image optimizer.
// Same element and styles as before, so layout is unchanged; the browser just
// downloads a copy sized for the screen instead of the 2-3 MB original.
const WIDTHS = [640, 828, 1080, 1920];

export default function OptImg({ src, sizes = "(max-width: 768px) 85vw, 420px", loading = "lazy", alt = "", ...rest }) {
  const u = (w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
  return (
    <img
      src={u(1080)}
      srcSet={WIDTHS.map((w) => `${u(w)} ${w}w`).join(", ")}
      sizes={sizes}
      loading={loading}
      decoding="async"
      alt={alt}
      {...rest}
    />
  );
}
