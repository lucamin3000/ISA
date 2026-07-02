import { IMG } from "@/content/site"
import { Container, GoldRule, Kicker, PhotoCredit, Reveal } from "./primitives"

/**
 * SQUASH & SCHOOL — staggered image cluster bleeding off the left edge;
 * the text column sits narrow and high on the right.
 */
export function School() {
  return (
    <section id="school" className="bg-paper-warm" aria-labelledby="sch-h">
      <Container>
        <div className="rally-grid items-center py-20 lg:py-28">
          <Reveal className="col-span-4 lg:col-span-7">
            <div className="bleed-left relative pb-16 lg:pb-20">
              <img
                src={IMG.clinic.src}
                alt={IMG.clinic.alt}
                width={IMG.clinic.width}
                height={IMG.clinic.height}
                loading="lazy"
                className="w-[84%] object-cover"
              />
              <img
                src={IMG.arena.src}
                alt={IMG.arena.alt}
                width={IMG.arena.width}
                height={IMG.arena.height}
                loading="lazy"
                className="absolute bottom-0 right-0 w-[52%] border-[6px] border-white object-cover shadow-[0_16px_40px_rgba(11,10,8,0.16)]"
              />
            </div>
            <PhotoCredit image={IMG.clinic} className="max-w-[60%]" />
          </Reveal>

          <Reveal delay={0.08} className="col-span-4 lg:col-span-4 lg:col-start-9">
            <Kicker>For student athletes</Kicker>
            <h2 id="sch-h" className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              Squash &amp; School
            </h2>
            <GoldRule />
            <p className="text-muted-foreground">
              Serious training shouldn&rsquo;t cost a serious education. Squash
              &amp; School builds daily on-court development around the school
              day — supervised study blocks, progress reports for parents,
              coordination with each athlete&rsquo;s school.
            </p>
            <p className="mt-4 text-muted-foreground">
              Designed for juniors targeting ranking events and, eventually,
              college squash.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex min-h-11 items-center border border-ink px-7 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold hover:text-gold-text"
            >
              Explore the program
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
