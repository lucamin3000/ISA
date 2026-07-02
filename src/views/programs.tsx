import { IMG } from "@/content/site"
import {
  GoldCTA,
  Kicker,
  Monument,
  PhotoBand,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

export default function Programs() {
  return (
    <div className="pb-8">
      <section className="px-4 pt-16 lg:pt-20" aria-labelledby="pr-h">
        <Reveal>
          <Kicker className="mb-5 text-center">Programs</Kicker>
          <Monument id="pr-h">
            Train
            <br />
            all year<span className="text-gold">.</span>
          </Monument>
        </Reveal>
      </section>

      {/* cinematic moment */}
      <Reveal className="mt-14 lg:mt-20">
        <PhotoBand image={IMG.fall} priority />
      </Reveal>

      {/* memberships + the fall season — balanced pair, membership dominant */}
      <section className="mx-auto mt-16 max-w-5xl px-4 lg:mt-24" aria-label="Memberships and seasons">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="flex">
            <div className="flex w-full flex-col items-center gap-6 bg-ink px-8 py-14 text-center text-white">
              <h2 className="font-display text-4xl uppercase tracking-wide">Memberships</h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-dark">
                Year-round training plans — the core of the academy. Individual
                technical work, squad sessions, sparring ladders and weekly
                match play. Placement by assessment, not age.
              </p>
              <GoldCTA to="/contact">Enquire</GoldCTA>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="flex">
            <div className="flex w-full flex-col items-center gap-6 border-2 border-ink px-8 py-10 text-center md:my-8">
              <h2 className="font-display text-3xl uppercase tracking-wide">The Fall Block</h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                A full season of structured development, September to December
                in spirit — squads built around school terms and ranking
                events.
              </p>
              <QuietLine>Season dates publish soon.</QuietLine>
            </div>
          </Reveal>
        </div>
      </section>

      {/* squash & school — spacious close */}
      <section className="mx-auto mt-20 max-w-5xl px-4 lg:mt-28" aria-labelledby="ss-h">
        <Reveal>
          <Kicker className="mb-4 text-center">For student athletes</Kicker>
          <h2
            id="ss-h"
            className="text-center font-display text-4xl uppercase tracking-wide sm:text-5xl"
          >
            Squash &amp; School
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground">
            Serious training shouldn&rsquo;t cost a serious education. Daily
            on-court development built around the school day — supervised study
            blocks, progress reports for parents, coordination with each
            athlete&rsquo;s school.
          </p>
          <div className="mt-8 text-center">
            <GoldCTA to="/contact">Explore the program</GoldCTA>
          </div>
        </Reveal>
        <Reveal className="mt-14">
          <PhotoBand image={IMG.clinic} aspect="aspect-[2/1]" />
        </Reveal>
      </section>
    </div>
  )
}
