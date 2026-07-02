import { TOKENS } from "@/content/site"
import { Container, GoldRule, Kicker, Reveal, Token } from "./primitives"

/**
 * FEATURED PROGRAMS — no photography: the Fall Block is a black band that
 * bleeds off the left edge; the camp card is an outlined, text-led block
 * pushed down off the shared baseline. Unequal by design.
 */
export function Programs() {
  return (
    <section id="training" aria-labelledby="prog-h">
      <Container>
        <div className="pt-20 lg:pt-28">
          <Reveal>
            <Kicker>Train with us</Kicker>
            <h2 id="prog-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              Featured sessions
            </h2>
            <GoldRule />
          </Reveal>
        </div>

        <div className="rally-grid pb-20 lg:pb-28">
          {/* feature: black band bleeding LEFT — where a photo used to sit */}
          <Reveal className="col-span-4 lg:col-span-7">
            <article className="bleed-left bg-ink px-6 py-12 text-white sm:px-10 lg:py-16 lg:pl-[max(2.5rem,calc(50vw-40rem))] lg:pr-14">
              <span className="inline-block bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Fall training season
              </span>
              <h3 className="mt-6 font-display text-4xl font-semibold leading-tight lg:text-5xl">
                The Fall
                <br />
                Block<span className="text-gold">.</span>
              </h3>
              <p className="mt-5 max-w-[30rem] text-[0.9375rem] leading-relaxed text-muted-dark">
                Structured development across a full season: individual
                technical work, squad sessions, sparring ladders and weekly
                match play. Placement by assessment, not age.
              </p>
              <p className="mt-5">
                <Token dark>{TOKENS.fallDates}</Token>
              </p>
              <a
                href="#contact"
                className="mt-8 inline-block border-b-2 border-gold pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:text-gold"
              >
                Enquire about Fall
              </a>
            </article>
          </Reveal>

          {/* side: outlined, lighter, pushed down */}
          <Reveal delay={0.08} className="col-span-4 lg:col-span-4 lg:col-start-9 lg:mt-24">
            <article id="camps" className="border-2 border-ink p-7 lg:p-9">
              <span className="inline-block bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Summer camp
              </span>
              <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">
                Elite Summer Camp
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Full-day intensives for committed juniors: morning fitness,
                technical blocks, tactical video review, afternoon competition.
              </p>
              <p className="mt-4">
                <Token>{TOKENS.campDates}</Token>
              </p>
              <a
                href="#contact"
                className="mt-6 inline-block border-b-2 border-gold pb-1 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:text-gold-text"
              >
                Reserve a camp week
              </a>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
