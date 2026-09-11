import { Shield } from './icons.jsx'

const pillars = [
  {
    title: 'Real money, real stopwatch',
    text: 'Every score starts with our own deposit. We play, withdraw, and time the payout to the minute — 214 casinos and counting.',
  },
  {
    title: 'Licences checked, not assumed',
    text: 'We verify each licence number against the MGA, UKGC and Curacao registers before a casino can enter the index.',
  },
  {
    title: 'The small print, translated',
    text: 'Wagering, max bet, sticky terms — we read all of it and print the catch next to every bonus, in plain language.',
  },
  {
    title: 'Rankings are not for sale',
    text: 'Casinos can pay to be listed faster, never to rank higher. Positions come from test scores alone, rubric published.',
  },
]

export default function Trust() {
  return (
    <section className="section" id="trust">
      <div className="container">
        <div className="trust__layout">
          <div className="trust__intro" data-reveal>
            <p className="eyebrow eyebrow--gold">Why trust our rankings</p>
            <h2>
              Skin in the game, <em>on your side</em>
            </h2>
            <p className="section__sub">
              Affiliate sites usually rank whoever pays best. We built Shortlist the opposite way —
              and put our method where everyone can audit it.
            </p>
            <div className="trust__badge">
              <Shield width={20} height={20} />
              <div>
                <p className="trust__badge-title">How we make money</p>
                <p className="trust__badge-text">
                  Some casinos pay us a referral fee when you join through Shortlist. It never
                  changes your bonus — and it has never changed a score.
                </p>
              </div>
            </div>
          </div>

          <div className="trust__grid">
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className="trust-card"
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <h3 className="trust-card__title">{p.title}</h3>
                <p className="trust-card__text">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
