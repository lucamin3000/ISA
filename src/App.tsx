import { useEffect } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Crossbar, MobileCrossbar } from "@/components/chrome/crossbar"
import { Footer } from "@/components/chrome/footer"
import { IntroGate } from "@/components/intro/IntroGate"
import Home from "@/views/home"
import Programs from "@/views/programs"
import Camps from "@/views/camps"
import Academy from "@/views/academy"
import Contact from "@/views/contact"

const EASE = [0.22, 0.8, 0.3, 1] as const

const TITLES: Record<string, string> = {
  "/": "Inspire Squash Academy",
  "/programs": "Programs — Inspire Squash Academy",
  "/camps": "Camps — Inspire Squash Academy",
  "/academy": "Academy — Inspire Squash Academy",
  "/contact": "Contact — Inspire Squash Academy",
}

/** Old single-page anchors redirect to their views. */
const HASH_ROUTES: Record<string, string> = {
  "#programs": "/programs",
  "#training": "/programs",
  "#school": "/programs",
  "#camps": "/camps",
  "#start": "/camps",
  "#location": "/academy",
  "#coaches": "/academy",
  "#players": "/academy",
  "#about": "/academy",
  "#contact": "/contact",
}

function useHashRedirect() {
  const navigate = useNavigate()
  const { hash } = useLocation()
  useEffect(() => {
    const target = HASH_ROUTES[hash]
    if (target) navigate(target, { replace: true })
  }, [hash, navigate])
}

/**
 * THE SPINE — the vertical stroke of the T, descending from the crossbar
 * down the center of every view. Redrawn on each view entry; the only
 * continuous gold structure on the page besides the crossbar.
 */
function Spine() {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px -translate-x-1/2 bg-gold/60"
      style={{ transformOrigin: "top" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  )
}

export default function App() {
  const location = useLocation()
  useHashRedirect()

  useEffect(() => {
    document.title = TITLES[location.pathname] ?? "Inspire Squash Academy"
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="absolute -left-full top-0 z-[60] bg-ink px-5 py-3 text-white focus:left-0"
      >
        Skip to main content
      </a>
      <IntroGate />
      <Crossbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <main id="main" className="relative pb-16 md:pb-0">
            <Spine />
            <div className="relative z-10">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/camps" element={<Camps />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
      <MobileCrossbar />
    </MotionConfig>
  )
}
