import { casinos } from '../data/casinos.js'
import { ArrowRight, Clock } from './icons.jsx'

const top = casinos.slice(0, 3)

export default function Offers() {
  return (
    <section className="section" id="offers">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Top casino offers</p>
          <h2>
            This week’s <em>shortlist</em>
          </h2>
          <p className="section__sub">
            Re-verified every Monday. Scores come from our own deposits and stopwatch — never from
            the casinos.
          </p>
        </div>

        <div className="offers__grid">
          {top.map((c, i) => (
            <article
              key={c.id}
              className={`offer-card ${i === 0 ? 'offer-card--featured' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              {i === 0 && <span className="offer-card__flag">Editor’s choice</span>}
              <header className="offer-card__head">
                <span className={`monogram monogram--${c.tone}`}>{c.monogram}</span>
                <div className="offer-card__title">
                  <h3>{c.name}</h3>
                  <p className="offer-card__verdict">{c.verdict}</p>
                </div>
                <div className="offer-card__score">
                  <span className="offer-card__score-num">{c.score.toFixed(1)}</span>
                  <span className="offer-card__score-cap">/ 10</span>
                </div>
              </header>

              <p className="offer-card__bonus">{c.bonus}</p>

              <dl className="offer-card__facts">
                <div>
                  <dt>
                    <Clock /> Payout
                  </dt>
                  <dd>{c.payout}</dd>
                </div>
                <div>
                  <dt>Min. deposit</dt>
                  <dd>{c.minDeposit}</dd>
                </div>
                <div>
                  <dt>Games</dt>
                  <dd>{c.games}</dd>
                </div>
              </dl>

              <ul className="chip-row offer-card__tags">
                {c.tags.map((t) => (
                  <li key={t} className="chip chip--static">
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href="#lead-form"
                className={`btn btn--full ${i === 0 ? 'btn--primary' : 'btn--outline'}`}
              >
                Claim bonus
                <ArrowRight />
              </a>
              <p className="offer-card__terms">18+ · New players · Full T&amp;Cs apply</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
