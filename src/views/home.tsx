import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { IMG, ISA_FILM_EMBED_URL } from "@/content/site"
import type { IsaImage } from "@/content/site"
import { Kicker, Reveal } from "@/components/chrome/shared"

const EASE = [0.22, 0.8, 0.3, 1] as const

/**
 * THE PREMIERE — the intro resolves onto this. The film is the first
 * thing the visitor meets: full-width cinematic still in the intro's
 * palette (deep blacks, gold), the gold play disc pulsing once on
 * arrival, opening the lightbox with the same spring. When the client
 * supplies ISA_FILM_EMBED_URL the verbatim 21st.dev HeroVideoDialog
 * takes the slot untouched; until then the premiere frame opens a
 * deep-black placeholder panel — no substitute footage.
 */
function Premiere() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key === "Tab") {
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

  if (ISA_FILM_EMBED_URL) {
    return (
      <div className="premiere relative">
        <div className="film-still">
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc={ISA_FILM_EMBED_URL}
            thumbnailSrc={IMG.film.src}
            thumbnailAlt={IMG.film.alt}
          />
        </div>
        {/* one slow pulse of light on arrival — an invitation, then still */}
        <span aria-hidden className="premiere-pulse pointer-events-none absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold" />
      </div>
    )
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Play the academy film (video not yet supplied — opens placeholder)"
        className="group relative block w-full cursor-pointer"
      >
        <img
          src={IMG.film.src}
          alt={IMG.film.alt}
          width={IMG.film.width}
          height={IMG.film.height}
          fetchPriority="high"
          className="film-still aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
        />
        {/* deep-black grade toward the edges, gold accents only */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex size-24 items-center justify-center">
            <span aria-hidden className="premiere-pulse absolute inset-0 rounded-full border-2 border-gold" />
            <span className="flex size-20 items-center justify-center rounded-full bg-gold shadow-[0_10px_50px_rgba(11,10,8,0.6)] transition-transform duration-(--dur-fast) ease-(--ease) group-hover:scale-105">
              <Play className="ml-1 size-8 fill-ink text-ink" aria-hidden />
            </span>
          </span>
        </span>
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
          The academy film
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 backdrop-blur-md"
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
                <div className="max-w-xl px-8 text-center">
                  <p className="font-display text-2xl uppercase tracking-wide text-white">
                    The academy film belongs here.
                  </p>
                  <hr className="mx-auto my-5 h-0.5 w-14 border-0 bg-gold" />
                  <p className="text-sm leading-relaxed text-muted-dark">
                    Set <code>ISA_FILM_EMBED_URL</code> in{" "}
                    <code>src/content/site.ts</code> to a license-cleared embed
                    and this lightbox goes live. No stand-in footage is shown.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const DOORWAYS: { to: string; title: string; line: string; image: IsaImage }[] = [
  {
    to: "/programs",
    title: "Programs",
    line: "Memberships, seasons, Squash & School.",
    image: IMG.clinic,
  },
  {
    to: "/camps",
    title: "Camps",
    line: "Intensive weeks. Total focus.",
    image: IMG.camp,
  },
  {
    to: "/academy",
    title: "Academy",
    line: "The facility, the founder, the players.",
    image: IMG.facility,
  },
]

export default function Home() {
  return (
    <div className="pb-8">
      {/* the monumental headline — revealed in the intro's easing family */}
      <section className="px-4 pb-10 pt-14 text-center lg:pb-14 lg:pt-20" aria-labelledby="home-h">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
        >
          <Kicker className="mb-4">Inspire Squash Academy</Kicker>
          <h1
            id="home-h"
            className="mx-auto font-display text-[clamp(3rem,10vw,7.5rem)] uppercase leading-[0.94] tracking-wide text-ink"
          >
            We build
            <br />
            champions.
          </h1>
        </motion.div>
      </section>

      {/* the premiere — nothing on HOME competes with it */}
      <motion.section
        aria-label="The academy film"
        className="mx-auto w-full max-w-6xl px-4"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
      >
        <Premiere />
      </motion.section>

      {/* quiet below: one credibility line */}
      <section className="mt-20 bg-ink py-14 lg:mt-28" aria-label="The standard">
        <Reveal>
          <p className="mx-auto max-w-3xl px-4 text-center font-display text-2xl uppercase leading-tight tracking-wide text-white sm:text-3xl">
            We measure ourselves by what
            <br />
            our athletes go on to do.
          </p>
        </Reveal>
      </section>

      {/* quiet below: the doorways */}
      <section className="mx-auto mt-16 max-w-6xl px-4 lg:mt-24" aria-label="Explore the academy">
        <div className="grid gap-5 md:grid-cols-3">
          {DOORWAYS.map((d, i) => (
            <Reveal key={d.to} delay={i * 0.06}>
              <Link to={d.to} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={d.image.src}
                    alt={d.image.alt}
                    width={d.image.width}
                    height={d.image.height}
                    loading="lazy"
                    className="photo aspect-[4/3] w-full object-cover transition-transform duration-(--dur-slow) ease-(--ease) group-hover:scale-[1.03]"
                  />
                </div>
                <h2 className="mt-5 font-display text-2xl uppercase tracking-wide">{d.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{d.line}</p>
                <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-(--dur-fast) ease-(--ease) group-hover:text-gold-text">
                  Enter →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
