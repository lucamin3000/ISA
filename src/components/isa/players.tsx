import { TOKENS } from "@/content/site"
import { Container, GoldRule, Kicker, Reveal, Token } from "./primitives"

/**
 * FEATURED PLAYERS — a horizontally scrollable, scroll-snap row of
 * typographic cards: gold numeral, name token, credential token.
 * No portraits. Cards vary in width and one inverts to black —
 * not an identical row.
 */
function PlayerCard({
  index,
  wide = false,
  dark = false,
}: {
  index: string
  wide?: boolean
  dark?: boolean
}) {
  return (
    <article
      className={`flex shrink-0 snap-start flex-col justify-between border-t-2 p-7 ${
        wide ? "w-[min(21rem,78vw)]" : "w-[min(16.5rem,68vw)]"
      } ${dark ? "border-gold bg-ink text-white" : "border-ink bg-white"}`}
      style={{ minHeight: "18rem" }}
    >
      <p className="font-display text-5xl font-bold text-gold" aria-hidden>
        {index}
      </p>
      <div>
        <p className="font-display text-lg font-semibold leading-snug">
          <Token dark={dark}>{TOKENS.playerName}</Token>
        </p>
        <p className={`mt-2 text-sm ${dark ? "text-muted-dark" : "text-muted-foreground"}`}>
          {TOKENS.playerCred}
        </p>
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
              Every card is a flagged placeholder — no names publish until the
              client supplies its roster.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
              role="list"
              aria-label="Featured players (placeholder cards)"
            >
              <PlayerCard index="01" wide dark />
              <PlayerCard index="02" />
              <PlayerCard index="03" />
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
