import { Suspense, lazy, useEffect, useLayoutEffect, useRef } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import ConsentBanner from './components/ConsentBanner.tsx'
import Header from './components/layout/Header.tsx'
import Footer from './components/layout/Footer.tsx'
import Home from './pages/Home.tsx'
import { trackPageView } from './lib/tracking.ts'
import './styles/app.css'

// Legal pages are rarely visited — keep their text out of the landing bundle.
const Terms = lazy(() => import('./pages/Terms.tsx'))
const Privacy = lazy(() => import('./pages/Privacy.tsx'))

/**
 * Owns scrolling across client-side navigations: smooth-scrolls to the hash
 * target when there is one, otherwise resets to the top before paint. The
 * initial load is left to the browser — it handles a URL hash natively, and
 * acting there would fight it. Keyed on location.key so re-clicking the same
 * anchor scrolls again even though the URL is unchanged.
 */
function ScrollManager() {
  const { hash, key } = useLocation()
  const isInitialLoad = useRef(true)

  useLayoutEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    const target = hash && document.getElementById(hash.slice(1))
    if (target) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [hash, key])

  return null
}

/**
 * SPA page_view tracking: initAnalytics() reports the initial load, this
 * reports each client-side route change (path only — hash-only jumps within
 * the landing page are not separate page views).
 */
function PageViewTracker() {
  const { pathname } = useLocation()
  const isInitialLoad = useRef(true)

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    trackPageView()
  }, [pathname])

  return null
}

// Shared chrome: the header and footer mount once and survive route changes;
// each page renders only its <main>.
function Chrome() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="ambient" aria-hidden="true" />
      <ScrollManager />
      <PageViewTracker />
      <Routes>
        <Route element={<Chrome />}>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ConsentBanner />
    </MotionConfig>
  )
}
