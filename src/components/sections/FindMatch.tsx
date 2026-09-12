import { useMemo, useState } from 'react'
import Chip from '../ui/Chip.tsx'
import { ArrowRight } from '../ui/icons.tsx'

const facets = [
  {
    key: 'bonus',
    label: 'Bonus type',
    options: ['Welcome package', 'Free spins', 'Cashback', 'No-wager'],
  },
  {
    key: 'payment',
    label: 'Payments',
    options: ['Visa / Mastercard', 'Crypto', 'Apple Pay', 'Bank transfer', 'Skrill'],
  },
  {
    key: 'games',
    label: 'Games',
    options: ['Slots', 'Live dealers', 'Blackjack', 'Roulette', 'Poker'],
  },
] as const

type FacetKey = (typeof facets)[number]['key']

type Picked = Partial<Record<FacetKey, readonly string[]>>

// Illustrative index sizes for the demo count — the full engine ships after sign-up.
const BASE_COUNT = 214

export default function FindMatch() {
  const [picked, setPicked] = useState<Picked>({})

  const toggle = (facet: FacetKey, option: string) =>
    setPicked((prev) => {
      const current = prev[facet] ?? []
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option]
      return { ...prev, [facet]: next }
    })

  const activeCount = Object.values(picked).flat().length
  const matches = useMemo(
    () => Math.max(3, Math.round(BASE_COUNT / Math.pow(2.4, activeCount))),
    [activeCount],
  )

  return (
    <section className="section section--tinted" id="match">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Find your perfect match</p>
          <h2>
            Your casino, <em>your rules</em>
          </h2>
          <p className="section__sub">
            This is what you unlock after a free sign-up: the full index, filtered to exactly what
            you play — in a few taps.
          </p>
        </div>

        <div className="finder" data-reveal>
          {facets.map((facet) => (
            <div key={facet.key} className="finder__facet">
              <p className="finder__facet-label">{facet.label}</p>
              <div className="chip-row chip-row--scroll" role="group" aria-label={facet.label}>
                {facet.options.map((option) => {
                  const active = (picked[facet.key] ?? []).includes(option)
                  return (
                    <Chip key={option} active={active} onToggle={() => toggle(facet.key, option)}>
                      {option}
                    </Chip>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="finder__result">
            <p className="finder__count" aria-live="polite">
              <strong>{matches}</strong> casinos match
              {activeCount === 0 ? ' — narrow it down' : ' your picks'}
            </p>
            <a href="#lead-form" className="btn btn--primary btn--lg">
              Unlock my full shortlist
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
