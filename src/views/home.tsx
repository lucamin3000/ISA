import { Link } from "react-router-dom"
import { COACH, IMG } from "@/content/site"
import type { IsaImage } from "@/content/site"
import { FilmBlock } from "@/components/chrome/film"
import { GoldCTA, Kicker, QuietLine, Reveal } from "@/components/chrome/shared"

/**
 * HOME — the MSquash homepage flow, section for section, rebuilt for ISA:
 * hero (full-width photo, centered overlay, one CTA) → three-column feature
 * grid → two stacked discover cards → Squash & School (heading, three-image
 * row, closing CTA) → start playing (image right, text left) → two location
 * cards under one centered CTA → founders (photo band with overlay, then
 * profile card) → ambassadors grid. Structure copied; every word and photo
 * is ISA's own.
 */

function Hero() {
  return (
    <section className="bg-ink text-white" aria-labelledby="home-h">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 lg:grid-cols-[3fr_2fr] lg:gap-12 lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Inspire Squash Academy
          </p>
          <h1
            id="home-h"
            className="mt-4 font-display text-[clamp(2.75rem,6vw,5.25rem)] uppercase leading-[0.95] tracking-wide"
          >
            We build
            <br />
            champions.
          </h1>
          <p className="mt-5 max-w-md text-[1.0625rem] text-white/85">
            Elite coaching, junior development and lifelong squash — session by
            session.
          </p>
          <GoldCTA to="/book" className="mt-7">
            Start training
          </GoldCTA>
        </div>
        <img
          src={IMG.fall.src}
          alt={IMG.fall.alt}
          width={IMG.fall.width}
          height={IMG.fall.height}
          fetchPriority="high"
          className="photo w-full justify-self-center border border-white/15 lg:justify-self-end"
          style={{ maxWidth: IMG.fall.width }}
        />
      </div>
    </section>
  )
}

/** Three equal columns: image, heading, CTA. */
const FEATURES: { image: IsaImage; title: string; line: string; to: string; cta: string }[] = [
  {
    image: IMG.clinic,
    title: "Programs",
    line: "Memberships, seasonal squads and Squash & School — placement by assessment.",
    to: "/annual-training",
    cta: "Explore programs",
  },
  {
    image: IMG.camp,
    title: "Camps",
    line: "Full-day summer intensives and the Intro Pass for new players.",
    to: "/summer-camps",
    cta: "See camps",
  },
  {
    image: IMG.facility,
    title: "Academy",
    line: "The facility, the founder and the people around the academy.",
    to: "/coaches",
    cta: "Visit the academy",
  },
]

function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 lg:py-16" aria-label="Explore ISA">
      <div className="grid gap-8 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.to} delay={i * 0.06}>
            <div className="flex h-full flex-col items-center text-center">
              <img
                src={f.image.src}
                alt={f.image.alt}
                width={f.image.width}
                height={f.image.height}
                loading="lazy"
                className="photo aspect-[4/3] w-full object-cover"
              />
              <h2 className="mt-5 font-display text-2xl uppercase tracking-wide">{f.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.line}</p>
              <Link
                to={f.to}
                className="mt-4 border-b-2 border-gold pb-1 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-(--dur-fast) ease-(--ease) hover:text-gold-text"
              >
                {f.cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Two stacked discover cards — image left, text and right-aligned CTA. */
function Discover() {
  const cards = [
    {
      image: IMG.camp,
      kicker: "Summer",
      title: "Elite Summer Camp",
      body: "Full-day intensives for committed juniors: morning fitness, technical blocks, tactical video review, afternoon competition. Camp weeks publish soon.",
      to: "/summer-camps",
      cta: "Reserve a week",
    },
    {
      image: IMG.arena,
      kicker: "Fall season",
      title: "The Fall Block",
      body: "A full season of structured development — squads built around school terms and ranking events, progress reviewed every block. Dates publish soon.",
      to: "/annual-training",
      cta: "Enquire about Fall",
    },
  ]
  return (
    <section className="bg-paper-warm py-12 lg:py-16" aria-labelledby="disc-h">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <Kicker className="text-center">Discover ISA</Kicker>
          <h2 id="disc-h" className="mt-3 text-center font-display text-4xl uppercase tracking-wide">
            Train with us
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <article className="grid items-center gap-6 border border-border bg-white md:grid-cols-[2fr_3fr]">
                <img
                  src={c.image.src}
                  alt={c.image.alt}
                  width={c.image.width}
                  height={c.image.height}
                  loading="lazy"
                  className="photo aspect-[16/10] h-full w-full object-cover"
                />
                <div className="flex flex-col items-start gap-3 p-6 md:p-8">
                  <Kicker>{c.kicker}</Kicker>
                  <h3 className="font-display text-3xl uppercase tracking-wide">{c.title}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  <GoldCTA to={c.to} className="mt-2 self-end">
                    {c.cta}
                  </GoldCTA>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Heading + text, three images in a row, closing text and one CTA. */
function SquashSchool() {
  const row = [IMG.clinic, IMG.arena, IMG.intro]
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 lg:py-16" aria-labelledby="ss-h">
      <Reveal>
        <Kicker className="text-center">For student athletes</Kicker>
        <h2 id="ss-h" className="mt-3 text-center font-display text-4xl uppercase tracking-wide sm:text-5xl">
          Squash &amp; School
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground">
          Serious training shouldn&rsquo;t cost a serious education. Daily
          on-court development built around the school day — supervised study
          blocks, progress reports for parents, coordination with each
          athlete&rsquo;s school.
        </p>
      </Reveal>
      <Reveal className="mt-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {row.map((im) => (
            <img
              key={im.src}
              src={im.src}
              alt={im.alt}
              width={im.width}
              height={im.height}
              loading="lazy"
              className="photo aspect-[4/3] w-full object-cover"
            />
          ))}
        </div>
      </Reveal>
      <Reveal className="mt-10 text-center">
        <p className="mx-auto max-w-xl text-sm text-muted-foreground">
          Designed for juniors targeting ranking events and, eventually,
          college squash.
        </p>
        <GoldCTA to="/school-and-squash" className="mt-6">
          Explore the program
        </GoldCTA>
      </Reveal>
    </section>
  )
}

