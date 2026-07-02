import { IMG, TOKENS } from "@/content/site"
import { Container, GoldRule, Kicker, PhotoCredit, Reveal, Token } from "./primitives"

/**
 * FACILITY — tight band. One wide location card; the address ships as a
 * flagged token (no invented streets), with a slot for a second location.
 */
export function Facility() {
  return (
    <section id="location" className="bg-paper-warm" aria-labelledby="loc-h">
      <Container>
        <div className="rally-grid items-end py-16 lg:py-20">
          <Reveal className="col-span-4 lg:col-span-8">
            <Kicker>Where we train</Kicker>
            <h2 id="loc-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              The academy
            </h2>
            <GoldRule />
            <figure className="m-0">
              <img
                src={IMG.facility.src}
                alt={IMG.facility.alt}
                width={IMG.facility.width}
                height={IMG.facility.height}
                loading="lazy"
                className="aspect-[21/9] w-full object-cover"
              />
            </figure>
            <PhotoCredit image={IMG.facility} />
            <div className="mt-5">
              <h3 className="font-display text-2xl font-semibold">ISA Squash Center</h3>
              <p className="mt-2">
                <Token>{TOKENS.address}</Token>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="col-span-4 lg:col-span-3 lg:col-start-10">
            <p className="max-w-[24rem] text-[1.0625rem] text-muted-foreground">
              Courts, strength &amp; conditioning, video analysis — facility
              details publish here once confirmed.
            </p>
            <p className="mt-5">
              <Token>{TOKENS.secondLocation}</Token>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
