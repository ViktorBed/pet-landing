import Hero from '../components/sections/Hero.tsx'
import Offers from '../components/sections/Offers.tsx'
import HowItWorks from '../components/sections/HowItWorks.tsx'
import Trust from '../components/sections/Trust.tsx'
import FindMatch from '../components/sections/FindMatch.tsx'
import Reviews from '../components/sections/Reviews.tsx'
import Faq from '../components/sections/Faq.tsx'
import LeadForm from '../components/sections/LeadForm.tsx'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { useReveal } from '../hooks/useReveal.ts'

export default function Home() {
  // Same string as the static <title> in index.html (the pre-JS fallback).
  usePageMeta('Shortlist — Find the casino that actually fits you')
  useReveal()

  return (
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
  )
}
