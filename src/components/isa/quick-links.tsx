import { ArrowRight } from "lucide-react"
import { Container, Reveal } from "./primitives"

/**
 * QUICK-LINKS BAND — one dominant card (Memberships) at display weight,
 * three subordinate rows beside it. Deliberately NOT four clones.
 */
export function QuickLinks() {
  return (
    <section id="programs" className="border-y border-border" aria-label="Key programs">
      <Container>
        <div className="rally-grid py-0">
          {/* dominant: Memberships */}
          <Reveal className="col-span-4 lg:col-span-7 lg:border-r lg:border-border">
            <a
              href="#training"
              className="group flex h-full flex-col justify-between gap-10 py-10 pr-0 transition-colors hover:bg-paper-warm lg:py-14 lg:pr-10"
            >
              <div>
                <p className="font-display text-4xl font-semibold leading-tight lg:text-6xl">
                  Memberships
                </p>
                <p className="mt-3 max-w-[26rem] text-sm text-muted-foreground">
                  Year-round training plans — the core of the academy, placement
                  by assessment.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.1em] text-gold-text">
                Explore
                <ArrowRight
                  className="size-5 text-gold transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </a>
          </Reveal>

          {/* subordinate rows */}
          <div className="col-span-4 flex flex-col divide-y divide-border border-t border-border lg:col-span-5 lg:border-t-0">
            {[
              { label: "Summer Camps", sub: "Intensive holiday blocks", href: "#camps" },
              { label: "Squash & School", sub: "Train without falling behind", href: "#school" },
              { label: "Join Now", sub: "Talk to the academy", href: "#contact" },
            ].map((l, i) => (
              <Reveal key={l.href} delay={i * 0.06} className="flex-1">
                <a
                  href={l.href}
                  className="group flex h-full items-center justify-between gap-4 py-6 transition-colors hover:bg-paper-warm lg:pl-10"
                >
                  <span>
                    <span className="font-display text-xl font-semibold lg:text-2xl">
                      {l.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{l.sub}</span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
