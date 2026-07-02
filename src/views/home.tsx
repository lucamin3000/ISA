import { Link } from "react-router-dom"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { IMG, ISA_FILM_EMBED_URL } from "@/content/site"
import { GoldCTA, Kicker, Monument, QuietLine, Reveal } from "@/components/chrome/shared"

/** The film — the verbatim 21st.dev dialog once the embed URL exists;
 *  until then the treated still with one quiet line. */
function Film() {
  if (ISA_FILM_EMBED_URL) {
    return (
      <div className="photo">
        <HeroVideoDialog
          animationStyle="from-center"
          videoSrc={ISA_FILM_EMBED_URL}
          thumbnailSrc={IMG.film.src}
          thumbnailAlt={IMG.film.alt}
        />
      </div>
    )
  }
  return (
    <figure className="m-0">
      <img
        src={IMG.film.src}
        alt={IMG.film.alt}
        width={IMG.film.width}
        height={IMG.film.height}
        fetchPriority="high"
        className="photo aspect-[16/9] w-full object-cover"
      />
      <QuietLine className="pt-4">The academy film — coming soon.</QuietLine>
    </figure>
  )
}

const DOORWAYS = [
  {
    to: "/camps",
    title: "Camps",
    line: "Intensive weeks. Total focus.",
    dominant: false,
  },
  {
    to: "/programs",
    title: "Programs",
    line: "Memberships, seasons, Squash & School.",
    dominant: true,
  },
  {
    to: "/academy",
    title: "Academy",
    line: "The facility, the founder, the players.",
    dominant: false,
  },
]

export default function Home() {
  return (
    <div className="pb-8">
      {/* the monumental gesture */}
      <section className="px-4 pt-16 lg:pt-24" aria-labelledby="home-h">
        <Reveal>
          <Kicker className="mb-5 text-center">Inspire Squash Academy</Kicker>
          <Monument id="home-h">
            Control
            <br />
            the T<span className="text-gold">.</span>
          </Monument>
          <p className="mx-auto mt-8 max-w-md text-center text-[1.0625rem] text-muted-foreground">
            The middle of the court decides the match. Champions are made
            there, session by session.
          </p>
          <div className="mt-8 text-center">
            <GoldCTA to="/contact">Join the academy</GoldCTA>
          </div>
        </Reveal>
      </section>

      {/* the film, centered on the spine */}
      <section className="mx-auto mt-20 max-w-4xl px-4 lg:mt-28" aria-label="The academy film">
        <Reveal>
          <Film />
        </Reveal>
      </section>

      {/* one credibility statement — a tight black band */}
      <section className="mt-20 bg-ink py-16 lg:mt-28" aria-label="The standard">
        <Reveal>
          <p className="mx-auto max-w-3xl px-4 text-center font-display text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl">
            We measure ourselves by what
            <br />
            our athletes <span className="text-gold">go on to do.</span>
          </p>
        </Reveal>
      </section>

      {/* three doorways — balanced, weighted: Programs dominant on the axis */}
      <section className="mx-auto mt-20 max-w-5xl px-4 lg:mt-28" aria-label="Explore the academy">
        {/* Card group informed by Magic MCP feature-block references,
            rebuilt fully in the ISA system: axial trio, black dominant center. */}
        <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
          {DOORWAYS.map((d, i) => (
            <Reveal key={d.to} delay={i * 0.06} className="flex">
              <Link
                to={d.to}
                className={
                  d.dominant
                    ? "group flex w-full flex-col items-center justify-between gap-10 bg-ink px-8 py-14 text-center text-white"
                    : "group flex w-full flex-col items-center justify-between gap-10 border-2 border-ink px-8 py-10 text-center md:my-6"
                }
              >
                <span className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
                  {d.title}
                </span>
                <span
                  className={
                    d.dominant
                      ? "text-sm text-muted-dark"
                      : "text-sm text-muted-foreground"
                  }
                >
                  {d.line}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-(--dur-fast) ease-(--ease) group-hover:text-gold-text">
                  Enter →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
