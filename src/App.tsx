import { MotionConfig } from "framer-motion"
import { Nav } from "@/components/isa/nav"
import { Hero } from "@/components/isa/hero"
import { QuickLinks } from "@/components/isa/quick-links"
import { Credibility } from "@/components/isa/credibility"
import { Programs } from "@/components/isa/programs"
import { School } from "@/components/isa/school"
import { Intro } from "@/components/isa/intro"
import { Facility } from "@/components/isa/facility"
import { Founder } from "@/components/isa/founder"
import { Players } from "@/components/isa/players"
import { Footer } from "@/components/isa/footer"

/**
 * INSPIRE SQUASH ACADEMY — v3 "RALLY LINES" BUILD
 * Section spine copied from msquash.com's flow (order fixed, 1–11);
 * execution art-directed per section. MotionConfig reducedMotion="user"
 * makes every framer-motion animation — including the vendored
 * hero-video-dialog's lightbox spring — honor prefers-reduced-motion.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="absolute -left-full top-0 z-50 bg-ink px-5 py-3 text-white focus:left-0"
      >
        Skip to main content
      </a>
      <div id="top" />
      <Nav />
      <main id="main">
        <Hero />
        <QuickLinks />
        <Credibility />
        <Programs />
        <School />
        <Intro />
        <Facility />
        <Founder />
        <Players />
      </main>
      <Footer />
    </MotionConfig>
  )
}
