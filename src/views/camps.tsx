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
      <section className="px-4 pt-14 lg:pt-20" aria-labelledby="ca-h">
        <Reveal>
          <Kicker className="mb-4 text-center">Camps</Kicker>
          <Monument id="ca-h">
            Earn your
            <br />
            summer.
          </Monument>
        </Reveal>
      </section>

      {/* camp — photo-led feature */}
      <Reveal className="mt-14 lg:mt-20">
        <PhotoBand image={IMG.camp} priority />
      </Reveal>
      <section className="mx-auto mt-10 max-w-3xl px-4 text-center" aria-labelledby="camp-h">
        <Reveal>
          <h2 id="camp-h" className="font-display text-4xl uppercase tracking-wide">
            Elite Summer Camp
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Full-day intensives for committed juniors: morning fitness,
            technical blocks, tactical video review, afternoon competition.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Camp weeks publish soon.</p>
          <GoldCTA to="/contact" className="mt-6">
            Reserve a week
          </GoldCTA>
        </Reveal>
      </section>

      {/* intro pass — photo-led block */}
      <section className="mx-auto mt-20 max-w-6xl px-4 lg:mt-28" aria-labelledby="ip-h">
        <Reveal>
          <article className="grid items-center gap-8 md:grid-cols-2">
            <img
              src={IMG.intro.src}
              alt={IMG.intro.alt}
              width={IMG.intro.width}
              height={IMG.intro.height}
              loading="lazy"
              className="photo aspect-[4/3] w-full object-cover"
            />
            <div>
              <Kicker>New to squash?</Kicker>
              <h2 id="ip-h" className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                The Intro Pass
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                One assessment session with an ISA coach, a personal
                development plan, and your first group session — all in one
                visit. No experience, no equipment, no problem.
              </p>
              <GoldCTA to="/contact" className="mt-6">
                Book your intro pass
              </GoldCTA>
            </div>
          </article>
        </Reveal>
      </section>

      <QuietLine className="mt-16 lg:mt-24">
        Camps fill by assessment order — enquire early.
      </QuietLine>
    </div>
  )
}
