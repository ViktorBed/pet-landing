import { reviews } from '../data/casinos.js'
import { ArrowRight, Check, Minus } from './icons.jsx'

export default function Reviews() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Latest casino reviews</p>
          <h2>
            Fresh from the <em>test bench</em>
          </h2>
          <p className="section__sub">
            Long-form reviews, written after we’ve deposited, played and cashed out ourselves.
          </p>
        </div>

        <div className="reviews__row">
          {reviews.map((r, i) => (
            <article
              key={r.id}
              className="review-card"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <header className="review-card__head">
                <span className={`monogram monogram--sm monogram--${r.tone}`}>{r.monogram}</span>
                <div className="review-card__title">
                  <h3>{r.name}</h3>
                  <p className="review-card__date">{r.date}</p>
                </div>
                <span className="review-card__score">{r.score.toFixed(1)}</span>
              </header>
              <p className="review-card__excerpt">{r.excerpt}</p>
              <ul className="review-card__points">
                {r.pros.map((p) => (
                  <li key={p} className="review-card__point review-card__point--pro">
                    <Check width={13} height={13} /> {p}
                  </li>
                ))}
                {r.cons.map((c) => (
                  <li key={c} className="review-card__point review-card__point--con">
                    <Minus width={13} height={13} /> {c}
                  </li>
                ))}
              </ul>
              <a href="#lead-form" className="review-card__link">
                Read full review <ArrowRight width={14} height={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
