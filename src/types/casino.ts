/** Monogram accent used by `.monogram--*` CSS modifiers. */
type Tone = 'lime' | 'gold' | 'steel' | 'violet'

/** Editorial sub-scores driving the live re-ranking demo. */
export const FEATURE_KEYS = ['payout', 'bonus', 'games', 'crypto', 'live'] as const

export type FeatureKey = (typeof FEATURE_KEYS)[number]

/** 0–10 editorial sub-scores, one per rankable feature. */
type FeatureScores = Readonly<Record<FeatureKey, number>>

export interface Casino {
  readonly id: string
  readonly name: string
  readonly monogram: string
  readonly tone: Tone
  /** Overall editorial score, 0–10. */
  readonly score: number
  readonly verdict: string
  readonly bonus: string
  /** Human-readable payout window, e.g. '0–2 h'. */
  readonly payout: string
  readonly minDeposit: string
  readonly games: string
  readonly tags: readonly string[]
  readonly features: FeatureScores
}

export interface PreferenceOption {
  readonly key: FeatureKey
  readonly label: string
}

export interface Review {
  readonly id: string
  readonly name: string
  readonly monogram: string
  readonly tone: Tone
  readonly score: number
  readonly date: string
  readonly excerpt: string
  readonly pros: readonly string[]
  readonly cons: readonly string[]
}

export interface FaqItem {
  readonly question: string
  readonly answer: string
}
