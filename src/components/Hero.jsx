import { ArrowRight } from './icons.jsx'

const stats = [
  { value: '214', label: 'casinos tested with real deposits' },
  { value: '41 min', label: 'fastest verified payout this year' },
  { value: '90 days', label: 'max age of any score on the index' },
]

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow" data-reveal>
            Independent casino index · updated weekly
          </p>
          <h1 className="hero__title" data-reveal>
            Stop guessing. Find the casino that actually fits <em>you</em>.
          </h1>
          <p className="hero__sub" data-reveal>
            We deposit real money, time every payout and read the bonus small print — then match
            you with your top three casinos in under a minute.
          </p>
          <div className="hero__actions" data-reveal>
            <a href="#lead-form" className="btn btn--primary btn--lg">
              Get my match — free
              <ArrowRight />
            </a>
            <a href="#offers" className="btn btn--ghost btn--lg">
              See top offers
            </a>
          </div>
          <dl className="hero__stats" data-reveal>
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <dt className="hero__stat-value">{s.value}</dt>
                <dd className="hero__stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" data-reveal aria-hidden="true">
          <div className="hero__orb" />
          <div className="match-card">
            <div className="match-card__head">
              <span className="monogram monogram--lime">NS</span>
              <div>
                <p className="match-card__name">NovaSpin</p>
                <p className="match-card__meta">Curacao licence · est. 2021</p>
              </div>
              <div className="match-ring">
                <svg viewBox="0 0 44 44" width="44" height="44">
                  <circle cx="22" cy="22" r="19" className="match-ring__track" />
                  <circle cx="22" cy="22" r="19" className="match-ring__value" />
                </svg>
                <span className="match-ring__label">98%</span>
              </div>
            </div>
            <div className="match-card__bars">
              <div className="scorebar">
                <span className="scorebar__name">Payout speed</span>
                <span className="scorebar__track">
                  <span className="scorebar__fill" style={{ width: '96%' }} />
                </span>
                <span className="scorebar__num">9.6</span>
              </div>
              <div className="scorebar">
                <span className="scorebar__name">Bonus value</span>
                <span className="scorebar__track">
                  <span className="scorebar__fill" style={{ width: '91%' }} />
                </span>
                <span className="scorebar__num">9.1</span>
              </div>
              <div className="scorebar">
                <span className="scorebar__name">Game library</span>
                <span className="scorebar__track">
                  <span className="scorebar__fill" style={{ width: '84%' }} />
                </span>
                <span className="scorebar__num">8.4</span>
              </div>
            </div>
            <div className="match-card__foot">
              <span className="match-card__bonus">200% up to €500</span>
              <span className="match-card__cta">Your #1 match</span>
            </div>
          </div>
          <div className="hero__chip hero__chip--one">Fast payouts</div>
          <div className="hero__chip hero__chip--two">Live dealers</div>
        </div>
      </div>
    </section>
  )
}
