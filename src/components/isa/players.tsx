import { IMG, TOKENS } from "@/content/site"
import type { IsaImage } from "@/content/site"
import { Container, GoldRule, Kicker, Reveal } from "./primitives"

/**
 * FEATURED PLAYERS — a horizontally scrollable row with scroll-snap.
 * Cards vary in width (feature card widest); every name is a flagged
 * placeholder and every photo carries a visible stand-in caption.
 */
function PlayerCard({
  image,
  wide = false,
}: {
  image: IsaImage
  wide?: boolean
}) {
  return (
    <article
      className={`snap-start shrink-0 border border-border bg-white ${
        wide ? "w-[min(21rem,78vw)]" : "w-[min(16.5rem,68vw)]"
      }`}
    >
      <figure className="m-0">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className={`w-full object-cover ${wide ? "aspect-[3/4]" : "aspect-[3/4.4]"}`}
        />
        <figcaption className="px-5 pt-2 text-[0.6875rem] uppercase tracking-[0.04em] text-muted-foreground">
          {image.credit}
        </figcaption>
      </figure>
      <div className="px-5 pb-6 pt-2">
        <p className="font-display text-lg font-semibold leading-snug">{TOKENS.playerName}</p>
        <p className="mt-1 text-sm text-muted-foreground">{TOKENS.playerCred}</p>
      </div>
    </article>
  )
}

export function Players() {
  return (
    <section id="players" className="border-t border-border" aria-labelledby="pl-h">
      <Container>
        <div className="py-20 lg:py-24">
          <Reveal>
            <Kicker>The people around the academy</Kicker>
            <h2 id="pl-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              Featured players
            </h2>
            <GoldRule />
            <p className="max-w-[38rem] text-[1.0625rem] text-muted-foreground">
              Every card is a placeholder. The photographs are licensed
              stand-ins of professional players — <strong>not ISA
              ambassadors</strong> — and no names publish until the client
              supplies its roster.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
              role="list"
              aria-label="Featured players (placeholder cards)"
            >
              <PlayerCard image={IMG.amb1} wide />
              <PlayerCard image={IMG.amb2} />
              <PlayerCard image={IMG.amb3} />
              <div className="flex w-[min(16.5rem,68vw)] shrink-0 snap-start items-center justify-center border border-dashed border-gold p-8 text-center text-sm text-muted-foreground">
                {TOKENS.nextPlayer}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
