import { useState, type FormEvent } from "react"
import { IMG } from "@/content/site"
import {
  Kicker,
  Monument,
  PhotoBand,
  QuietLine,
  Reveal,
} from "@/components/chrome/shared"

export default function Contact() {
  const [msg, setMsg] = useState("")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement
    if (!input.value || !input.checkValidity()) {
      setMsg("Please enter a valid email address.")
      input.focus()
      return
    }
    setMsg("Thank you — sign-up opens soon.")
    e.currentTarget.reset()
  }

  return (
    <div className="pb-8">
      <section className="px-4 pt-16 lg:pt-20" aria-labelledby="co-h">
        <Reveal>
          <Kicker className="mb-4 text-center">Contact</Kicker>
          <Monument id="co-h">
            Join the
            <br />
            academy.
          </Monument>
        </Reveal>
      </section>

      {/* newsletter — tight band on the axis */}
      <section className="mx-auto mt-16 max-w-xl px-4 lg:mt-24" aria-labelledby="nl-h">
        <Reveal>
          <h2 id="nl-h" className="text-center font-display text-3xl uppercase tracking-wide">
            Want tips from the pros?
          </h2>
          <form className="mt-8" noValidate onSubmit={onSubmit}>
            <label
              htmlFor="nl-email"
              className="block text-center text-sm text-muted-foreground"
            >
              Training notes from ISA coaches. No spam, unsubscribe anytime.
            </label>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <input
                id="nl-email"
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
                Subscribe
              </button>
            </div>
            <p role="status" aria-live="polite" className="mt-4 min-h-6 text-center text-sm text-muted-foreground">
              {msg}
            </p>
          </form>
        </Reveal>
      </section>

      {/* contact details — unverified content collapses to one quiet line */}
      <section className="mt-16 lg:mt-24" aria-label="Contact details">
        <Reveal>
          <QuietLine>Location, email and phone publish soon.</QuietLine>
        </Reveal>
      </section>

      {/* spacious close */}
      <Reveal className="mt-16 lg:mt-24">
        <PhotoBand image={IMG.arena} aspect="aspect-[2/1]" />
      </Reveal>
    </div>
  )
}
