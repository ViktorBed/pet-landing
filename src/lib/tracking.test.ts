import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { captureTrackingParams, getTrackingParams, trackLead, trackPageView } from './tracking.ts'

const vendorScripts = () =>
  document.querySelectorAll(
    'script[src*="googletagmanager"], script[src*="fbevents"], script[src*="facebook"]',
  ).length

function setUrl(path: string) {
  window.history.replaceState(null, '', path)
}

describe('tracking', () => {
  beforeEach(() => {
    localStorage.clear()
    window.dataLayer = []
    setUrl('/')
  })

  describe('captureTrackingParams', () => {
    it('captures utm params and click ids from the URL', () => {
      setUrl('/?utm_source=google&utm_campaign=launch&gclid=abc123&irrelevant=x')
      const params = captureTrackingParams()
      expect(params.utm_source).toBe('google')
      expect(params.utm_campaign).toBe('launch')
      expect(params.gclid).toBe('abc123')
      expect('irrelevant' in params).toBe(false)
    })

    it('persists captured params for later visits without params', () => {
      setUrl('/?utm_source=meta&fbclid=fb1')
      captureTrackingParams()
      setUrl('/')
      expect(getTrackingParams()).toMatchObject({ utm_source: 'meta', fbclid: 'fb1' })
    })

    it('keeps first-touch timestamp across repeat visits', () => {
      setUrl('/?utm_source=first')
      const first = captureTrackingParams().first_touch_at
      expect(first).toBeTruthy()
      setUrl('/?utm_source=second')
      const second = captureTrackingParams()
      expect(second.first_touch_at).toBe(first)
      expect(second.utm_source).toBe('second')
    })

    it('survives corrupt localStorage', () => {
      localStorage.setItem('sl_tracking', 'null')
      expect(() => captureTrackingParams()).not.toThrow()
      localStorage.setItem('sl_tracking', '{broken json')
      expect(captureTrackingParams()).toEqual({})
    })
  })

  describe('events', () => {
    it('trackPageView pushes a page_view event with stored params', () => {
      setUrl('/?utm_source=google')
      captureTrackingParams()
      trackPageView()
      const event = window.dataLayer.find(
        (e) => typeof e === 'object' && e !== null && (e as { event?: string }).event === 'page_view',
      )
      expect(event).toMatchObject({ event: 'page_view', utm_source: 'google' })
    })

    it('trackLead pushes generate_lead with the lead fields', () => {
      trackLead({ lead_name: 'Alex', lead_email: 'alex@example.com' })
      const event = window.dataLayer.find(
        (e) =>
          typeof e === 'object' && e !== null && (e as { event?: string }).event === 'generate_lead',
      )
      expect(event).toMatchObject({
        event: 'generate_lead',
        lead_name: 'Alex',
        lead_email: 'alex@example.com',
      })
    })
  })

  describe('consent gating', () => {
    // initAnalytics keeps module-level state (vendorsLoaded, window flag) —
    // give every test a fresh module instance
    const freshInit = async () => {
      vi.resetModules()
      const mod = await import('./tracking.ts')
      return mod.initAnalytics
    }

    afterEach(() => {
      window.__slAnalyticsInited = undefined
      delete window.slLoadTrackers
      document.querySelectorAll('script[src]').forEach((s) => s.parentNode?.removeChild(s))
    })

    it('loads no vendor scripts before consent and arms the shared consent hook', async () => {
      const init = await freshInit()
      const bootstrapLoader = vi.fn()
      window.slLoadTrackers = bootstrapLoader

      init()
      expect(vendorScripts()).toBe(0)

      // the banner's Accept fires the shared hook: the bootstrap chain must
      // run, and the env-configured vendors (GA4, Meta Pixel) load only now
      window.slLoadTrackers?.()
      expect(bootstrapLoader).toHaveBeenCalledTimes(1)
      expect(vendorScripts()).toBeGreaterThan(0)
    })

    it('loads vendors immediately when consent was granted earlier', async () => {
      const init = await freshInit()
      localStorage.setItem('sl_consent', 'granted')
      init()
      expect(vendorScripts()).toBeGreaterThan(0)
    })
  })
})
