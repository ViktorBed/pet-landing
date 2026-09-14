import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getStoredConsent, storeConsent } from './consent.ts'

describe('consent', () => {
  beforeEach(() => {
    localStorage.clear()
    window.slLoadTrackers = vi.fn()
  })

  afterEach(() => {
    delete window.slLoadTrackers
  })

  it('returns null when nothing is stored', () => {
    expect(getStoredConsent()).toBeNull()
  })

  it('returns null for a corrupt stored value', () => {
    localStorage.setItem('sl_consent', 'whatever')
    expect(getStoredConsent()).toBeNull()
  })

  it('round-trips granted and denied', () => {
    storeConsent('granted')
    expect(getStoredConsent()).toBe('granted')
    storeConsent('denied')
    expect(getStoredConsent()).toBe('denied')
  })

  it('loads trackers only when consent is granted', () => {
    storeConsent('denied')
    expect(window.slLoadTrackers).not.toHaveBeenCalled()
    storeConsent('granted')
    expect(window.slLoadTrackers).toHaveBeenCalledTimes(1)
  })
})
