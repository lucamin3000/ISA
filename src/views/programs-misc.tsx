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
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[3fr_2fr]" aria-labelledby="fs-why">
        <Reveal>
          <Kicker>Why First Swings</Kicker>
          <h2 id="fs-why" className="mt-3 font-display text-3xl uppercase tracking-wide">
            Play first, drill later
          </h2>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
            <li>— Small groups with one coach for every court</li>
            <li>— Racquets and balls provided at every session</li>
            <li>— Games-based sessions that build real swings</li>
            <li>— A clear path into ISA squads when ready</li>
          </ul>
        </Reveal>
        <Reveal delay={0.06} className="text-center md:text-right">
          <GoldCTA to="/book">Book a first session</GoldCTA>
        </Reveal>
      </section>
      {/* three pillars */}
      <section className="bg-paper-warm py-16" aria-label="Program pillars">
        <div className="mx-auto max-w-5xl px-4">
          <FeatureColumns
            items={[
              { title: "Skills", body: "Grip, swing and ball sense built through play, not queues." },
              { title: "Movement", body: "Footwork and balance foundations that carry into every sport." },
              { title: "Confidence", body: "Winning habits: effort, focus and loving the contest." },
            ]}
          />
        </div>
      </section>
      {/* schedule — two columns */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center" aria-labelledby="fs-sched">
        <Reveal>
          <h2 id="fs-sched" className="font-display text-3xl uppercase tracking-wide">
            Weekly schedule
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border border-border p-8">
              <h3 className="font-display text-xl uppercase tracking-wide">ISA Squash Center</h3>
              <QuietLine className="mt-2">Class times publish soon.</QuietLine>
            </div>
            <div className="border border-border p-8">
              <h3 className="font-display text-xl uppercase tracking-wide">Second location</h3>
              <QuietLine className="mt-2">Announcing soon.</QuietLine>
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
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            Pressure, routines, self-talk and recovery — trained deliberately,
            the way we train a backhand. Individual and squad sessions run
            alongside the on-court calendar.
          </p>
        </Reveal>
      </section>
      <section className="bg-paper-warm py-16">
        <div className="mx-auto max-w-5xl px-4">
          <FeatureColumns
            items={[
              { title: "Compete", body: "Routines for scoring streaks, deciders and comebacks." },
              { title: "Reset", body: "Between-point habits that keep a match in front of you." },
              { title: "Grow", body: "Reviewing losses so they buy something." },
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
        kicker="Strength & conditioning"
        title={
          <>
            Built for the
            <br />
            fifth game
          </>
        }
        cta="Enquire"
        ctaTo="/book"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            Squash is repeated sprints with a swing at the end. Our S&amp;C
            blocks build the engine — speed to the ball, strength in the lunge,
            and the durability to train all year.
          </p>
        </Reveal>
      </section>
      <section className="bg-paper-warm py-16">
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
        body="Every performance plan includes an S&C block with home programming for tournament weeks."
        cta="Enquire about S&C"
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
        cta="Enquire"
        ctaTo="/book"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            For athletes whose calendars outgrow a classroom: accredited online
            schooling coordinated with the ISA training day, with supervised
            study blocks at the academy.
          </p>
          <QuietLine className="mt-4">School partners announcing soon.</QuietLine>
        </Reveal>
      </section>
      <CTABand
        image={IMG.clinic}
        kicker="One calendar"
        title="School and squash, on one plan"
        body="Families build the week with the academy — court time, study blocks and travel planned together."
        cta="Talk to the academy"
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
        cta="Enquire"
        ctaTo="/book"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Reveal>
          <p className="text-muted-foreground">
            Rankings, video, outreach and campus visits — a season-by-season
            recruiting plan for juniors targeting college squash, guided by
            coaches who have lived that path.
          </p>
        </Reveal>
      </section>
      <CTABand
        image={COACH.brothers}
        kicker="Coached by experience"
        title="A path we know first-hand"
        body="ISA's coaching team has played and captained at the college level and guides each family through the timeline."
        cta="Start the conversation"
        ctaTo="/book"
        flip
      />
    </div>
  )
}
