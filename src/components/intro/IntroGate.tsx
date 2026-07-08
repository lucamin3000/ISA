import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { CourtFrame } from "./CourtFrame"

const CourtIntro3D = lazy(() => import("./CourtIntro3D"))

const SESSION_KEY = "isa:intro"

function webglAvailable() {
  try {
    const c = document.createElement("canvas")
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

type Phase = "3d" | "static" | "leaving" | "done"

/**
 * First-visit intro gate — now a night scene. Plays once per session,
 * never on internal navigation. Reduced-motion and WebGL-less devices get
 * the pre-rendered frame of the arena, cross-fading to the hero in under
 * a second. The 3D bundle is lazy-loaded behind this gate only; the
 * pre-rendered frame is the Suspense fallback, so first paint never waits
 * on three.js. Skip is visible, focused, and keyboard-operable from the
 * first frame.
 */
export function IntroGate() {
  const [phase, setPhase] = useState<Phase>(() => {
    // ?frame previews the static fallback path (same branch reduced-motion
    // and WebGL-less devices take)
    if (new URLSearchParams(window.location.search).has("frame")) return "static"
    if (sessionStorage.getItem(SESSION_KEY)) return "done"
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    return reduced || !webglAvailable() ? "static" : "3d"
  })
  const skipRef = useRef<HTMLButtonElement>(null)

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, "1")
    setPhase((p) => (p === "done" ? p : "leaving"))
    window.setTimeout(() => setPhase("done"), 620)
  }

  useEffect(() => {
    if (phase === "done") return
    skipRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === "done"])

  useEffect(() => {
    if (phase !== "static") return
    const t = window.setTimeout(finish, 650) // static frame → hero in <1s
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (phase === "done") return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Inspire Squash Academy, loading"
      className="fixed inset-0 z-50 bg-[#E5E1DA]"
      style={{
        opacity: phase === "leaving" ? 0 : 1,
        transition: "opacity 600ms var(--ease)",
        pointerEvents: phase === "leaving" ? "none" : "auto",
      }}
    >
      {phase === "3d" || phase === "leaving" ? (
        <Suspense fallback={<CourtFrame />}>
          <CourtIntro3D onDone={finish} />
        </Suspense>
      ) : (
        <CourtFrame />
      )}
      <button
        ref={skipRef}
        type="button"
        onClick={finish}
        className="absolute right-5 top-5 z-10 border border-ink/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/80 transition-colors duration-(--dur-fast) ease-(--ease) hover:border-ink hover:text-ink"
      >
        Skip
      </button>
    </div>
  )
}
