import { COACH, IMG } from "@/content/site"
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
    role: "Founder & head coach",
    line: "Leads every squad's season plan and the coaching standard across the academy. Full profile publishing soon.",
  },
  {
    image: COACH.action,
    name: "Performance coaching",
    role: "Squad & individual sessions",
    line: "Daily technical and tactical work across all levels. Coach roster announcing soon.",
  },
  {
    image: COACH.staff,
    name: "The wider team",
    role: "Specialist & squad coaches",
    line: "Mindset, S&C and squad specialists join through the season. Announcements publish here.",
  },
  {
    image: COACH.podium,
    name: "Guest coaching",
    role: "Clinics & camps",
    line: "Visiting professionals lead clinics through the year. Schedule publishes soon.",
  },
]

export default function Coaches() {
  return (
    <div>
      <PageHero
        image={COACH.staff}
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

      {/* mission intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center" aria-labelledby="co-h">
        <Reveal>
          <Kicker>How we coach</Kicker>
          <h2 id="co-h" className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">
            Standards first, always
          </h2>
          <p className="mt-5 text-muted-foreground">
            One coaching philosophy runs through every ISA session: champions
            are made on court, session by session. Every athlete's plan is
            written down, reviewed every block, and owned by a coach.
          </p>
        </Reveal>
      </section>

      {/* two-column profile grid */}
      <section className="bg-paper-warm py-16" aria-label="Coach profiles">
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
      <section className="mx-auto max-w-4xl px-4 py-16" aria-labelledby="co-film">
        <Reveal>
          <h2 id="co-film" className="text-center font-display text-3xl uppercase tracking-wide">
            Inside the academy
          </h2>
          <QuietLine className="mb-8 mt-2">The academy film — coming soon.</QuietLine>
          <FilmBlock />
        </Reveal>
      </section>

      <section className="pb-20 text-center">
        <GoldCTA to="/book">Train with us</GoldCTA>
      </section>

      {/* the licensed action imagery closes the page */}
      <section aria-hidden className="mx-auto max-w-6xl px-4 pb-16">
        <img
          src={IMG.arena.src}
          alt={IMG.arena.alt}
          loading="lazy"
          className="photo aspect-[21/9] w-full object-cover"
        />
      </section>
    </div>
  )
}
