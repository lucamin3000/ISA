import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { IsaImage } from "@/content/site"

const EASE = [0.22, 0.8, 0.3, 1] as const

/** Scroll reveal — rises toward the spine's axis. Static under
 *  prefers-reduced-motion via the app-level MotionConfig. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  )
}

/** One monumental headline per view, centered on the axis. */
export function Monument({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h1
      id={id}
      className="mx-auto max-w-5xl text-center font-display text-[clamp(3rem,11vw,8.5rem)] uppercase leading-[0.94] tracking-wide text-ink"
    >
      {children}
    </h1>
  )
}

/** Unverified content collapses to one quiet line. */
export function QuietLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-center text-sm text-muted-foreground", className)}>{children}</p>
  )
}

export function GoldCTA({
  to,
  children,
  className,
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex min-h-11 items-center bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-(--dur-fast) ease-(--ease) hover:bg-gold-deep",
        className,
      )}
    >
      {children}
    </Link>
  )
}

/** A photograph at full content width, centered on the spine, treated. */
export function PhotoBand({
  image,
  aspect = "aspect-[21/9]",
  className,
  priority = false,
}: {
  image: IsaImage
  aspect?: string
  className?: string
  priority?: boolean
}) {
  return (
    <figure className={cn("mx-auto w-full max-w-5xl px-4", className)}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={cn("photo w-full object-cover", aspect)}
      />
    </figure>
  )
}

/** A balanced pair (or weighted trio) of photographs flanking the axis. */
export function PhotoPair({
  left,
  right,
  className,
}: {
  left: IsaImage
  right: IsaImage
  className?: string
}) {
  return (
    <div className={cn("mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 px-4", className)}>
      {[left, right].map((im) => (
        <img
          key={im.src}
          src={im.src}
          alt={im.alt}
          width={im.width}
          height={im.height}
          loading="lazy"
          className="photo aspect-[4/5] w-full object-cover"
        />
      ))}
    </div>
  )
}

/** Page hero — ink band, headline left, photo contained at native size
 *  on the right (never upscaled past its real resolution). */
export function PageHero({
  image,
  kicker,
  title,
  cta,
  ctaTo,
  compact = false,
}: {
  image: (IsaImage | { src: string; alt: string; width?: number }) & { width?: number }
  kicker?: string
  title: ReactNode
  cta?: string
  ctaTo?: string
  compact?: boolean
}) {
  const naturalMax = Math.min(image.width ?? 560, 620)
  return (
    <section className="bg-ink text-white" aria-label="Page introduction">
      <div
        className={cn(
          "mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[3fr_2fr] lg:gap-12",
          compact ? "py-10 lg:py-12" : "py-12 lg:py-16",
        )}
      >
        <div>
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">{kicker}</p>
          )}
          <h1 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] uppercase leading-[0.98] tracking-wide">
            {title}
          </h1>
          {cta && ctaTo && (
            <GoldCTA to={ctaTo} className="mt-6">
              {cta}
            </GoldCTA>
          )}
        </div>
        <img
          src={image.src}
          alt={image.alt}
          className="photo w-full justify-self-center border border-white/15 lg:justify-self-end"
          style={{ maxWidth: naturalMax }}
        />
      </div>
    </section>
  )
}

/** Three equal columns of pillars: title + text, centered. */
export function FeatureColumns({
  items,
}: {
  items: { title: string; body: string }[]
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {items.map((f) => (
        <div key={f.title} className="text-center">
          <h3 className="font-display text-xl uppercase tracking-wide">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
        </div>
      ))}
    </div>
  )
}

/** Two-column CTA band: image one side, text and button the other. */
export function CTABand({
  image,
  kicker,
  title,
  body,
  cta,
  ctaTo,
  flip = false,
}: {
  image: { src: string; alt: string }
  kicker: string
  title: string
  body: string
  cta: string
  ctaTo: string
  flip?: boolean
}) {
  return (
    <section className="bg-paper-warm py-12" aria-label={title}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <Reveal className={flip ? "md:order-2" : ""}>
          <img src={image.src} alt={image.alt} loading="lazy" className="photo aspect-[4/3] w-full object-cover" />
        </Reveal>
        <Reveal delay={0.06}>
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>
          <GoldCTA to={ctaTo} className="mt-6">
            {cta}
          </GoldCTA>
        </Reveal>
      </div>
    </section>
  )
}
