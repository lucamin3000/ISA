import { COACH, IMG } from "@/content/site"
import {
  CTABand,
  GoldCTA,
  Kicker,
  PageHero,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

/**
 * ANNUAL / FALL TRAINING — mirrors the model's training page: dark hero
 * with season line, centered onboarding CTA, single-column mission block,
 * platform section (text + stacked images), three full-width level blocks,
 * coaching-team two-column with round headshots, six-item package grid,
 * and a closing two-column CTA with the coach photo.
 */

const LEVELS = [
  {
    image: IMG.camp,
    title: "Foundation squads",
    body: "New and developing juniors in small groups. We build technique, movement, and match habits.",
  },
  {
    image: IMG.fall,
    title: "Performance squads",
    body: "Ranked juniors training daily. Technical blocks, sparring ladders, and weekly matches.",
  },
  {
    image: IMG.amb3,
    title: "Elite squads",
    body: "Our top squad, preparing for ranking events and college. Video review every block.",
  },
]

const PACKAGES = [
  { title: "One squad session / week", image: IMG.intro },
  { title: "Two squad sessions / week", image: IMG.clinic },
  { title: "Three squad sessions / week", image: IMG.fall },
  { title: "Squad + individual block", image: IMG.camp },
  { title: "Full performance plan", image: IMG.arena },
  { title: "Match-play membership", image: IMG.facility },
]

export default function AnnualTraining() {
  return (
    <div>
      <PageHero
        image={IMG.fall}
        kicker="Annual training"
        title={
          <>
            The Fall Block
            <br />
            at ISA
          </>
        }
      />

      {/* centered onboarding CTA */}
      <section className="py-10 text-center">
        <Reveal>
          <QuietLine>Dates post soon.</QuietLine>
          <GoldCTA to="/book" className="mt-4">
            Get started
          </GoldCTA>
        </Reveal>
      </section>

      {/* mission — heading left, text right on laptop */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="at-mission">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-12">
            <div>
              <Kicker>The approach</Kicker>
              <h2 id="at-mission" className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                Whole athletes, not just wristwork
              </h2>
            </div>
            <p className="self-center text-muted-foreground">
              Every ISA season plans the year as one arc. We work technique,
              fitness, mindset, and school, then review it with the family each
              block. We place by assessment, not age.
            </p>
          </div>
        </Reveal>
      </section>

      {/* platform section — text left, stacked images right */}
      <section className="bg-paper-warm py-12" aria-labelledby="at-portal">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <Reveal>
            <Kicker>The training portal</Kicker>
            <h2 id="at-portal" className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">
              Your season, in your pocket
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Schedules, session notes, video clips, and progress reviews in one
              place for every ISA family. The portal opens with the season.
            </p>
            <QuietLine className="mt-3 text-left">Preview soon.</QuietLine>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="grid grid-cols-2 gap-4">
              <img src={IMG.clinic.src} alt={IMG.clinic.alt} loading="lazy" className="photo aspect-[3/4] w-full object-cover" />
              <img src={IMG.intro.src} alt={IMG.intro.alt} loading="lazy" className="photo mt-8 aspect-[3/4] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* squad levels — three cards, images at native size */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="at-levels">
        <Reveal>
          <h2 id="at-levels" className="text-center font-display text-3xl uppercase tracking-wide sm:text-4xl">
            The squads
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {LEVELS.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.05}>
              <article className="flex h-full flex-col border border-border bg-white">
                <img
                  src={l.image.src}
                  alt={l.image.alt}
                  loading="lazy"
                  className="photo aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl uppercase tracking-wide">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* coaching team — two columns, round headshots (FPO comps) */}
      <section className="bg-paper-warm py-12" aria-labelledby="at-team">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <h2 id="at-team" className="text-center font-display text-3xl uppercase tracking-wide">
              On court with you
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Reveal>
              <div className="flex items-center gap-5">
                <img
                  src={COACH.portrait.src}
                  alt={COACH.portrait.alt}
                  loading="lazy"
                  className="photo size-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-display text-xl uppercase tracking-wide">Karim Ibrahim</h3>
                  <p className="text-sm text-muted-foreground">Founder and head coach</p>
                  <QuietLine className="mt-1 text-left">Full profile soon.</QuietLine>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="flex items-center gap-5">
                <img
                  src={COACH.staff.src}
                  alt={COACH.staff.alt}
                  loading="lazy"
                  className="photo size-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-display text-xl uppercase tracking-wide">The coaching team</h3>
                  <p className="text-sm text-muted-foreground">Squad and specialist coaches</p>
                  <QuietLine className="mt-1 text-left">Roster soon.</QuietLine>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* six-item package grid — no invented pricing */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="at-pack">
        <Reveal>
          <h2 id="at-pack" className="text-center font-display text-3xl uppercase tracking-wide">
            Training plans
          </h2>
          <QuietLine className="mt-3">Plans and prices post with the season.</QuietLine>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <article className="border border-border bg-white">
                <img src={p.image.src} alt={p.image.alt} loading="lazy" className="photo aspect-[4/3] w-full object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">{p.title}</h3>
                  <GoldCTA to="/book" className="mt-3 min-h-9 px-5 py-1.5 text-xs">
                    Enquire
                  </GoldCTA>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* closing CTA — coach photo left, text right (FPO comp) */}
      <CTABand
        image={COACH.action}
        kicker="New to ISA"
        title="Start with an intro lesson"
        body="One visit with an ISA coach. You get an assessment, a plan, and your first squad session."
        cta="Book your intro"
        ctaTo="/book"
      />
    </div>
  )
}
