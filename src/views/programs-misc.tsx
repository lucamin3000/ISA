import { COACH, IMG } from "@/content/site"
import {
  CTABand,
  FeatureColumns,
  GoldCTA,
  Kicker,
  PageHero,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

/**
 * The simpler program pages, each mirroring its counterpart's template:
 * full-width hero, why-section, three-pillar columns, schedule/CTA close.
 */

export function FirstSwings() {
  return (
    <div>
      <PageHero
        image={IMG.clinic}
        kicker="First Swings"
        title={
          <>
            A first racquet,
            <br />
            done right
          </>
        }
        cta="Start playing now"
        ctaTo="/book"
      />
      {/* why choose — text + bullets left, CTA right */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[3fr_2fr]" aria-labelledby="fs-why">
        <Reveal>
          <Kicker>Why First Swings</Kicker>
          <h2 id="fs-why" className="mt-3 font-display text-3xl uppercase tracking-wide">
            Play first, drill later
          </h2>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
            <li>Small groups, one coach per court</li>
            <li>Racquets and balls at every session</li>
            <li>Games that build a real swing</li>
            <li>A clear path into ISA squads</li>
          </ul>
        </Reveal>
        <Reveal delay={0.06} className="text-center md:text-right">
          <GoldCTA to="/book">Book a first session</GoldCTA>
        </Reveal>
      </section>
      {/* three pillars */}
      <section className="bg-paper-warm py-12" aria-label="Program pillars">
        <div className="mx-auto max-w-5xl px-4">
          <FeatureColumns
            items={[
              { title: "Skills", body: "Grip, swing, and ball sense built through play." },
              { title: "Movement", body: "Footwork and balance that carry into every sport." },
              { title: "Confidence", body: "Effort, focus, and a love of the contest." },
            ]}
          />
        </div>
      </section>
      {/* schedule — two columns */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center" aria-labelledby="fs-sched">
        <Reveal>
          <h2 id="fs-sched" className="font-display text-3xl uppercase tracking-wide">
            Weekly schedule
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border border-border p-8">
              <h3 className="font-display text-xl uppercase tracking-wide">ISA Squash Center</h3>
              <QuietLine className="mt-2">Times post soon.</QuietLine>
            </div>
            <div className="border border-border p-8">
              <h3 className="font-display text-xl uppercase tracking-wide">Second location</h3>
              <QuietLine className="mt-2">Opening soon.</QuietLine>
            </div>
          </div>
          <GoldCTA to="/book" className="mt-8">
            Sign up
          </GoldCTA>
        </Reveal>
      </section>
    </div>
  )
}

export function MindsetCoaching() {
  return (
    <div>
      <PageHero
        image={IMG.arena}
        kicker="Mindset coaching"
        title={
          <>
            The match between
            <br />
            the ears
          </>
        }
        cta="Enquire"
        ctaTo="/book"
      />
      <section className="mx-auto max-w-4xl px-4 py-12 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            We train pressure, routines, self-talk, and recovery the way we
            train a backhand. Individual and squad sessions run alongside the
            court calendar.
          </p>
        </Reveal>
      </section>
      <section className="bg-paper-warm py-12">
        <div className="mx-auto max-w-5xl px-4">
          <FeatureColumns
            items={[
              { title: "Compete", body: "Routines for streaks, deciders, and comebacks." },
              { title: "Reset", body: "Between-point habits that keep a match in front of you." },
              { title: "Grow", body: "Reviewing losses so they teach you something." },
            ]}
          />
        </div>
      </section>
      <CTABand
        image={COACH.speaking}
        kicker="Work one-to-one"
        title="Build a competitor's toolkit"
        body="Sessions are shaped around each athlete's competition schedule and reviewed with the coaching team every block."
        cta="Enquire about mindset"
        ctaTo="/book"
      />
    </div>
  )
}

export function Strength() {
  return (
    <div>
      <PageHero
        image={IMG.intro}
        kicker="Strength and conditioning"
        title={
          <>
            Built for the
            <br />
            fifth game
          </>
        }
        cta="Ask us"
        ctaTo="/book"
      />
      <section className="mx-auto max-w-4xl px-4 py-12 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            Squash is repeated sprints with a swing at the end. Our strength
            blocks build the engine, so you get to the ball fast and still have
            legs late in a match.
          </p>
        </Reveal>
      </section>
      <section className="bg-paper-warm py-12">
        <div className="mx-auto max-w-5xl px-4">
          <FeatureColumns
            items={[
              { title: "Speed", body: "First-step quickness and court movement patterns." },
              { title: "Strength", body: "Age-appropriate loading for the lunge and the swing." },
              { title: "Durability", body: "Mobility and recovery habits that prevent the classic injuries." },
            ]}
          />
        </div>
      </section>
      <CTABand
        image={IMG.fall}
        kicker="Part of every plan"
        title="Training that travels"
        body="Every performance plan includes a strength block, with a home routine for tournament weeks."
        cta="Ask about strength"
        ctaTo="/book"
        flip
      />
    </div>
  )
}

export function OnlineSchool() {
  return (
    <div>
      <PageHero
        image={IMG.facility}
        kicker="Online school"
        title={
          <>
            Train mornings,
            <br />
            learn everywhere
          </>
        }
        cta="Ask us"
        ctaTo="/book"
      />
      <section className="mx-auto max-w-4xl px-4 py-12 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            For athletes whose calendars outgrow a classroom. Accredited online
            school built around the ISA training day, with study blocks at the
            academy.
          </p>
          <QuietLine className="mt-4">Partners soon.</QuietLine>
        </Reveal>
      </section>
      <CTABand
        image={IMG.clinic}
        kicker="One calendar"
        title="School and squash, on one plan"
        body="Families build the week with us. Court time, study blocks, and travel, planned together."
        cta="Talk to us"
        ctaTo="/book"
      />
    </div>
  )
}

export function CollegeRecruiting() {
  return (
    <div>
      <PageHero
        image={IMG.camp}
        kicker="College recruiting"
        title={
          <>
            From juniors to
            <br />
            college courts
          </>
        }
        cta="Ask us"
        ctaTo="/book"
      />
      <section className="mx-auto max-w-4xl px-4 py-12 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            Rankings, video, outreach, and campus visits. A recruiting plan by
            season for juniors aiming at college squash.
          </p>
        </Reveal>
      </section>
      <CTABand
        image={COACH.brothers}
        kicker="Guided step by step"
        title="A clear path to college"
        body="We guide each family through the recruiting timeline, from first list to signing."
        cta="Start the conversation"
        ctaTo="/book"
        flip
      />
    </div>
  )
}
