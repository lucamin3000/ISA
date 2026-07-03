import { Link } from "react-router-dom"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { IMG, ISA_FILM_EMBED_URL } from "@/content/site"
import type { IsaImage } from "@/content/site"
import { GoldCTA, QuietLine, Reveal } from "@/components/chrome/shared"

/**
 * HOME hero — full-width action photo, dark scrim, short bold headline,
 * one gold CTA. Register informed by Magic MCP photo-hero references,
 * rebuilt in the ISA system.
 */
function Hero() {
  return (
    <section className="relative isolate" aria-labelledby="home-h">
      <img
        src={IMG.fall.src}
        alt={IMG.fall.alt}
        width={IMG.fall.width}
        height={IMG.fall.height}
        fetchPriority="high"
        className="photo h-[72svh] min-h-[26rem] w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
          Inspire Squash Academy
        </p>
        <h1
          id="home-h"
          className="mt-4 font-display text-[clamp(2.75rem,9vw,6.5rem)] uppercase leading-[0.95] tracking-wide text-white"
        >
          We build
          <br />
          champions.
        </h1>
        <p className="mt-6 max-w-md text-[1.0625rem] text-white/85">
          Elite coaching, junior development and lifelong squash — session by
          session.
        </p>
        <GoldCTA to="/contact" className="mt-8">
          Start training
        </GoldCTA>
      </div>
    </section>
  )
}

/** The film — the verbatim 21st.dev dialog once the embed URL exists. */
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
        loading="lazy"
        className="photo aspect-[16/9] w-full object-cover"
      />
      <QuietLine className="pt-4">The academy film — coming soon.</QuietLine>
    </figure>
  )
}

const DOORWAYS: { to: string; title: string; line: string; image: IsaImage }[] = [
  {
    to: "/programs",
    title: "Programs",
    line: "Memberships, seasons, Squash & School.",
    image: IMG.clinic,
  },
  {
    to: "/camps",
    title: "Camps",
    line: "Intensive weeks. Total focus.",
    image: IMG.camp,
  },
  {
    to: "/academy",
    title: "Academy",
    line: "The facility, the founder, the players.",
    image: IMG.facility,
  },
]

export default function Home() {
  return (
    <div className="pb-8">
      <Hero />

      {/* the film */}
      <section className="mx-auto mt-16 max-w-4xl px-4 lg:mt-24" aria-label="The academy film">
        <Reveal>
          <Film />
        </Reveal>
      </section>

      {/* credibility — one tight black band */}
      <section className="mt-16 bg-ink py-14 lg:mt-24" aria-label="The standard">
        <Reveal>
          <p className="mx-auto max-w-3xl px-4 text-center font-display text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl">
            We measure ourselves by what
            <br />
            our athletes go on to do.
          </p>
        </Reveal>
      </section>

      {/* photo doorway cards */}
      <section className="mx-auto mt-16 max-w-6xl px-4 lg:mt-24" aria-label="Explore the academy">
        <div className="grid gap-5 md:grid-cols-3">
          {DOORWAYS.map((d, i) => (
            <Reveal key={d.to} delay={i * 0.06}>
              <Link to={d.to} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={d.image.src}
                    alt={d.image.alt}
                    width={d.image.width}
                    height={d.image.height}
                    loading="lazy"
                    className="photo aspect-[4/3] w-full object-cover transition-transform duration-(--dur-slow) ease-(--ease) group-hover:scale-[1.03]"
                  />
                </div>
                <h2 className="mt-5 font-display text-2xl uppercase tracking-wide">
                  {d.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{d.line}</p>
                <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-(--dur-fast) ease-(--ease) group-hover:text-gold-text">
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
