import { TOKENS } from "@/content/site"
import { Container, GoldRule, Kicker, Reveal, Token } from "./primitives"

/**
 * FACILITY — tight band. The location "card" is a black panel that starts
 * mid-grid and bleeds off the RIGHT edge (the mirror of the programs band);
 * the address ships as a flagged token — no invented streets.
 */
export function Facility() {
  return (
    <section id="location" className="bg-paper-warm" aria-labelledby="loc-h">
      <Container>
        <div className="rally-grid items-center py-16 lg:py-20">
          <Reveal className="col-span-4 lg:col-span-3">
            <Kicker>Where we train</Kicker>
            <h2 id="loc-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              The academy
            </h2>
            <GoldRule />
            <p className="max-w-[24rem] text-[1.0625rem] text-muted-foreground">
              Courts, strength &amp; conditioning, video analysis — facility
              details publish here once confirmed.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="col-span-4 lg:col-span-8 lg:col-start-5">
            <div className="bleed-right bg-ink px-6 py-12 text-white sm:px-10 lg:py-16 lg:pr-[max(2.5rem,calc(50vw-40rem))]">
              <h3 className="font-display text-3xl font-semibold">
                ISA Squash Center<span className="text-gold">.</span>
              </h3>
              <p className="mt-4">
                <Token dark>{TOKENS.address}</Token>
              </p>
              <p className="mt-3">
                <Token dark>{TOKENS.secondLocation}</Token>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
