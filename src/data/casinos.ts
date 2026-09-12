import type { Casino, FaqItem, FeatureKey, PreferenceOption, Review } from '../types/casino.ts'
import { FEATURE_KEYS } from '../types/casino.ts'

// Fictional brands — placeholders for the test task.

export const casinos: readonly Casino[] = [
  {
    id: 'novaspin',
    name: 'NovaSpin',
    monogram: 'NS',
    tone: 'lime',
    score: 9.4,
    verdict: 'Fastest payouts we’ve tested',
    bonus: '200% up to €500 + 220 free spins',
    payout: '0–2 h',
    minDeposit: '€10',
    games: '4,200+',
    tags: ['Fast payouts', 'Crypto', 'Live casino'],
    features: { payout: 10, bonus: 9, games: 8, crypto: 10, live: 9 },
  },
  {
    id: 'velvet-ace',
    name: 'Velvet Ace',
    monogram: 'VA',
    tone: 'gold',
    score: 9.1,
    verdict: 'Best live casino',
    bonus: '€300 welcome pack + 10% weekly cashback',
    payout: '2–6 h',
    minDeposit: '€20',
    games: '3,100+',
    tags: ['Live casino', 'VIP program', 'Cashback'],
    features: { payout: 8, bonus: 8, games: 7, crypto: 6, live: 10 },
  },
  {
    id: 'mintplay',
    name: 'MintPlay',
    monogram: 'MP',
    tone: 'steel',
    score: 8.8,
    verdict: 'Best for beginners',
    bonus: '100% up to €200, wager ×25',
    payout: '4–12 h',
    minDeposit: '€5',
    games: '2,600+',
    tags: ['Low minimum', 'Easy wagering', 'Mobile app'],
    features: { payout: 7, bonus: 10, games: 6, crypto: 5, live: 7 },
  },
  {
    id: 'onyx-club',
    name: 'Onyx Club',
    monogram: 'OC',
    tone: 'violet',
    score: 8.6,
    verdict: 'Biggest game library',
    bonus: '150% up to €400 + 100 free spins',
    payout: '6–24 h',
    minDeposit: '€10',
    games: '6,800+',
    tags: ['Huge library', 'Tournaments', 'Slots'],
    features: { payout: 6, bonus: 7, games: 10, crypto: 7, live: 8 },
  },
]

// Record over FeatureKey so adding a feature forces a label at compile time.
const FEATURE_LABELS: Readonly<Record<FeatureKey, string>> = {
  payout: 'Fast payouts',
  bonus: 'Big welcome bonus',
  games: 'Huge game library',
  crypto: 'Crypto friendly',
  live: 'Live dealers',
}

/** Chip order in the live re-ranking demo. */
const PREFERENCE_ORDER = ['payout', 'bonus', 'live', 'crypto', 'games'] as const satisfies readonly FeatureKey[]

export const preferenceOptions: readonly PreferenceOption[] = PREFERENCE_ORDER.map((key) => ({
  key,
  label: FEATURE_LABELS[key],
}))

/** Weighs a casino's sub-scores against the visitor's priorities, as a 0–100 match. */
export function matchScore(casino: Casino, selectedKeys: readonly FeatureKey[]): number {
  const keys = selectedKeys.length > 0 ? selectedKeys : FEATURE_KEYS
  const sum = keys.reduce((acc, key) => acc + casino.features[key], 0)
  return Math.round((sum / keys.length) * 10)
}

export const reviews: readonly Review[] = [
  {
    id: 'novaspin-review',
    name: 'NovaSpin',
    monogram: 'NS',
    tone: 'lime',
    score: 9.4,
    date: 'Sep 8, 2026',
    excerpt:
      'Withdrew €250 to a crypto wallet in 41 minutes — the fastest cash-out we have timed this year. Bonus terms are unusually readable.',
    pros: ['41-min tested payout', 'Clear ×30 wagering'],
    cons: ['Small live-game lobby on mobile'],
  },
  {
    id: 'velvet-ace-review',
    name: 'Velvet Ace',
    monogram: 'VA',
    tone: 'gold',
    score: 9.1,
    date: 'Sep 2, 2026',
    excerpt:
      'The live floor is the real product: 40+ tables, native-speaking dealers and a cashback that actually pays weekly, no wagering attached.',
    pros: ['Wager-free cashback', '40+ live tables'],
    cons: ['€20 minimum deposit'],
  },
  {
    id: 'mintplay-review',
    name: 'MintPlay',
    monogram: 'MP',
    tone: 'steel',
    score: 8.8,
    date: 'Aug 27, 2026',
    excerpt:
      'A €5 minimum deposit and ×25 wagering make this the gentlest entry point we track. Payouts are slower, but every one arrived.',
    pros: ['€5 min deposit', 'Lowest wagering on our index'],
    cons: ['12-h average payout'],
  },
]

export const faqs: readonly FaqItem[] = [
  {
    question: 'Is Shortlist free to use?',
    answer:
      'Yes. Matching, reviews and the full index are free. We earn a referral fee from some casinos when you sign up through our links — it never changes your bonus and never changes a casino’s score.',
  },
  {
    question: 'How are the ratings calculated?',
    answer:
      'Every casino gets the same test: we deposit real money, play, request a withdrawal and time it. Licence, bonus terms, game range and support responses are scored on a fixed rubric. Scores are re-checked every 90 days.',
  },
  {
    question: 'Can a casino pay for a higher position?',
    answer:
      'No. Commercial deals affect which casinos we can list, not where they rank. Ranking positions come from test scores alone, and we publish the scoring rubric openly.',
  },
  {
    question: 'Are the bonuses on this page real?',
    answer:
      'We re-verify every listed offer weekly and show the full key terms — wagering, max bet, expiry — before you click. If an offer changes, the card changes the same day.',
  },
  {
    question: 'What if gambling stops being fun?',
    answer:
      'Stop, and use the tools: every casino we list must offer deposit limits and self-exclusion. Free, confidential help is available at BeGambleAware.org. We only work with licensed operators, and you must be 18+.',
  },
]
