import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Navigation mirroring the model's structure: logo left, top-level items
 * with dropdown groups, gold Book Now at the end. Mobile collapses to a
 * hamburger panel with the flat list. Active top-level marked by the
 * gold underline.
 */
interface NavItem {
  label: string
  to?: string
  children?: { label: string; to: string }[]
}

const NAV: NavItem[] = [
  {
    label: "Training",
    to: "/annual-training",
    children: [
      { label: "First Swings", to: "/first-swings" },
      { label: "Mindset", to: "/mindset-coaching" },
      { label: "Strength", to: "/strength" },
    ],
  },
  { label: "Camps", to: "/summer-camps" },
  { label: "Fall", to: "/annual-training" },
  {
    label: "School",
    to: "/school-and-squash",
    children: [
      { label: "School Squash", to: "/school-and-squash" },
      { label: "Online School", to: "/online-school" },
      { label: "College", to: "/college-recruiting" },
    ],
  },
  {
    label: "About",
    to: "/",
    children: [
      { label: "Coaches", to: "/coaches" },
      { label: "Blog", to: "/blog" },
    ],
  },
  { label: "Resources", to: "/resources" },
]

/** paths owned by each top-level item, for the active underline */
function isGroupActive(item: NavItem, pathname: string): boolean {
  if (item.to === pathname) return true
  return item.children?.some((c) => c.to === pathname) ?? false
}

export function Crossbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-2xl uppercase leading-none tracking-wide text-ink"
          aria-label="Inspire Squash Academy, home"
        >
          ISA.
        </Link>

        {/* desktop */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = isGroupActive(item, pathname)
              return (
                <li key={item.label} className="group relative">
                  <NavLink
                    to={item.to ?? "#"}
                    className={cn(
                      "flex items-center gap-1 border-b-2 px-3 py-5 text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-colors duration-(--dur-fast) ease-(--ease)",
                      active
                        ? "border-gold text-ink"
                        : "border-transparent text-muted-foreground hover:text-gold-text",
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="size-3.5" aria-hidden />}
                  </NavLink>
                  {item.children && (
                    <ul className="invisible absolute left-0 top-full min-w-56 border border-border bg-white opacity-0 shadow-lg transition-opacity duration-(--dur-fast) ease-(--ease) group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      {item.children.map((c) => (
                        <li key={c.to + c.label}>
                          <NavLink
                            to={c.to}
                            className={({ isActive }) =>
                              cn(
                                "block px-4 py-3 text-[0.8125rem] uppercase tracking-[0.08em] transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-paper-warm hover:text-gold-text",
                                isActive && "text-gold-text",
                              )
                            }
                          >
                            {c.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
            <li className="pl-3">
              <Link
                to="/book"
                className="inline-flex min-h-10 items-center bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-gold-deep"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </nav>

        {/* mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/book"
            className="inline-flex min-h-9 items-center bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink"
          >
            Book
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-border bg-white px-4 pb-8 pt-2 lg:hidden">
          <ul>
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-border last:border-0">
                <NavLink to={item.to ?? "#"} className="block py-3 text-sm font-semibold uppercase tracking-[0.1em]">
                  {item.label}
                </NavLink>
                {item.children && (
                  <ul className="pb-2 pl-4">
                    {item.children.map((c) => (
                      <li key={c.to + c.label}>
                        <NavLink
                          to={c.to}
                          className="block py-2 text-sm text-muted-foreground"
                        >
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
