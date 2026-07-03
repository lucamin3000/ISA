import { Link } from "react-router-dom"
import { IMG } from "@/content/site"
import {
  FeatureColumns,
  GoldCTA,
  PageHero,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

/**
 * SCHOOL & SQUASH — mirrors the model's page: stacked-photo hero with
 * centered CTA, partner row, three-pillar value section, program
 * discovery card grid, numbered "why" columns, closing two-card block.
 */

const DISCOVER = [
  { title: "School Squash", to: "/school-and-squash", image: IMG.clinic },
  { title: "Online School", to: "/online-school", image: IMG.facility },
  { title: "College Recruiting", to: "/college-recruiting", image: IMG.camp },
]

export default function SchoolSquash() {
  return (
    <div>
      <PageHero
        image={IMG.clinic}
        kicker="School & Squash"
        title={
          <>
            Train every day.
            <br />
            Fall behind never.
          </>
        }
        cta="Contact us"
        ctaTo="/book"
      />

      {/* partner row */}
      <section className="py-10 text-center" aria-label="School partners">
        <Reveal>
          <QuietLine>School partners announcing soon.</QuietLine>
        </Reveal>
      </section>

      {/* value proposition — three pillars */}
      <section className="mx-auto max-w-5xl px-4 py-10" aria-labelledby="ss-value">
        <Reveal>
          <h2 id="ss-value" className="text-center font-display text-3xl uppercase tracking-wide sm:text-4xl">
            One calendar, whole athletes
          </h2>
          <div className="mt-10">
            <FeatureColumns
              items={[
                { title: "Team first", body: "Squad training every day, with the standards of a team culture." },
                { title: "Holistic growth", body: "Mindset, S&C and recovery built into the school week." },
                { title: "Academic balance", body: "Supervised study blocks and progress reports for parents." },
              ]}
            />
          </div>
        </Reveal>
      </section>

      {/* program discovery grid */}
      <section className="bg-paper-warm py-12" aria-labelledby="ss-disc">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="ss-disc" className="text-center font-display text-3xl uppercase tracking-wide">
              Find your program
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {DISCOVER.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05}>
                <Link to={d.to} className="group block border border-border bg-white">
                  <div className="overflow-hidden">
                    <img
                      src={d.image.src}
                      alt={d.image.alt}
                      loading="lazy"
                      className="photo aspect-[4/3] w-full object-cover transition-transform duration-(--dur-slow) ease-(--ease) group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-display text-xl uppercase tracking-wide">{d.title}</h3>
                    <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-(--dur-fast) ease-(--ease) group-hover:text-gold-text">
                      Discover →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* why ISA — numbered columns */}
      <section className="mx-auto max-w-5xl px-4 py-12" aria-labelledby="ss-why">
        <Reveal>
          <h2 id="ss-why" className="text-center font-display text-3xl uppercase tracking-wide">
            Why families choose ISA
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { n: "01", title: "Coaching culture", body: "Elite standards with a junior-first environment." },
              { n: "02", title: "Athletic lifestyle", body: "Daily training that fits around real school demands." },
              { n: "03", title: "Clear communication", body: "One point of contact, reviews every block, no surprises." },
            ].map((f) => (
              <div key={f.n} className="text-center">
                <p className="font-display text-3xl text-gold-text">{f.n}</p>
                <h3 className="mt-2 font-display text-xl uppercase tracking-wide">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <GoldCTA to="/book">Contact us</GoldCTA>
          </div>
        </Reveal>
      </section>

      {/* closing two-card block */}
      <section className="bg-paper-warm py-12" aria-label="Latest from the program">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <Reveal>
            <article className="border border-border bg-white p-8 text-center">
              <h3 className="font-display text-xl uppercase tracking-wide">Winter registration</h3>
              <QuietLine className="mt-2">Opening dates publish soon.</QuietLine>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="border border-border bg-white p-8 text-center">
              <h3 className="font-display text-xl uppercase tracking-wide">Results &amp; news</h3>
              <QuietLine className="mt-2">First results publish as they're earned.</QuietLine>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
