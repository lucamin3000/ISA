import { IMG } from "@/content/site"
import {
  Kicker,
  Monument,
  PhotoBand,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

export default function Academy() {
  return (
    <div className="pb-8">
      <section className="px-4 pt-16 lg:pt-20" aria-labelledby="ac-h">
        <Reveal>
          <Kicker className="mb-4 text-center">Academy</Kicker>
          <Monument id="ac-h">
            The
            <br />
            academy.
          </Monument>
        </Reveal>
      </section>

      {/* the facility — cinematic moment */}
      <section className="mt-14 lg:mt-20" aria-labelledby="fa-h">
        <Reveal>
          <PhotoBand image={IMG.facility} priority />
          <h2 id="fa-h" className="mt-10 text-center font-display text-4xl uppercase tracking-wide">
            The facility
          </h2>
          <QuietLine className="mt-4">
            Courts, strength &amp; conditioning, video analysis — location
            details publish soon.
          </QuietLine>
        </Reveal>
      </section>

      {/* the founder — tight black band, axial */}
      <section className="mt-20 bg-ink py-16 lg:mt-28" aria-labelledby="fo-h">
        <Reveal>
          <div className="mx-auto max-w-3xl px-4 text-center text-white">
            <Kicker className="mb-4 text-muted-dark">Founder &amp; head coach</Kicker>
            <h2 id="fo-h" className="font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Karim Ibrahim
            </h2>
            <p className="mt-6 text-sm text-muted-dark">Full profile publishing soon.</p>
          </div>
        </Reveal>
      </section>

      {/* featured players — spacious close */}
      <section className="mx-auto mt-20 max-w-5xl px-4 lg:mt-28" aria-labelledby="pl-h">
        <Reveal>
          <h2 id="pl-h" className="text-center font-display text-4xl uppercase tracking-wide">
            Featured players
          </h2>
          <QuietLine className="mt-4">Player roster publishing soon.</QuietLine>
        </Reveal>
        {/* weighted trio on the axis: center portrait dominant */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-3 items-center gap-4">
            <img
              src={IMG.amb1.src}
              alt={IMG.amb1.alt}
              width={IMG.amb1.width}
              height={IMG.amb1.height}
              loading="lazy"
              className="photo aspect-[3/4] w-full object-cover"
            />
            <img
              src={IMG.amb2.src}
              alt={IMG.amb2.alt}
              width={IMG.amb2.width}
              height={IMG.amb2.height}
              loading="lazy"
              className="photo aspect-[3/4.6] w-full object-cover"
            />
            <img
              src={IMG.amb3.src}
              alt={IMG.amb3.alt}
              width={IMG.amb3.width}
              height={IMG.amb3.height}
              loading="lazy"
              className="photo aspect-[3/4] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>
    </div>
  )
}
