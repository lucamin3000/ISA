import { useEffect } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Crossbar } from "@/components/chrome/crossbar"
import { Footer } from "@/components/chrome/footer"
import { IntroGate } from "@/components/intro/IntroGate"
import Home from "@/views/home"
import AnnualTraining from "@/views/annual-training"
import SummerCamps from "@/views/summer-camps"
import SchoolSquash from "@/views/school-squash"
import Coaches from "@/views/coaches"
import {
  CollegeRecruiting,
  FirstSwings,
  MindsetCoaching,
  OnlineSchool,
  Strength,
} from "@/views/programs-misc"
import { Blog, Book, Resources } from "@/views/misc-pages"

const EASE = [0.22, 0.8, 0.3, 1] as const

const TITLES: Record<string, string> = {
  "/": "Inspire Squash Academy",
  "/annual-training": "Annual Training — Inspire Squash Academy",
  "/first-swings": "First Swings — Inspire Squash Academy",
  "/mindset-coaching": "Mindset Coaching — Inspire Squash Academy",
  "/strength": "Strength & Conditioning — Inspire Squash Academy",
  "/summer-camps": "Summer Camps — Inspire Squash Academy",
  "/school-and-squash": "School & Squash — Inspire Squash Academy",
  "/online-school": "Online School — Inspire Squash Academy",
  "/college-recruiting": "College Recruiting — Inspire Squash Academy",
  "/coaches": "Coaches — Inspire Squash Academy",
  "/blog": "Blog — Inspire Squash Academy",
  "/resources": "Resources — Inspire Squash Academy",
  "/book": "Book Now — Inspire Squash Academy",
}

/** Legacy anchors and retired routes redirect to their new homes. */
const HASH_ROUTES: Record<string, string> = {
  "#programs": "/annual-training",
  "#training": "/annual-training",
  "#school": "/school-and-squash",
  "#camps": "/summer-camps",
  "#start": "/book",
  "#location": "/summer-camps",
  "#coaches": "/coaches",
  "#players": "/coaches",
  "#about": "/coaches",
  "#contact": "/book",
}

function useHashRedirect() {
  const navigate = useNavigate()
  const { hash } = useLocation()
  useEffect(() => {
    const target = HASH_ROUTES[hash]
    if (target) navigate(target, { replace: true })
  }, [hash, navigate])
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
          <main id="main">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/annual-training" element={<AnnualTraining />} />
              <Route path="/first-swings" element={<FirstSwings />} />
              <Route path="/mindset-coaching" element={<MindsetCoaching />} />
              <Route path="/strength" element={<Strength />} />
              <Route path="/summer-camps" element={<SummerCamps />} />
              <Route path="/school-and-squash" element={<SchoolSquash />} />
              <Route path="/online-school" element={<OnlineSchool />} />
              <Route path="/college-recruiting" element={<CollegeRecruiting />} />
              <Route path="/coaches" element={<Coaches />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/book" element={<Book />} />
              {/* retired routes */}
              <Route path="/programs" element={<Navigate to="/annual-training" replace />} />
              <Route path="/camps" element={<Navigate to="/summer-camps" replace />} />
              <Route path="/academy" element={<Navigate to="/coaches" replace />} />
              <Route path="/contact" element={<Navigate to="/book" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