/** Large image right, left-aligned text with one CTA. */
function StartPlaying() {
  return (
    <section className="bg-paper-warm py-12 lg:py-16" aria-labelledby="sp-h">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <Reveal>
          <Kicker>New to squash?</Kicker>
          <h2 id="sp-h" className="mt-3 font-display text-4xl uppercase tracking-wide sm:text-5xl">
            Start playing today
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            The Intro Pass is the simplest way in: one assessment session with
            an ISA coach, a personal development plan, and your first group
            session — all in one visit. No experience, no equipment, no
            problem.
          </p>
          <GoldCTA to="/first-swings" className="mt-7">
            Book your intro pass
          </GoldCTA>
        </Reveal>
        <Reveal delay={0.08}>
          <img
            src={IMG.intro.src}
            alt={IMG.intro.alt}
            width={IMG.intro.width}
            height={IMG.intro.height}
            loading="lazy"
            className="photo aspect-[4/3] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  )
}

/** One centered CTA above two equal location cards. */
function Locations() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 lg:py-16" aria-labelledby="loc-h">
      <Reveal className="text-center">
        <Kicker>Where we train</Kicker>
        <h2 id="loc-h" className="mt-3 font-display text-4xl uppercase tracking-wide">
          Our locations
        </h2>
        <GoldCTA to="/book" className="mt-6">
          Plan your visit
        </GoldCTA>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal>
          <article className="border border-border">
            <img
              src={IMG.facility.src}
              alt={IMG.facility.alt}
              width={IMG.facility.width}
              height={IMG.facility.height}
              loading="lazy"
              className="photo aspect-[16/9] w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl uppercase tracking-wide">ISA Squash Center</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Courts, strength &amp; conditioning, video analysis. Location
                details publish soon.
              </p>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.06}>
          <article className="flex h-full items-center justify-center border border-border bg-paper-warm p-10 text-center">
            <p className="text-sm text-muted-foreground">
              A second location is in the works — announcing soon.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

/** Founders section — photo band with overlaid text, the academy film
 *  (the model embeds its video here), then two side-by-side profile
 *  cards. Coach photos are FPO comps, local only. */
function Founders() {
  return (
    <section aria-labelledby="fo-h">
      <div className="bg-ink py-12 text-white lg:py-14">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Kicker className="text-white/70">The academy</Kicker>
          <h2 id="fo-h" className="mt-3 font-display text-4xl uppercase tracking-wide sm:text-5xl">
            Built by coaches
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/85">
            One belief runs through everything at ISA: champions are made on
            court, session by session.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 pt-12">
        <Reveal>
          <FilmBlock />
        </Reveal>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col items-center gap-3 border border-border p-8 text-center">
              <img
                src={COACH.portrait.src}
                alt={COACH.portrait.alt}
                loading="lazy"
                className="photo size-28 rounded-full object-cover"
              />
              <h3 className="font-display text-2xl uppercase tracking-wide">Karim Ibrahim</h3>
              <Kicker>Founder &amp; head coach</Kicker>
              <QuietLine>Full profile publishing soon.</QuietLine>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col items-center gap-3 border border-border p-8 text-center">
              <img
                src={COACH.staff.src}
                alt={COACH.staff.alt}
                loading="lazy"
                className="photo size-28 rounded-full object-cover"
              />
              <h3 className="font-display text-2xl uppercase tracking-wide">The coaching team</h3>
              <Kicker>Squad &amp; specialist coaches</Kicker>
              <QuietLine>Roster announcing soon.</QuietLine>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Ambassadors: profile card grid. */
function Ambassadors() {
  const cards = [IMG.amb1, IMG.amb2, IMG.amb3]
  return (
    <section className="bg-paper-warm py-12 lg:py-16" aria-labelledby="am-h">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <Kicker>The people around the academy</Kicker>
          <h2 id="am-h" className="mt-3 font-display text-4xl uppercase tracking-wide">
            Featured players
          </h2>
          <QuietLine className="mt-3">Player roster publishing soon.</QuietLine>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((im, i) => (
            <Reveal key={im.src} delay={i * 0.06}>
              <article className="border border-border bg-white">
                <img
                  src={im.src}
                  alt={im.alt}
                  width={im.width}
                  height={im.height}
                  loading="lazy"
                  className="photo aspect-[3/4] w-full object-cover"
                />
                <div className="p-5 text-center">
                  <QuietLine>Profile publishing soon.</QuietLine>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureGrid />
      <Discover />
      <SquashSchool />
      <StartPlaying />
      <Locations />
      <Founders />
      <Ambassadors />
    </div>
  )
}
