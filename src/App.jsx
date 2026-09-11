import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Offers from './components/Offers.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Trust from './components/Trust.jsx'
import FindMatch from './components/FindMatch.jsx'
import Reviews from './components/Reviews.jsx'
import Faq from './components/Faq.jsx'
import LeadForm from './components/LeadForm.jsx'
import Footer from './components/Footer.jsx'
import { useReveal } from './lib/useReveal.js'
import './App.css'

export default function App() {
  useReveal()

  return (
    <>
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
    </>
  )
}
