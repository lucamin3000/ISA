import { COACH } from "@/content/site"
import { FilmBlock } from "@/components/chrome/film"
import { GoldCTA, Kicker, PageHero, QuietLine, Reveal } from "@/components/chrome/shared"

/**
 * COACHES — mirrors the model's coaches page: hero with trial CTA, short
 * mission intro, two-column profile grid (portrait, name, role, short
 * bio), a standalone film block, and the closing CTA. Coach photos are
 * FPO comps (local only) — clear or replace before publication. Bio
 * copy stays truthful: no invented credentials.
 */

const PROFILES = [
  {
    image: COACH.portrait,
    name: "Karim Ibrahim",
    role: "Founder and head coach",
    line: "Leads every squad's season plan and sets the coaching standard. Full profile soon.",
  },
  {
    image: COACH.action,
    name: "Performance coaching",
    role: "Squad and individual sessions",
    line: "Daily technical and tactical work at every level. Roster soon.",
  },
  {
    image: COACH.staff,
    name: "The wider team",
    role: "Specialist and squad coaches",
    line: "Mindset, strength, and squad specialists join through the season. News posts here.",
  },
  {
    image: COACH.podium,
    name: "Guest coaching",
    role: "Clinics and camps",
    line: "Visiting pros run clinics through the year. Schedule soon.",
  },
]

export default function Coaches() {
  return (
    <div>
      <PageHero
        image={COACH.team}
        kicker="The coaching team"
        title={
          <>
            Here to make
            <br />
            you better
          </>
        }
        cta="Book a trial session"
        ctaTo="/book"
      />

      {/* mission — heading left, text right on laptop */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="co-h">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-12">
            <div>
              <Kicker>How we coach</Kicker>
              <h2 id="co-h" className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                Standards first, always
              </h2>
            </div>
            <p className="self-center text-muted-foreground">
              Every athlete gets a written plan. A coach owns it, reviews it
              each block, and holds the standard.
            </p>
          </div>
        </Reveal>
      </section>

      {/* two-column profile grid */}
      <section className="bg-paper-warm py-12" aria-label="Coach profiles">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2">
          {PROFILES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <article className="flex h-full flex-col items-center border border-border bg-white p-8 text-center">
                <img
                  src={p.image.src}
                  alt={p.image.alt}
                  loading="lazy"
                  className="photo size-36 rounded-full object-cover"
                />
                <h3 className="mt-5 font-display text-2xl uppercase tracking-wide">{p.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-gold-text">
                  {p.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.line}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* standalone film block */}
      <section className="mx-auto max-w-2xl px-4 py-12" aria-labelledby="co-film">
        <Reveal>
          <h2 id="co-film" className="text-center font-display text-3xl uppercase tracking-wide">
            Inside the academy
          </h2>
          <QuietLine className="mb-8 mt-2">Academy film coming soon.</QuietLine>
          <FilmBlock />
        </Reveal>
      </section>

      <section className="pb-20 text-center">
        <GoldCTA to="/book">Train with us</GoldCTA>
      </section>

    </div>
  )
}
