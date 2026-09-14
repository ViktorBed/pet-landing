import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getStoredConsent, storeConsent, type ConsentChoice } from '../lib/consent.ts'

/**
 * Cookie consent banner. Analytics (GTM, Meta Pixel) stay unloaded until the
 * visitor accepts — public/init-analytics.js gates on the same stored choice,
 * so returning visitors never see the banner again.
 */
export default function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice | null>(getStoredConsent)

  if (choice !== null) return null

  const decide = (value: ConsentChoice) => {
    storeConsent(value)
    setChoice(value)
  }

  return (
    <div className="consent" role="region" aria-label="Cookie consent">
      <p className="consent__text">
        We use cookies for analytics and to measure our ads — only if you agree. See the{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
      <div className="consent__actions">
        <button className="btn btn--outline consent__btn" onClick={() => decide('denied')}>
          Decline
        </button>
        <button className="btn btn--primary consent__btn" onClick={() => decide('granted')}>
          Accept
        </button>
      </div>
    </div>
  )
}
