import { Container, GoldRule, Kicker, Reveal } from "./primitives"

/**
 * INTRO PASS — compact band. Pitch in a narrow left column; the space where
 * a feature image sat is now deliberate emptiness crossed by one gold line
 * running off the right viewport edge.
 */
export function Intro() {
  return (
    <section id="start" aria-labelledby="int-h">
      <Container>
        <div className="rally-grid items-center py-16 lg:py-24">
          <Reveal className="col-span-4 lg:col-span-4">
            <Kicker>New to squash?</Kicker>
            <h2 id="int-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              Start playing today
            </h2>
            <GoldRule />
            <p className="text-muted-foreground">
              The Intro Pass is the simplest way in: one assessment session with
              an ISA coach, a personalized development plan, and your first
              group session — all in one visit. No experience, no equipment, no
              problem.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex min-h-11 items-center bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-gold-deep"
            >
              Book your intro pass
            </a>
          </Reveal>

          {/* negative space, structured by one gold line off the right edge */}
          <Reveal delay={0.08} className="col-span-4 hidden lg:col-span-7 lg:col-start-6 lg:block">
            <div className="relative h-56">
              <div className="bleed-right absolute top-1/2 h-0.5 w-full bg-gold" aria-hidden />
              <p className="absolute right-0 top-[calc(50%+1rem)] text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                One visit. One plan. On court.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
