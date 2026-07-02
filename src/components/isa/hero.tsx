import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { IMG, ISA_FILM_EMBED_URL, TOKENS } from "@/content/site"
import { Kicker, PhotoCredit, Token } from "./primitives"

/**
 * ISA film block.
 *
 * When ISA_FILM_EMBED_URL is set, the verbatim 21st.dev HeroVideoDialog
 * renders it — restyled through the shadcn token system (--primary IS the
 * ISA gold, so its play disc takes the brand accent untouched).
 *
 * Until then the truth policy forbids substituting an unrelated clip, so a
 * visually identical stand-in (same thumbnail, same gold disc, same spring
 * lightbox) opens a flagged placeholder panel instead — with Escape-to-close
 * and focus return, which the vendored component leaves to the backdrop click.
 */
function IsaFilm() {
  if (ISA_FILM_EMBED_URL) {
    return (
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc={ISA_FILM_EMBED_URL}
        thumbnailSrc={IMG.film.src}
        thumbnailAlt={IMG.film.alt}
      />
    )
  }
  return <FilmPlaceholderDialog />
}

function FilmPlaceholderDialog() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key === "Tab") {
        // two focusables total: keep Tab inside the dialog
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
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="group relative block w-full cursor-pointer"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Play the academy film (video not yet supplied — opens placeholder)"
      >
        <img
          src={IMG.film.src}
          alt={IMG.film.alt}
          width={IMG.film.width}
          height={IMG.film.height}
          fetchPriority="high"
          className="w-full border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
        />
        <span className="absolute inset-0 flex scale-[0.9] items-center justify-center transition-all duration-200 ease-out group-hover:scale-100">
          <span className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
            <span className="relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]">
              <Play
                className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                aria-hidden
              />
            </span>
          </span>
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
            aria-label="Academy film — placeholder"
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
                <div className="max-w-xl px-8 text-center">
                  <p className="font-display text-2xl text-white">
                    The academy film belongs here.
                  </p>
                  <hr className="mx-auto my-5 h-0.5 w-14 border-0 bg-gold" />
                  <p className="text-sm leading-relaxed text-muted-dark">
                    {TOKENS.film} — set <code>ISA_FILM_EMBED_URL</code> in{" "}
                    <code>src/content/site.ts</code> to a license-cleared embed
                    and the lightbox goes live. No stand-in footage is shown.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * HERO — the oversized typographic gesture claims the upper-left;
 * the film block is weighted low-right and bleeds off the right edge.
 */
export function Hero() {
  return (
    <section className="relative min-h-svh pt-[4.5rem]" aria-labelledby="hero-h">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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

          {/* CTA rail: narrow column left under the headline */}
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

          {/* the hook: film weighted right, bleeding off the viewport edge */}
          <div className="col-span-4 mt-8 lg:col-span-9 lg:col-start-4 lg:mt-4">
            <div className="bleed-right">
              <IsaFilm />
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-3">
              <Token>{TOKENS.film}</Token>
              <PhotoCredit image={IMG.film} className="pt-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
