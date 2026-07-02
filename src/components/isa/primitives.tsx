import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/** Scroll reveal — wrapped app-level in <MotionConfig reducedMotion="user">,
 *  so users with prefers-reduced-motion get a static render. */
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export function Kicker({
  children,
  dark = false,
  className,
}: {
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        "text-[0.8125rem] font-semibold uppercase tracking-[0.22em]",
        dark ? "text-gold" : "text-gold-text",
        className,
      )}
    >
      {children}
    </p>
  )
}

/** The single gold structural element most sections carry. */
export function GoldRule({ className }: { className?: string }) {
  return <hr className={cn("my-6 h-0.5 w-14 border-0 bg-gold", className)} />
}

/** Visible truth token — a flagged, empty-by-design field. */
export function Token({
  children,
  dark = false,
  className,
}: {
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-block border border-dashed border-gold px-3 py-1.5 text-[0.8125rem] leading-relaxed",
        dark ? "text-muted-dark" : "bg-paper-warm text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  )
}
