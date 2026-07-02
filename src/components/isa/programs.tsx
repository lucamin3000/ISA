import { IMG, TOKENS } from "@/content/site"
import { Container, GoldRule, Kicker, PhotoCredit, Reveal, Token } from "./primitives"

/**
 * FEATURED PROGRAMS — two cards side by side but at unequal weight:
 * the Fall Block carries the image mass and bleeds left; the camp card is
 * text-led, narrower, and pushed down off the shared baseline.
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
          {/* feature: Fall Block — image bleeds off the LEFT edge */}
          <Reveal className="col-span-4 lg:col-span-7">
            <article>
              <figure className="bleed-left m-0">
                <img
                  src={IMG.fall.src}
                  alt={IMG.fall.alt}
                  width={IMG.fall.width}
                  height={IMG.fall.height}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
              <PhotoCredit image={IMG.fall} />
              <div className="mt-5 max-w-[34rem]">
                <span className="inline-block bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Fall training season
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold">The Fall Block</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Structured development across a full season: individual
                  technical work, squad sessions, sparring ladders and weekly
                  match play. Placement by assessment, not age.
                </p>
                <p className="mt-3">
                  <Token>{TOKENS.fallDates}</Token>
                </p>
                <a
                  href="#contact"
                  className="mt-5 inline-block border-b-2 border-gold pb-1 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:text-gold-text"
                >
                  Enquire about Fall
                </a>
              </div>
            </article>
          </Reveal>

          {/* side: Summer Camp — lighter, pushed down */}
          <Reveal delay={0.08} className="col-span-4 lg:col-span-4 lg:col-start-9 lg:mt-24">
            <article id="camps" className="border-t-2 border-ink pt-6">
              <span className="inline-block bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Summer camp
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold">Elite Summer Camp</h3>
              <figure className="m-0 mt-4">
                <img
                  src={IMG.camp.src}
                  alt={IMG.camp.alt}
                  width={IMG.camp.width}
                  height={IMG.camp.height}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              </figure>
              <PhotoCredit image={IMG.camp} />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Full-day intensives for committed juniors: morning fitness,
                technical blocks, tactical video review, afternoon competition.
              </p>
              <p className="mt-3">
                <Token>{TOKENS.campDates}</Token>
              </p>
              <a
                href="#contact"
                className="mt-5 inline-block border-b-2 border-gold pb-1 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:text-gold-text"
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
