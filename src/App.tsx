import Header from './components/layout/Header.tsx'
import Footer from './components/layout/Footer.tsx'
import Hero from './components/sections/Hero.tsx'
import Offers from './components/sections/Offers.tsx'
import HowItWorks from './components/sections/HowItWorks.tsx'
import Trust from './components/sections/Trust.tsx'
import FindMatch from './components/sections/FindMatch.tsx'
import Reviews from './components/sections/Reviews.tsx'
import Faq from './components/sections/Faq.tsx'
import LeadForm from './components/sections/LeadForm.tsx'
import { MotionConfig } from 'motion/react'
import { useReveal } from './hooks/useReveal.ts'
import './styles/app.css'

export default function App() {
  useReveal()

  return (
    <MotionConfig reducedMotion="user">
      <div className="ambient" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Offers />
        <HowItWorks />
        <Trust />
        <FindMatch />
        <Reviews />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
    </MotionConfig>
  )
}
