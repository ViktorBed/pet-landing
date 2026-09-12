import { useMemo, useState } from 'react'
import { casinos, matchScore, preferenceOptions } from '../../data/casinos.ts'
import type { FeatureKey } from '../../types/casino.ts'
import Chip from '../ui/Chip.tsx'
import { Check } from '../ui/icons.tsx'

interface Step {
  readonly n: string
  readonly title: string
  readonly text: string
}

const steps: readonly Step[] = [
  {
    n: '1',
    title: 'Tell us what matters',
    text: 'Pick the things you actually care about — payout speed, bonus size, live tables. No sign-up needed to try it.',
  },
  {
    n: '2',
    title: 'Watch the ranking react',
    text: 'Every choice re-weighs our test scores in real time. The order you see is math, not sponsorship.',
  },
  {
    n: '3',
    title: 'Claim your match',
    text: 'Open your top match, claim the verified bonus, and we’ll email your full shortlist so you never lose it.',
  },
]

export default function HowItWorks() {
  const [selected, setSelected] = useState<readonly FeatureKey[]>(['payout'])

  const toggle = (key: FeatureKey) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  // One entry per casino, in casinos order (stable DOM for the CSS reorder
  // animation); `position` is the casino's place in the sorted ranking.
  const ranked = useMemo(() => {
    const scored = casinos.map((casino) => ({ casino, match: matchScore(casino, selected) }))
    const order = [...scored].sort((a, b) => b.match - a.match)
    return scored.map((entry) => ({ ...entry, position: order.indexOf(entry) }))
  }, [selected])

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
            {steps.map((step) => (
              <li key={step.n} className="hiw__step">
                <span className="hiw__step-num">{step.n}</span>
                <div>
                  <h3 className="hiw__step-title">{step.title}</h3>
                  <p className="hiw__step-text">{step.text}</p>
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
                  <Chip key={opt.key} active={active} onToggle={() => toggle(opt.key)}>
                    {active && <Check width={13} height={13} />}
                    {opt.label}
                  </Chip>
                )
              })}
            </div>

            <div className="rank-list" style={{ '--rows': ranked.length }}>
              {ranked.map(({ casino, match, position }) => (
                <div
                  key={casino.id}
                  className="rank-row"
                  style={{ '--i': position }}
                  data-rank={position + 1}
                >
                  <span className="rank-row__pos">{position + 1}</span>
                  <span className={`monogram monogram--sm monogram--${casino.tone}`}>
                    {casino.monogram}
                  </span>
                  <span className="rank-row__name">{casino.name}</span>
                  <span className="rank-row__bar">
                    <span className="rank-row__fill" style={{ width: `${match}%` }} />
                  </span>
                  <span className="rank-row__match">{match}%</span>
                </div>
              ))}
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
