import { useState, type FormEvent } from "react"
import { IMG } from "@/content/site"
import { GoldCTA, Kicker, PageHero, QuietLine, Reveal } from "@/components/chrome/shared"

/** BLOG — list layout; first posts publish when there is news to report. */
export function Blog() {
  return (
    <div>
      <PageHero image={IMG.arena} kicker="Blog" title="Notes from the academy" compact />
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Reveal>
          <QuietLine>First posts publish soon — season notes, results and coaching essays.</QuietLine>
          <GoldCTA to="/book" className="mt-8">
            Talk to the academy
          </GoldCTA>
        </Reveal>
      </section>
    </div>
  )
}

/** RESOURCES — a simple centered link list (the model links out here). */
export function Resources() {
  const LINKS = [
    { label: "Book a session", to: "/book" },
    { label: "Annual training", to: "/annual-training" },
    { label: "Summer camps", to: "/summer-camps" },
    { label: "School & Squash", to: "/school-and-squash" },
    { label: "Meet the coaches", to: "/coaches" },
  ]
  return (
    <div>
      <PageHero image={IMG.facility} kicker="Resources" title="Everything ISA, one page" compact />
      <section className="mx-auto max-w-md px-4 py-16">
        <ul className="flex flex-col gap-3">
          {LINKS.map((l, i) => (
            <Reveal key={l.to + l.label} delay={i * 0.04}>
              <a
                href={l.to}
                className="block border-2 border-ink px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-(--dur-fast) ease-(--ease) hover:border-gold hover:text-gold-text"
              >
                {l.label}
              </a>
            </Reveal>
          ))}
        </ul>
        <QuietLine className="mt-8">Guides and downloads publish soon.</QuietLine>
      </section>
    </div>
  )
}

/** BOOK NOW — mirrors the model's booking catalog as an enquiry grid. */
export function Book() {
  const [msg, setMsg] = useState("")
  const OPTIONS = [
    { title: "Intro lesson", body: "Assessment, plan, first session — one visit.", image: IMG.intro },
    { title: "Squad training", body: "Weekly squads, placed by assessment.", image: IMG.fall },
    { title: "Summer camp week", body: "Full-day intensives for committed juniors.", image: IMG.camp },
    { title: "Individual coaching", body: "One-to-one blocks with an ISA coach.", image: IMG.clinic },
  ]

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement
    if (!input.value || !input.checkValidity()) {
      setMsg("Please enter a valid email address.")
      input.focus()
      return
    }
    setMsg("Thank you — booking opens soon and you'll hear first.")
    e.currentTarget.reset()
  }

  return (
    <div>
      <PageHero image={IMG.camp} kicker="Book now" title="Get on court" compact />
      <section className="mx-auto max-w-6xl px-4 py-16" aria-label="Booking options">
        <Reveal>
          <QuietLine>Online booking opens soon — leave your email and you'll hear first.</QuietLine>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {OPTIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.04}>
              <article className="flex h-full flex-col border border-border bg-white">
                <img src={o.image.src} alt={o.image.alt} loading="lazy" className="photo aspect-[4/3] w-full object-cover" />
                <div className="flex flex-1 flex-col p-4 text-center">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">{o.title}</h3>
                  <p className="mt-1 flex-1 text-xs text-muted-foreground">{o.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-14 max-w-xl text-center">
          <Kicker>Enquiries</Kicker>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-wide">Hear when booking opens</h2>
          <form className="mt-6" noValidate onSubmit={onSubmit}>
            <label htmlFor="bk-email" className="block text-sm text-muted-foreground">
              One email when enrolment opens. No spam.
            </label>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <input
                id="bk-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="min-h-11 min-w-56 flex-1 border-2 border-ink bg-transparent px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus-visible:border-gold"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center bg-gold px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-gold-deep"
              >
                Notify me
              </button>
            </div>
            <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-muted-foreground">
              {msg}
            </p>
          </form>
        </Reveal>
      </section>
    </div>
  )
}
