import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { QuietLine } from "./shared"

/**
 * Multi-part footer mirroring the model's structure: two-column
 * location/contact block, centered newsletter capture, partner row
 * (quiet until real), then the legal line. One consolidated
 * photography credit covers the licensed set; coach comps are FPO,
 * local prototype only.
 */
export function Footer() {
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
    <footer className="mt-24 border-t border-border bg-white pt-14">
      <div className="mx-auto max-w-6xl px-4">
        {/* locations & contact — two columns */}
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left">
          <div>
            <h2 className="font-display text-xl uppercase tracking-wide">Visit</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ISA Squash Center — location details publish soon.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl uppercase tracking-wide">Contact</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Email and phone publish soon. Use{" "}
              <Link to="/book" className="border-b border-gold text-ink hover:text-gold-text">
                Book Now
              </Link>{" "}
              to reach the academy.
            </p>
          </div>
        </div>

        {/* newsletter — centered capture */}
        <div className="mx-auto mt-12 max-w-xl border-t border-border pt-10 text-center">
          <h2 className="font-display text-2xl uppercase tracking-wide">
            Want tips from the pros?
          </h2>
          <form className="mt-5" noValidate onSubmit={onSubmit}>
            <label htmlFor="ft-email" className="block text-sm text-muted-foreground">
              Training notes from ISA coaches. No spam, unsubscribe anytime.
            </label>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <input
                id="ft-email"
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
            <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-muted-foreground">
              {msg}
            </p>
          </form>
        </div>

        {/* partner row — nothing invented */}
        <div className="mt-10 border-t border-border pt-8 text-center">
          <QuietLine>Partners announcing soon.</QuietLine>
        </div>

        {/* legal */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-border py-8 text-center">
          <Link
            to="/"
            className="font-display text-2xl uppercase leading-none tracking-wide text-ink"
            aria-label="Inspire Squash Academy — home"
          >
            ISA.
          </Link>
          <p className="max-w-4xl text-[0.6875rem] leading-relaxed text-muted-foreground">
            Photography: Wikimedia Commons — Simpkin98 · Vinod Divakaran · Ameykhanolkar ·
            Saravanan Alagarsamy · Ian Butterworth · Jens B. Nielsen · Poly Haven · Doha Stadium
            Plus (pictured: M. El Shorbagy, R. Ashour, M. Elshorbagy) — CC BY 2.0 / CC BY-SA
            2.0–4.0 / CC0. Coach imagery: FPO comps, clear or replace before publication.
            Video dialog: 21st.dev Magic UI.
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Inspire Squash Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
