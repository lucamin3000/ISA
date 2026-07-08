import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { IMG, ISA_FILM_EMBED_URL } from "@/content/site"

/**
 * The academy film block — the verbatim 21st.dev HeroVideoDialog once
 * ISA_FILM_EMBED_URL is set; until then a still that opens a truthful
 * placeholder lightbox (no substitute footage). Placed wherever the
 * mirrored layout embeds video.
 */
export function FilmBlock() {
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
      <div className="photo">
        <HeroVideoDialog
          animationStyle="from-center"
          videoSrc={ISA_FILM_EMBED_URL}
          thumbnailSrc={IMG.film.src}
          thumbnailAlt={IMG.film.alt}
        />
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
        aria-label="Play the academy film (video coming soon)"
        className="group relative block w-full cursor-pointer"
      >
        <img
          src={IMG.film.src}
          alt={IMG.film.alt}
          width={IMG.film.width}
          height={IMG.film.height}
          loading="lazy"
          className="film-still aspect-[16/9] w-full object-cover"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/30" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-gold shadow-[0_10px_40px_rgba(11,10,8,0.5)] transition-transform duration-(--dur-fast) ease-(--ease) group-hover:scale-105 sm:size-20">
            <Play className="ml-1 size-7 fill-ink text-ink" aria-hidden />
          </span>
        </span>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
          Watch
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
                    Film coming soon
                  </p>
                  <hr className="mx-auto my-5 h-0.5 w-14 border-0 bg-gold" />
                  <p className="text-sm leading-relaxed text-muted-dark">
                    Our academy video lands here shortly. Check back soon.
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
