import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { navItems } from './data/resume'
import { useActiveSection } from './hooks/useActiveSection'
import { useIsMobile } from './hooks/useMedia'

// Three.js is code-split: the page is readable before the 3D scene has even downloaded.
const Scene = lazy(() => import('./components/three/Scene'))
const sectionIds = navItems.map((n) => n.id)

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

/** If WebGL fails at runtime, fall back silently to the CSS background. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function App() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [ready, setReady] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [showScene, setShowScene] = useState(false)
  const [webgl] = useState(hasWebGL)
  const active = useActiveSection(sectionIds)
  const finishIntro = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (reduced) setReady(true)
  }, [reduced])

  useEffect(() => {
    const t = window.setTimeout(() => setShowScene(true), 50)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-champagne focus:px-5 focus:py-2.5 focus:text-ink"
      >
        Skip to content
      </a>

      {/* Fixed backdrop: CSS gradient first, WebGL scene on top when available. */}
      <div aria-hidden className="stage-bg fixed inset-0 z-0">
        {webgl && showScene && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <Scene reduced={!!reduced} mobile={mobile} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
      <div aria-hidden className="vignette pointer-events-none fixed inset-0 z-[1]" />
      <div aria-hidden className="film-grain pointer-events-none fixed inset-0 z-[2] hidden md:block" />

      <AnimatePresence>{!ready && !reduced && <Intro key="intro" onDone={finishIntro} />}</AnimatePresence>
      <Nav active={active} visible={ready} />

      <main id="main" className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
