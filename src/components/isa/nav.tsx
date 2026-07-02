import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const LINKS = [
  { label: "Training", href: "#training" },
  { label: "Programs", href: "#programs" },
  { label: "Camps", href: "#camps" },
  { label: "Coaches", href: "#coaches" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-[4.5rem] bg-white/95 backdrop-blur transition-shadow",
        scrolled && "border-b border-border shadow-[0_1px_12px_rgba(11,10,8,0.05)]",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-baseline gap-2.5" aria-label="Inspire Squash Academy — home">
          <span className="font-display text-[1.75rem] font-bold leading-none text-ink">
            ISA<span className="text-gold">.</span>
          </span>
          <span className="hidden text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:inline">
            Inspire Squash Academy
          </span>
        </a>

        {/* desktop */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="bg-gradient-to-r from-gold to-gold bg-[length:0%_2px] bg-left-bottom bg-no-repeat py-2 text-sm font-medium transition-[background-size,color] duration-300 hover:bg-[length:100%_2px] hover:text-gold-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#start"
                className="inline-flex min-h-11 items-center bg-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-gold-deep"
              >
                Book Now
              </a>
            </li>
          </ul>
        </nav>

        {/* mobile */}
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-b border-border bg-white px-5 pb-8 pt-2 lg:hidden"
        >
          <ul>
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-border last:border-0">
                <a
                  href={l.href}
                  className="block py-3.5 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a
                href="#start"
                className="flex min-h-11 items-center justify-center bg-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink"
                onClick={() => setOpen(false)}
              >
                Book Now
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
