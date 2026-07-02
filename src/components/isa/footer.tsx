import { useState, type FormEvent } from "react"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { IMG, TOKENS } from "@/content/site"
import { Container, Kicker, Token } from "./primitives"

/**
 * NEWSLETTER FOOTER — email capture (front-end stub), contact tokens,
 * lucide social icons (placeholder links), photo credits, copyright.
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
    setMsg("Thanks! (Demo only — connect this form to your email provider.)")
    e.currentTarget.reset()
  }

  return (
    <footer id="contact" className="bg-ink pb-8 pt-20 text-white lg:pt-28">
      <Container>
        <div className="rally-grid">
          <div className="col-span-4 lg:col-span-7">
            <Kicker dark>Newsletter</Kicker>
            <h2 className="mt-3 font-display text-4xl font-semibold lg:text-5xl">
              Want tips from the pros?
            </h2>
            <form className="mt-7 max-w-md" noValidate onSubmit={onSubmit}>
              <label htmlFor="nl-email" className="block text-sm text-muted-dark">
                Training notes from ISA coaches. No spam, unsubscribe anytime.
              </label>
              <div className="mt-3 flex flex-wrap gap-3">
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-h-11 min-w-48 flex-1 border border-[#3d3a34] bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-[#7a756c] focus-visible:border-gold"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center bg-gold px-7 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-gold-deep"
                >
                  Subscribe
                </button>
              </div>
              <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-gold">
                {msg}
              </p>
            </form>
          </div>

          <div className="col-span-4 flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
            <div>
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold">
                Visit
              </h3>
              <p className="mt-2">
                <Token dark>{TOKENS.address}</Token>
              </p>
            </div>
            <div>
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold">
                Contact
              </h3>
              <p className="mt-2">
                <Token dark>{TOKENS.contact}</Token>
              </p>
            </div>
            <div>
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold">
                Follow
              </h3>
              <div className="mt-3 flex gap-4">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Youtube, label: "YouTube" },
                  { Icon: Facebook, label: "Facebook" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={`${label} — placeholder link, handle not yet supplied`}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-[#3d3a34] transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4.5" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <details className="mt-14 text-xs text-[#7a756c]">
          <summary className="cursor-pointer font-semibold uppercase tracking-[0.08em] hover:text-gold">
            Photography credits
          </summary>
          <ul className="mt-3 grid gap-1.5">
            {Object.values(IMG).map((img) => (
              <li key={img.src}>
                {img.credit} —{" "}
                <a href={img.source} className="text-[#a29d93] underline hover:text-gold">
                  source
                </a>{" "}
                ({img.license})
              </li>
            ))}
            <li>
              Hero video dialog: 21st.dev / Magic UI &ldquo;hero-video-dialog&rdquo;
              component (React + framer-motion), integrated verbatim.
            </li>
          </ul>
        </details>

        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#26231e] pt-6 text-[0.8125rem] text-[#7a756c]">
          <p>&copy; {new Date().getFullYear()} Inspire Squash Academy. All rights reserved.</p>
          <a href="#top" className="border-b border-gold pb-0.5 text-white hover:text-gold">
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  )
}
