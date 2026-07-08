import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { COACH, PHONE_DISPLAY, PHONE_TEL } from "@/content/site"

/**
 * Footer mirroring the model's black footer structure: player photo and
 * location columns left, brand lockup center, newsletter capture and
 * partner block right, legal line at the bottom. All content is ISA's own.
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
    setMsg("Thank you. Sign-up opens soon.")
    e.currentTarget.reset()
  }

  return (
    <footer className="mt-20 bg-ink pb-8 pt-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.1fr_0.8fr_1.1fr]">
        {/* left: photo + locations + phone */}
        <div className="flex gap-6">
          <img
            src={COACH.action.src}
            alt={COACH.action.alt}
            loading="lazy"
            className="photo hidden h-56 w-36 shrink-0 object-cover object-left sm:block"
          />
          <div className="grid content-start gap-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold uppercase tracking-[0.1em]">ISA Squash Center</p>
              <p className="mt-1 text-white/60">Address coming soon.</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-[0.1em]">Second location</p>
              <p className="mt-1 text-white/60">Opening soon.</p>
            </div>
            <p className="sm:col-span-2">
              <a href={`tel:${PHONE_TEL}`} className="border-b border-gold text-white hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>

        {/* center: brand lockup */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link
            to="/"
            className="font-display text-5xl uppercase leading-none tracking-wide"
            aria-label="Inspire Squash Academy, home"
          >
            ISA<span className="text-gold">.</span>
          </Link>
          <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-white/70">
            Inspire Squash Academy
          </p>
        </div>

        {/* right: newsletter + partners + legal */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.08em]">
            Coaching notes by email
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Drills and academy news. We email now and then.
          </p>
          <form className="mt-3 flex gap-2" noValidate onSubmit={onSubmit}>
            <label htmlFor="ft-email" className="sr-only">
              Email
            </label>
            <input
              id="ft-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email *"
              className="min-h-10 min-w-0 flex-1 border border-white/30 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:border-gold"
            />
            <button
              type="submit"
              className="inline-flex min-h-10 items-center bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-gold-deep"
            >
              Sign me up
            </button>
          </form>
          <p role="status" aria-live="polite" className="mt-2 min-h-5 text-xs text-white/60">
            {msg}
          </p>
          <p className="mt-4 text-xs text-white/40">Partners coming soon.</p>
          <p className="mt-4 text-[0.6875rem] leading-relaxed text-white/40">
            &copy; {new Date().getFullYear()} Inspire Squash Academy. All rights
            reserved. Photography: client comps, for layout only. Video dialog by
            21st.dev Magic UI.
          </p>
        </div>
      </div>
    </footer>
  )
}
