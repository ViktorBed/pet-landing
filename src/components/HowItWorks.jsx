import { useMemo, useState } from 'react'
import { casinos, matchScore, preferenceOptions } from '../data/casinos.js'
import { Bars, Check, Gift, Sliders } from './icons.jsx'

const steps = [
  {
    icon: Sliders,
    title: 'Tell us what matters',
    text: 'Pick the things you actually care about — payout speed, bonus size, live tables. No sign-up needed to try it.',
  },
  {
    icon: Bars,
    title: 'Watch the ranking react',
    text: 'Every choice re-weighs our test scores in real time. The order you see is math, not sponsorship.',
  },
  {
    icon: Gift,
    title: 'Claim your match',
    text: 'Open your top match, claim the verified bonus, and we’ll email your full shortlist so you never lose it.',
  },
]

export default function HowItWorks() {
  const [selected, setSelected] = useState(['payout'])

  const toggle = (key) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const ranked = useMemo(
    () =>
      casinos
        .map((c) => ({ ...c, match: matchScore(c, selected) }))
        .sort((a, b) => b.match - a.match),
    [selected],
  )

  return (
    <section className="section section--tinted" id="how-it-works">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2>
            Three clicks, <em>zero</em> guesswork
          </h2>
        </div>

        <div className="hiw__layout">
          <ol className="hiw__steps" data-reveal>
            {steps.map((s) => (
              <li key={s.title} className="hiw__step">
                <span className="hiw__step-icon">
                  <s.icon width={20} height={20} />
                </span>
                <div>
                  <h3 className="hiw__step-title">{s.title}</h3>
                  <p className="hiw__step-text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="hiw__demo" data-reveal>
            <p className="hiw__demo-label">Try it — tap what matters to you</p>
            <div className="chip-row hiw__chips" role="group" aria-label="Your priorities">
              {preferenceOptions.map((opt) => {
                const active = selected.includes(opt.key)
                return (
                  <button
                    key={opt.key}
                    className={`chip ${active ? 'is-active' : ''}`}
                    aria-pressed={active}
                    onClick={() => toggle(opt.key)}
                  >
                    {active && <Check width={13} height={13} />}
                    {opt.label}
                  </button>
                )
              })}
            </div>

            <div className="rank-list" style={{ '--rows': ranked.length }}>
              {casinos.map((c) => {
                const index = ranked.findIndex((r) => r.id === c.id)
                const match = ranked[index].match
                return (
                  <div
                    key={c.id}
                    className="rank-row"
                    style={{ '--i': index }}
                    data-rank={index + 1}
                  >
                    <span className="rank-row__pos">{index + 1}</span>
                    <span className={`monogram monogram--sm monogram--${c.tone}`}>
                      {c.monogram}
                    </span>
                    <span className="rank-row__name">{c.name}</span>
                    <span className="rank-row__bar">
                      <span className="rank-row__fill" style={{ width: `${match}%` }} />
                    </span>
                    <span className="rank-row__match">{match}%</span>
                  </div>
                )
              })}
            </div>
            <p className="hiw__demo-note">
              Match % = your selected priorities weighed against our test sub-scores.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
