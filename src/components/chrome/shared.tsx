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
