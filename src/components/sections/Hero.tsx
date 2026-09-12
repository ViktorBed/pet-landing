import { ArrowRight } from '../ui/icons.tsx'

interface Stat {
  readonly value: string
  readonly label: string
}

const stats: readonly Stat[] = [
  { value: '214', label: 'casinos tested with real deposits' },
  { value: '41 min', label: 'fastest verified payout this year' },
  { value: '90 days', label: 'max age of any score on the index' },
]

interface ScoreBar {
  readonly name: string
  readonly width: `${number}%`
  readonly score: string
}

const demoBars: readonly ScoreBar[] = [
  { name: 'Payout speed', width: '96%', score: '9.6' },
  { name: 'Bonus value', width: '91%', score: '9.1' },
  { name: 'Game library', width: '84%', score: '8.4' },
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
              {demoBars.map((bar) => (
                <div key={bar.name} className="scorebar">
                  <span className="scorebar__name">{bar.name}</span>
                  <span className="scorebar__track">
                    <span className="scorebar__fill" style={{ width: bar.width }} />
                  </span>
                  <span className="scorebar__num">{bar.score}</span>
                </div>
              ))}
            </div>
            <div className="match-card__foot">
              <span className="match-card__bonus">200% up to €500</span>
              <span className="match-card__cta">Your #1 match</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
