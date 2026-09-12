import { casinos } from '../../data/casinos.ts'
import { ArrowRight, Clock } from '../ui/icons.tsx'

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
          {top.map((casino, i) => {
            const featured = i === 0
            return (
              <article
                key={casino.id}
                className={`offer-card ${featured ? 'offer-card--featured' : ''}`}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                {featured && <span className="offer-card__flag">Editor’s choice</span>}
                <header className="offer-card__head">
                  <span className={`monogram monogram--${casino.tone}`}>{casino.monogram}</span>
                  <div className="offer-card__title">
                    <h3>{casino.name}</h3>
                    <p className="offer-card__verdict">{casino.verdict}</p>
                  </div>
                  <div className="offer-card__score">
                    <span className="offer-card__score-num">{casino.score.toFixed(1)}</span>
                    <span className="offer-card__score-cap">/ 10</span>
                  </div>
                </header>

                <p className="offer-card__bonus">{casino.bonus}</p>

                <dl className="offer-card__facts">
                  <div>
                    <dt>
                      <Clock /> Payout
                    </dt>
                    <dd>{casino.payout}</dd>
                  </div>
                  <div>
                    <dt>Min. deposit</dt>
                    <dd>{casino.minDeposit}</dd>
                  </div>
                  <div>
                    <dt>Games</dt>
                    <dd>{casino.games}</dd>
                  </div>
                </dl>

                <ul className="chip-row offer-card__tags">
                  {casino.tags.map((tag) => (
                    <li key={tag} className="chip chip--static">
                      {tag}
                    </li>
                  ))}
                </ul>

                <a
                  href="#lead-form"
                  className={`btn btn--full ${featured ? 'btn--primary' : 'btn--outline'}`}
                >
                  Claim bonus
                  <ArrowRight />
                </a>
                <p className="offer-card__terms">18+ · New players · Full T&amp;Cs apply</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
