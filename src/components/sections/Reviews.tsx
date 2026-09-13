import { reviews } from '../../data/casinos.ts'
import { ArrowRight, Check, Minus } from '../ui/icons.tsx'
import TiltCard from '../ui/TiltCard.tsx'

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
          {reviews.map((review, i) => (
            <TiltCard as="article" key={review.id} className="review-card" delay={i * 0.09}>
              <header className="review-card__head">
                <span className={`monogram monogram--sm monogram--${review.tone}`}>
                  {review.monogram}
                </span>
                <div className="review-card__title">
                  <h3>{review.name}</h3>
                  <p className="review-card__date">{review.date}</p>
                </div>
                <span className="review-card__score">{review.score.toFixed(1)}</span>
              </header>
              <p className="review-card__excerpt">{review.excerpt}</p>
              <ul className="review-card__points">
                {review.pros.map((pro) => (
                  <li key={pro} className="review-card__point review-card__point--pro">
                    <Check width={13} height={13} /> {pro}
                  </li>
                ))}
                {review.cons.map((con) => (
                  <li key={con} className="review-card__point review-card__point--con">
                    <Minus width={13} height={13} /> {con}
                  </li>
                ))}
              </ul>
              <a href="#lead-form" className="review-card__link">
                Read full review <ArrowRight width={14} height={14} />
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
