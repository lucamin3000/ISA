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
 * THE CROSSBAR — the horizontal stroke of the T. Wordmark centered above,
 * five tabs centered on the axis, one gold hairline across the full width.
 * On mobile the crossbar docks to the bottom edge (see MobileCrossbar).
 */
export function Crossbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4">
        <Link
          to="/"
          className="pt-4 font-display text-3xl uppercase leading-none tracking-wide text-ink"
          aria-label="Inspire Squash Academy — home"
        >
          ISA<span className="text-gold">.</span>
        </Link>
        <IsaTabs items={TABS} className="mt-1 hidden md:flex" />
      </div>
      {/* the crossbar itself */}
      <div aria-hidden className="h-px w-full bg-gold" />
    </header>
  )
}

export function MobileCrossbar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur md:hidden"
    >
      <div aria-hidden className="h-px w-full bg-gold" />
      <IsaTabs
        items={TABS}
        className="flex justify-center"
        linkClassName="px-2 py-4 text-[0.6875rem] tracking-[0.1em]"
      />
    </nav>
  )
}
