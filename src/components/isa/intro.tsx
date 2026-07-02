import { IMG } from "@/content/site"
import { Container, GoldRule, Kicker, PhotoCredit, Reveal } from "./primitives"

/**
 * INTRO PASS — compact band; pitch left in a narrow column,
 * feature image bleeding off the right edge.
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

          <Reveal delay={0.08} className="col-span-4 lg:col-span-7 lg:col-start-6">
            <figure className="bleed-right m-0">
              <img
                src={IMG.intro.src}
                alt={IMG.intro.alt}
                width={IMG.intro.width}
                height={IMG.intro.height}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </figure>
            <PhotoCredit image={IMG.intro} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
