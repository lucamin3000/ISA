import { Container, GoldRule, Kicker, Reveal } from "./primitives"

/**
 * SQUASH & SCHOOL — the image cluster is gone; in its place a typographic
 * black panel with one gold line running off the left viewport edge.
 * Text column narrow and high on the right.
 */
export function School() {
  return (
    <section id="school" className="bg-paper-warm" aria-labelledby="sch-h">
      <Container>
        <div className="rally-grid items-center py-20 lg:py-28">
          <Reveal className="col-span-4 lg:col-span-7">
            <div className="relative">
              {/* the gold structural line, running off the left edge */}
              <div className="bleed-left absolute -top-8 h-0.5 w-[60%] bg-gold" aria-hidden />
              <div className="bleed-left bg-ink px-6 py-14 text-white sm:px-10 lg:py-20 lg:pl-[max(2.5rem,calc(50vw-40rem))]">
                <p className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.15] sm:text-5xl">
                  Train every day.
                  <br />
                  Fall behind{" "}
                  <em className="not-italic text-gold">never.</em>
                </p>
                <p className="mt-6 max-w-[26rem] text-[0.9375rem] leading-relaxed text-muted-dark">
                  Morning court. School day. Supervised study. Evening squad.
                  One calendar, built around the athlete.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="col-span-4 lg:col-span-4 lg:col-start-9">
            <Kicker>For student athletes</Kicker>
            <h2 id="sch-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              Squash &amp; School
            </h2>
            <GoldRule />
            <p className="text-muted-foreground">
              Serious training shouldn&rsquo;t cost a serious education. Squash
              &amp; School builds daily on-court development around the school
              day — supervised study blocks, progress reports for parents,
              coordination with each athlete&rsquo;s school.
            </p>
            <p className="mt-4 text-muted-foreground">
              Designed for juniors targeting ranking events and, eventually,
              college squash.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex min-h-11 items-center border border-ink px-7 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold hover:text-gold-text"
            >
              Explore the program
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
