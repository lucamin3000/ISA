import { Link } from "react-router-dom"

/**
 * FOOTER — slim and axial. One consolidated photography credit line
 * (naming sources and pictured players) replaces per-photo captions;
 * the full manifest lives in src/content/site.ts.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border bg-white pb-24 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center">
        <Link
          to="/"
          className="font-display text-2xl uppercase leading-none tracking-wide text-ink"
          aria-label="Inspire Squash Academy — home"
        >
          ISA.
        </Link>
        <p className="max-w-4xl text-[0.6875rem] leading-relaxed text-muted-foreground">
          Photography: Wikimedia Commons — Simpkin98 · Vinod Divakaran · Ameykhanolkar ·
          Saravanan Alagarsamy · Ian Butterworth · Jens B. Nielsen · Poly Haven · Doha Stadium
          Plus (pictured: M. El Shorbagy, R. Ashour, M. Elshorbagy) — CC BY 2.0 / CC BY-SA
          2.0–4.0 / CC0. Video dialog: 21st.dev Magic UI.
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Inspire Squash Academy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
