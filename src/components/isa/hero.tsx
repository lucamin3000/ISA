import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"
import { ISA_FILM_EMBED_URL, TOKENS } from "@/content/site"
import { Kicker, Token } from "./primitives"

/**
 * 3D COURT FLOOR — the page's one 3D accent: the court's gold lines on a
 * perspective-projected plane behind the hero. Pure CSS (see index.css);
 * degrades to a static projection under prefers-reduced-motion.
 */
function CourtFloor() {
  return (
    <div className="court-3d" aria-hidden>
      <div className="court-3d__floor">
        {/* short line (across the court) */}
        <div className="court-3d__line" style={{ left: 0, right: 0, top: "42%", height: 2 }} />
        {/* half-court line (down the court) */}
        <div
          className="court-3d__line"
          style={{ left: "50%", top: "42%", bottom: 0, width: 2 }}
        />
        {/* service boxes */}
        <div
          className="court-3d__line"
          style={{ left: "18%", top: "42%", height: "26%", width: 2 }}
        />
        <div
          className="court-3d__line"
          style={{ right: "18%", top: "42%", height: "26%", width: 2 }}
        />
        <div
          className="court-3d__line"
          style={{ left: "18%", top: "68%", width: "14%", height: 2 }}
        />
        <div
          className="court-3d__line"
          style={{ right: "18%", top: "68%", width: "14%", height: 2 }}
        />
      </div>
    </div>
  )
}

/**
 * THE HOOK — a designed film frame: black field, gold play disc, title type.
 * No photography anywhere. Opens the lightbox; with ISA_FILM_EMBED_URL set
 * the iframe goes live, otherwise a flagged placeholder panel renders (the
 * truth policy forbids substituting an unrelated clip). Escape and
 * click-outside close; focus is trapped while open and returned on close.
 */
function FilmFrame() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key === "Tab" && !ISA_FILM_EMBED_URL) {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey, true)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey, true)
      document.body.style.overflow = ""
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Play the academy film (video not yet supplied — opens placeholder)"
        className="group relative block aspect-[16/9] w-full cursor-pointer bg-ink text-left"
      >
        {/* designed frame — type and gold only */}
        <span className="absolute left-6 top-6 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-gold sm:left-10 sm:top-9">
          The academy film
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-24 items-center justify-center rounded-full border border-gold/40 transition-transform duration-200 ease-out group-hover:scale-105 sm:size-28">
            <span className="flex size-16 items-center justify-center rounded-full bg-gold transition-colors duration-200 group-hover:bg-gold-deep sm:size-20">
              <Play className="ml-1 size-7 fill-ink text-ink" aria-hidden />
            </span>
          </span>
        </span>
        <span className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-3 sm:bottom-9 sm:left-10 sm:right-10">
          <span className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Watch the method<span className="text-gold">.</span>
          </span>
          <span className="h-0.5 w-14 bg-gold" aria-hidden />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Academy film"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close dialog"
                className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-white ring-1 ring-white/50 backdrop-blur-md transition-colors hover:text-gold max-md:-bottom-16 max-md:top-auto"
              >
                <XIcon className="size-5" aria-hidden />
              </button>
              <div className="isolate z-[1] relative flex size-full items-center justify-center overflow-hidden border-2 border-white bg-ink">
                {ISA_FILM_EMBED_URL ? (
                  <iframe
                    src={ISA_FILM_EMBED_URL}
                    title="ISA academy film"
                    className="size-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                ) : (
                  <div className="max-w-xl px-8 text-center">
                    <p className="font-display text-2xl text-white">
                      The academy film belongs here.
                    </p>
                    <hr className="mx-auto my-5 h-0.5 w-14 border-0 bg-gold" />
                    <p className="text-sm leading-relaxed text-muted-dark">
                      {TOKENS.film} — set <code>ISA_FILM_EMBED_URL</code> in{" "}
                      <code>src/content/site.ts</code> to a license-cleared
                      embed and this lightbox goes live. No stand-in footage is
                      shown.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * HERO — the oversized typographic gesture over the 3D court floor;
 * the designed film frame is the only object on the page competing
 * with nothing.
 */
export function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden pt-[4.5rem]" aria-labelledby="hero-h">
      <CourtFloor />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="rally-grid items-end pb-16 pt-10 lg:pb-24 lg:pt-16">
          {/* type: full width — the one reckless gesture on the page */}
          <div className="col-span-4 lg:col-span-12">
            <Kicker>Elite coaching · Junior development · Lifelong squash</Kicker>
            <h1
              id="hero-h"
              className="mt-4 font-display text-[12.5vw] font-bold leading-[0.95] tracking-tight text-ink lg:text-[clamp(6rem,10.5vw,9.5rem)]"
            >
              WE BUILD
              <br />
              CHAMPIONS
              <span className="text-gold">.</span>
            </h1>
          </div>

          {/* CTA rail: narrow left column */}
          <div className="col-span-4 self-start lg:col-span-3 lg:pt-10">
            <p className="max-w-[24rem] text-[1.0625rem] text-muted-foreground">
              Champions are made on court, session by session — that is the
              whole method.
            </p>
            <a
              href="#start"
              className="mt-7 inline-flex min-h-11 items-center bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-gold-deep"
            >
              Start training
            </a>
          </div>

          {/* the hook: designed film frame, weighted right, bleeding off the edge */}
          <div className="col-span-4 mt-8 lg:col-span-9 lg:col-start-4 lg:mt-4">
            <div className="bleed-right">
              <FilmFrame />
            </div>
            <p className="pt-3">
              <Token>{TOKENS.film}</Token>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
