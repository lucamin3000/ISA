import { TOKENS } from "@/content/site"
import { Container, Kicker, Reveal } from "./primitives"

/**
 * CREDIBILITY — black band. Key line huge, hard-left, one gold rule under it.
 * No invented statistics: the results slots ship as flagged placeholders
 * until the client supplies verifiable numbers.
 */
export function Credibility() {
  return (
    <section id="about" className="bg-ink text-white" aria-labelledby="cred-h">
      <Container>
        <div className="rally-grid py-20 lg:py-28">
          <Reveal className="col-span-4 lg:col-span-9">
            <Kicker dark>The ISA standard</Kicker>
            <p
              id="cred-h"
              className="mt-5 max-w-[16ch] font-display text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-6xl"
            >
              We measure ourselves by what our athletes{" "}
              <em className="not-italic text-gold">go on to do.</em>
            </p>
            <hr className="mt-8 h-0.5 w-14 border-0 bg-gold" />
          </Reveal>

          <div className="col-span-4 mt-4 lg:col-span-7 lg:col-start-6 lg:mt-10">
            <Reveal>
              <p className="max-w-[38rem] text-[1.0625rem] text-muted-dark">
                Development you can point to — rankings earned, college places
                won, players still on court twenty years on. This academy
                publishes no statistic it cannot stand behind; these panels stay
                empty until the results exist and are verified.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-dashed border-gold p-6">
                  <p className="font-display text-lg text-gold">Results, when they're real.</p>
                  <p className="mt-2 text-sm text-muted-dark">{TOKENS.statResults}</p>
                </div>
                <div className="border border-dashed border-gold p-6">
                  <p className="font-display text-lg text-gold">Numbers, when they're earned.</p>
                  <p className="mt-2 text-sm text-muted-dark">{TOKENS.statNumbers}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
