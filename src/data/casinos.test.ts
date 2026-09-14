import { describe, expect, it } from 'vitest'
import { FEATURE_KEYS } from '../types/casino.ts'
import { casinos, matchScore } from './casinos.ts'

const sample = casinos[0]
if (!sample) throw new Error('fixture: casinos list is empty')

describe('matchScore', () => {
  it('averages all features when nothing is selected', () => {
    const expected = Math.round(
      (FEATURE_KEYS.reduce((acc, key) => acc + sample.features[key], 0) / FEATURE_KEYS.length) *
        10,
    )
    expect(matchScore(sample, [])).toBe(expected)
  })

  it('scores a single selected feature as that feature alone', () => {
    const key = FEATURE_KEYS[0]!
    expect(matchScore(sample, [key])).toBe(Math.round(sample.features[key] * 10))
  })

  it('stays within 0-100 for every casino and every single feature', () => {
    for (const casino of casinos) {
      for (const key of FEATURE_KEYS) {
        const score = matchScore(casino, [key])
        expect(score).toBeGreaterThanOrEqual(0)
        expect(score).toBeLessThanOrEqual(100)
      }
    }
  })

  it('is deterministic regardless of key order', () => {
    const keys = [...FEATURE_KEYS]
    const reversed = [...keys].reverse()
    for (const casino of casinos) {
      expect(matchScore(casino, keys)).toBe(matchScore(casino, reversed))
    }
  })
})
