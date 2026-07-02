// Tab bar mechanic sourced through the Magic MCP (21st.dev — "Vercel Tabs":
// measured offsetLeft/offsetWidth underline sliding between tabs) and
// restyled completely into the ISA system: react-router NavLinks, the gold
// crossbar underline, Anton labels, the single site easing.
import { useCallback, useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export interface TabItem {
  to: string
  label: string
}

export function IsaTabs({
  items,
  className,
  linkClassName,
}: {
  items: TabItem[]
  className?: string
  linkClassName?: string
}) {
  const { pathname } = useLocation()
  const refs = useRef<(HTMLAnchorElement | null)[]>([])
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false })

  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.to === pathname),
  )

  const measure = useCallback(() => {
    const el = refs.current[activeIndex]
    if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth, ready: true })
  }, [activeIndex])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    // re-measure once webfonts settle (Anton changes label widths)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  return (
    <div className={cn("relative", className)}>
      {items.map((it, i) => (
        <NavLink
          key={it.to}
          to={it.to}
          ref={(el) => {
            refs.current[i] = el
          }}
          className={({ isActive }) =>
            cn(
              "relative px-3 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors sm:px-4",
              "duration-(--dur-fast) ease-(--ease)",
              isActive ? "text-ink" : "text-muted-foreground hover:text-gold-text",
              linkClassName,
            )
          }
        >
          {it.label}
        </NavLink>
      ))}
      {/* the active marker: a gold segment of the crossbar sliding between tabs */}
      <span
        aria-hidden
        className="absolute bottom-0 h-0.5 bg-gold"
        style={{
          left: bar.left,
          width: bar.width,
          opacity: bar.ready ? 1 : 0,
          transitionProperty: "left, width",
          transitionDuration: "var(--dur-slow)",
          transitionTimingFunction: "var(--ease)",
        }}
      />
    </div>
  )
}
