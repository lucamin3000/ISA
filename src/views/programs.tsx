import { IMG } from "@/content/site"
import type { IsaImage } from "@/content/site"
import {
  GoldCTA,
  Kicker,
  Monument,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

/** Photo-led program block: image, title, short description, one CTA. */
function ProgramBlock({
  image,
  kicker,
  title,
  children,
  cta,
  flip = false,
  note,
}: {
  image: IsaImage
  kicker: string
  title: string
  children: string
  cta: string
  flip?: boolean
  note?: string
}) {
  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-2">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className={`photo aspect-[4/3] w-full object-cover ${flip ? "md:order-2" : ""}`}
        />
        <div>
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {children}
          </p>
          {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}
          <GoldCTA to="/contact" className="mt-6">
            {cta}
          </GoldCTA>
        </div>
      </article>
    </Reveal>
  )
}

export default function Programs() {
  return (
    <div className="pb-8">
      <section className="px-4 pt-14 lg:pt-20" aria-labelledby="pr-h">
        <Reveal>
          <Kicker className="mb-4 text-center">Programs</Kicker>
          <Monument id="pr-h">
            Train
            <br />
            all year.
          </Monument>
        </Reveal>
      </section>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-20 px-4 lg:mt-20 lg:gap-28">
        <ProgramBlock
          image={IMG.arena}
          kicker="The core of the academy"
          title="Memberships"
          cta="Enquire about membership"
          note="Training calendars publish soon."
        >
          Year-round training plans: individual technical work, squad
          sessions, sparring ladders and weekly match play. Placement by
          assessment, not age.
        </ProgramBlock>

        <ProgramBlock
          image={IMG.fall}
          kicker="Seasonal training"
          title="The Fall Block"
          cta="Enquire about Fall"
          flip
          note="Season dates publish soon."
        >
          A full season of structured development — squads built around
          school terms and ranking events, with progress reviewed every
          block.
        </ProgramBlock>

        <ProgramBlock
          image={IMG.clinic}
          kicker="For student athletes"
          title="Squash & School"
          cta="Explore the program"
        >
          Serious training shouldn't cost a serious education. Daily
          on-court development built around the school day — supervised
          study blocks, progress reports for parents, coordination with
          each athlete's school.
        </ProgramBlock>
      </div>

      <QuietLine className="mt-16 lg:mt-24">
        Not sure where you fit? Every athlete starts with an assessment
        session.
      </QuietLine>
    </div>
  )
}
