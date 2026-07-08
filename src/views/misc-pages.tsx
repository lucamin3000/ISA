import { useState, type FormEvent } from "react"
import { Phone, MessageSquareText } from "lucide-react"
import { IMG, PHONE_DISPLAY, PHONE_TEL } from "@/content/site"
import { GoldCTA, Kicker, PageHero, QuietLine, Reveal } from "@/components/chrome/shared"

/** BLOG — list layout; first posts publish when there is news to report. */
export function Blog() {
  return (
    <div>
      <PageHero
        image={IMG.arena}
        kicker="Inspire Squash Academy"
        title="Blog"
        purpose="News and notes from the academy."
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <Reveal>
          <QuietLine>First posts soon. Season notes, results, and coaching write-ups.</QuietLine>
          <GoldCTA to="/book" className="mt-8">
            Contact the academy
          </GoldCTA>
        </Reveal>
      </section>
    </div>
  )
}

/** RESOURCES — just the logo and the links. */
export function Resources() {
  const LINKS = [
    { label: "Book a session", to: "/book" },
    { label: "Annual training", to: "/annual-training" },
    { label: "Summer camps", to: "/summer-camps" },
    { label: "School and Squash", to: "/school-and-squash" },
    { label: "Meet the coaches", to: "/coaches" },
    { label: "First Swings", to: "/first-swings" },
  ]
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-14 text-center">
        <p className="font-display text-6xl uppercase leading-none tracking-wide text-ink">
          ISA<span className="text-gold">.</span>
        </p>
        <h1 className="mt-6 font-display text-3xl uppercase tracking-wide text-ink">Resources</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Quick links to every part of the academy.
        </p>
        <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
          {LINKS.map((l, i) => (
            <Reveal key={l.to + l.label} delay={i * 0.03}>
              <a
                href={l.to}
                className="block border-2 border-ink px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-(--dur-fast) ease-(--ease) hover:border-gold hover:text-gold-text"
              >
                {l.label}
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}

/** BOOK NOW — a working booking page: call or text the academy directly,
 *  or pick a date and time and the form composes the text message for you. */
export function Book() {
  const [msg, setMsg] = useState("")
  const OPTIONS = [
    { title: "Intro lesson", body: "Assessment, plan, and first session in one visit.", image: IMG.intro },
    { title: "Squad training", body: "Weekly squads, placed by assessment.", image: IMG.fall },
    { title: "Summer camp week", body: "Full days for committed juniors.", image: IMG.camp },
    { title: "Individual coaching", body: "One-to-one blocks with an ISA coach.", image: IMG.clinic },
  ]
  const TIMES = ["Morning (7-10)", "Midday (10-2)", "After school (3-6)", "Evening (6-9)"]
  const today = new Date().toISOString().slice(0, 10)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const program = (f.elements.namedItem("program") as HTMLSelectElement).value
    const date = (f.elements.namedItem("date") as HTMLInputElement).value
    const time = (f.elements.namedItem("time") as HTMLSelectElement).value
    const name = (f.elements.namedItem("name") as HTMLInputElement).value.trim()
    if (!date) {
      setMsg("Pick a date first.")
      return
    }
    const body = `Hi ISA, I'd like to book ${program} on ${date} (${time}).${name ? ` From ${name}.` : ""}`
    setMsg(`Opening your messages. If nothing happens, text ${PHONE_DISPLAY} and say: "${body}"`)
    window.location.href = `sms:${PHONE_TEL}?body=${encodeURIComponent(body)}`
  }

  return (
    <div>
      <PageHero
        image={IMG.camp}
        kicker="Inspire Squash Academy"
        title="Book a Lesson"
        purpose="Call, text, or request a time to get on court."
        compact
      />

      {/* direct contact — one tap */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center" aria-labelledby="bk-call">
        <Reveal>
          <Kicker>Fastest way</Kicker>
          <h2 id="bk-call" className="mt-2 font-display text-3xl uppercase tracking-wide">
            Call or text the academy
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex min-h-12 items-center gap-2 bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-gold-deep"
            >
              <Phone className="size-4" aria-hidden /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={`sms:${PHONE_TEL}`}
              className="inline-flex min-h-12 items-center gap-2 border-2 border-ink px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-(--dur-fast) ease-(--ease) hover:border-gold hover:text-gold-text"
            >
              <MessageSquareText className="size-4" aria-hidden /> Text us
            </a>
          </div>
        </Reveal>
      </section>

      {/* options + slot form side by side on laptop */}
      <section className="mx-auto max-w-6xl px-4 pb-4" aria-label="Booking options">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
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
      </section>

      {/* request a slot — composes the text message for you */}
      <section className="mt-10 bg-paper-warm py-12" aria-labelledby="bk-cal">
        <Reveal className="mx-auto max-w-4xl px-4 text-center">
          <Kicker>Or request a time</Kicker>
          <h2 id="bk-cal" className="mt-2 font-display text-3xl uppercase tracking-wide">
            Pick a slot
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose what and when. We draft the text to{" "}
            <a href={`tel:${PHONE_TEL}`} className="border-b border-gold text-ink hover:text-gold-text">
              {PHONE_DISPLAY}
            </a>{" "}
            for you.
          </p>
          <form className="mx-auto mt-8 grid max-w-3xl gap-4 text-left sm:grid-cols-2" onSubmit={onSubmit}>
            <label className="grid gap-1 text-sm font-semibold uppercase tracking-[0.08em] sm:col-span-2">
              Program
              <select
                name="program"
                className="min-h-11 border-2 border-ink bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal focus-visible:border-gold"
              >
                {OPTIONS.map((o) => (
                  <option key={o.title}>{o.title}</option>
                ))}
              </select>
            </label>
            <div className="contents">
              <label className="grid gap-1 text-sm font-semibold uppercase tracking-[0.08em]">
                Date
                <input
                  type="date"
                  name="date"
                  min={today}
                  required
                  className="min-h-11 border-2 border-ink bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal focus-visible:border-gold"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold uppercase tracking-[0.08em]">
                Time
                <select
                  name="time"
                  className="min-h-11 border-2 border-ink bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal focus-visible:border-gold"
                >
                  {TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="grid gap-1 text-sm font-semibold uppercase tracking-[0.08em] sm:col-span-2">
              Your name <span className="font-normal normal-case text-muted-foreground">(optional)</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                className="min-h-11 border-2 border-ink bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal focus-visible:border-gold"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex min-h-12 items-center justify-center bg-gold sm:col-span-2 px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-gold-deep"
            >
              Send booking text
            </button>
            <p role="status" aria-live="polite" className="min-h-6 text-center text-sm text-muted-foreground sm:col-span-2">
              {msg}
            </p>
          </form>
        </Reveal>
      </section>
    </div>
  )
}
