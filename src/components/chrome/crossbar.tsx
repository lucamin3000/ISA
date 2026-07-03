import { Link } from "react-router-dom"
import { IsaTabs, type TabItem } from "./isa-tabs"

export const TABS: TabItem[] = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/camps", label: "Camps" },
  { to: "/academy", label: "Academy" },
  { to: "/contact", label: "Contact" },
]

/**
 * Header — wordmark left, tabs right, gold Book Now CTA far right
 * (gold appears only on CTAs, the active-tab underline, and hovers).
 * On mobile the tabs dock as a fixed bottom bar.
 */
export function Crossbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-2xl uppercase leading-none tracking-wide text-ink"
          aria-label="Inspire Squash Academy — home"
        >
          ISA.
        </Link>
        <div className="flex items-center gap-6">
          <IsaTabs items={TABS} className="hidden md:flex" />
          <Link
            to="/contact"
            className="hidden min-h-10 items-center bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-gold-deep sm:inline-flex"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  )
}

export function MobileCrossbar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur md:hidden"
    >
      <IsaTabs
        items={TABS}
        className="flex justify-center"
        linkClassName="px-2 py-4 text-[0.6875rem] tracking-[0.1em]"
      />
    </nav>
  )
}
