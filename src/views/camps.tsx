import { IMG } from "@/content/site"
import {
  GoldCTA,
  Kicker,
  Monument,
  PhotoBand,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

export default function Camps() {
  return (
    <div className="pb-8">
      <section className="px-4 pt-16 lg:pt-20" aria-labelledby="ca-h">
        <Reveal>
          <Kicker className="mb-5 text-center">Camps</Kicker>
          <Monument id="ca-h">
            Earn your
            <br />
            summer<span className="text-gold">.</span>
          </Monument>
        </Reveal>
      </section>

      {/* cinematic moment */}
      <Reveal className="mt-14 lg:mt-20">
        <PhotoBand image={IMG.camp} priority />
      </Reveal>

      {/* camp (dominant) + intro pass (subordinate) — balanced, weighted */}
      <section className="mx-auto mt-16 max-w-5xl px-4 lg:mt-24" aria-label="Camps and the intro pass">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="flex">
            <div className="flex w-full flex-col items-center gap-6 bg-ink px-8 py-14 text-center text-white">
              <h2 className="font-display text-4xl uppercase tracking-wide">
                Elite Summer Camp
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-dark">
                Full-day intensives for committed juniors: morning fitness,
                technical blocks, tactical video review, afternoon competition.
              </p>
              <QuietLine className="text-muted-dark">Camp weeks publish soon.</QuietLine>
              <GoldCTA to="/contact">Reserve a week</GoldCTA>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="flex">
            <div className="flex w-full flex-col items-center gap-6 border-2 border-ink px-8 py-10 text-center md:my-8">
              <h2 className="font-display text-3xl uppercase tracking-wide">The Intro Pass</h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                New to squash? One assessment session with an ISA coach, a
                personal development plan, and your first group session — all
                in one visit. No experience, no equipment, no problem.
              </p>
              <GoldCTA to="/contact">Book your intro pass</GoldCTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* spacious close */}
      <Reveal className="mt-20 lg:mt-28">
        <PhotoBand image={IMG.intro} aspect="aspect-[2/1]" />
      </Reveal>
    </div>
  )
}
