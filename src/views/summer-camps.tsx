import { IMG } from "@/content/site"
import { GoldCTA, Kicker, PageHero, QuietLine, Reveal } from "@/components/chrome/shared"

/**
 * SUMMER CAMPS — mirrors the model's camps page: facility hero,
 * single-column primary messaging, two-column location cards,
 * email capture handled by the footer.
 */
export default function SummerCamps() {
  return (
    <div>
      <PageHero
        image={IMG.camp}
        kicker="Inspire Squash Academy"
        title="Summer Camps"
        purpose="Weekly camps for junior players over the summer."
        cta="Reserve a week"
        ctaTo="/book"
      />

      {/* how camp works — heading left, text right on laptop */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="sc-h">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-12">
            <div>
              <Kicker>How camp works</Kicker>
              <h2 id="sc-h" className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                Full days, total focus
              </h2>
            </div>
            <div className="self-center">
              <p className="text-muted-foreground">
                Full days for committed juniors, grouped by assessment. Morning
                fitness, technical blocks, video review, and afternoon matches.
                Every camper leaves with a written plan for the season ahead.
              </p>
              <QuietLine className="mt-3 text-left">Weeks and sign-up post soon.</QuietLine>
            </div>
          </div>
        </Reveal>
      </section>

      {/* two-column location cards */}
      <section className="bg-paper-warm py-12" aria-labelledby="sc-loc">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="sc-loc" className="text-center font-display text-3xl uppercase tracking-wide">
              Camp locations
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="border border-border bg-white">
                <img
                  src={IMG.facility.src}
                  alt={IMG.facility.alt}
                  loading="lazy"
                  className="photo aspect-[16/9] w-full object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-display text-2xl uppercase tracking-wide">ISA Squash Center</h3>
                  <QuietLine className="mt-2">Address and map post soon.</QuietLine>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="flex h-full items-center justify-center border border-border bg-white p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  A second camp location is on the way. More soon.
                </p>
              </article>
            </Reveal>
          </div>
          <Reveal className="mt-10 text-center">
            <GoldCTA to="/book">Reserve a week</GoldCTA>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
