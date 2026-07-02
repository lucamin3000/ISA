import { TOKENS } from "@/content/site"
import { Container, GoldRule, Kicker, Reveal } from "./primitives"

/**
 * FOUNDER — spacious. A typographic black monogram panel anchors hard to
 * the left viewport edge (it was never a photo); the bio column is narrow,
 * off-center, with a deep top offset. The bio is a flagged placeholder:
 * identity cannot be verified externally (see src/content/site.ts), so no
 * career claims render.
 */
export function Founder() {
  return (
    <section id="coaches" aria-labelledby="fd-h">
      <Container>
        <div className="rally-grid py-24 lg:py-36">
          <Reveal className="col-span-4 lg:col-span-5">
            <div className="bleed-left flex aspect-[4/5] flex-col items-center justify-center gap-4 bg-ink">
              <span
                aria-hidden
                className="font-display text-[clamp(4rem,8vw,6.5rem)] font-bold leading-none text-gold"
              >
                KI
              </span>
              <span className="h-0.5 w-14 bg-gold" aria-hidden />
              <p className="max-w-[17rem] px-4 text-center text-[0.8125rem] text-muted-dark">
                Founder &amp; head coach
              </p>
            </div>
          </Reveal>

          {/* narrow, off-center bio column: starts col 8, spans 4 */}
          <Reveal
            delay={0.08}
            className="col-span-4 lg:col-span-4 lg:col-start-8 lg:mt-28"
          >
            <Kicker>Founder &amp; head coach</Kicker>
            <h2 id="fd-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              Karim Ibrahim
            </h2>
            <GoldRule />
            <div className="border border-dashed border-gold bg-paper-warm p-6">
              <p className="text-sm font-semibold leading-relaxed text-muted-foreground">
                {TOKENS.bio}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                &ldquo;Karim Ibrahim&rdquo; is shared by more than one figure in
                squash. Until the client confirms which person leads ISA, this
                academy publishes no career claims — no rankings, no titles, no
                coaching record. A verified draft is held in the source, ready
                the moment identity is confirmed.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
