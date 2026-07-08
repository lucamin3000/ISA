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

/** Page hero — the model's format: full-width photo with a dark scrim
 *  and a centered overlay title + CTA. */
export function PageHero({
  image,
  kicker,
  title,
  cta,
  ctaTo,
  compact = false,
}: {
  image: { src: string; alt: string }
  kicker?: string
  title: ReactNode
  cta?: string
  ctaTo?: string
  compact?: boolean
}) {
  return (
    <section className="relative isolate" aria-label="Page introduction">
      <img
        src={image.src}
        alt={image.alt}
        fetchPriority="high"
        className={cn(
          "photo w-full object-cover",
          compact ? "h-[38svh] min-h-[16rem]" : "h-[52svh] min-h-[22rem]",
        )}
      />
      <div aria-hidden className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {kicker && (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">{kicker}</p>
        )}
        <h1 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[1.02] tracking-wide text-white">
          {title}
        </h1>
        {cta && ctaTo && (
          <GoldCTA to={ctaTo} className="mt-6">
            {cta}
          </GoldCTA>
        )}
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
