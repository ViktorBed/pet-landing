import { useState } from 'react'
import { getTrackingParams, trackLead } from '../lib/tracking.js'
import { ArrowRight, Check } from './icons.jsx'

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const tracking = getTrackingParams()

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    trackLead({
      lead_name: data.get('name'),
      lead_email: data.get('email'),
    })
    setSubmitted(true)
  }

  return (
    <section className="section lead" id="lead-form">
      <div className="lead__glow" aria-hidden="true" />
      <div className="container container--narrow">
        {submitted ? (
          <div className="lead__thanks" role="status">
            <span className="lead__thanks-icon">
              <Check width={26} height={26} />
            </span>
            <h2>
              You’re on the list. <em>Check your inbox.</em>
            </h2>
            <p className="section__sub">
              Your personal shortlist is on its way — top three matches, verified bonuses and the
              small print already translated. One email, no spam.
            </p>
            <a href="#offers" className="btn btn--outline">
              Back to this week’s offers
            </a>
          </div>
        ) : (
          <div className="lead__card" data-reveal>
            <div className="lead__copy">
              <p className="eyebrow">Free · takes 30 seconds</p>
              <h2>
                Get your <em>personal</em> shortlist
              </h2>
              <p className="section__sub">
                Your top three casino matches with verified bonuses — plus a weekly heads-up when a
                better offer beats yours.
              </p>
            </div>
            <form className="lead__form" onSubmit={onSubmit}>
              <label className="field">
                <span className="field__label">Your name</span>
                <input
                  className="field__input"
                  type="text"
                  name="name"
                  placeholder="Alex"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input
                  className="field__input"
                  type="email"
                  name="email"
                  placeholder="alex@email.com"
                  autoComplete="email"
                  required
                />
              </label>

              {Object.entries(tracking).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
              ))}

              <button type="submit" className="btn btn--primary btn--lg btn--full">
                Send my shortlist
                <ArrowRight />
              </button>
              <p className="lead__fineprint">
                18+ only. By subscribing you accept our privacy policy. Unsubscribe anytime — one
                click.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
