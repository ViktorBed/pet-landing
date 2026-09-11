// Tracking groundwork: capture UTM / click IDs on first touch, persist them,
// and expose a single trackLead() entry point for the analytics layer
// (Meta Pixel / GTM dataLayer / gtag get wired here later).

const TRACKED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
  'ttclid',
  'msclkid',
]

const STORAGE_KEY = 'sl_tracking'

export function captureTrackingParams() {
  let stored = {}
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    stored = {}
  }

  const query = new URLSearchParams(window.location.search)
  let touched = false
  for (const key of TRACKED_PARAMS) {
    const value = query.get(key)
    if (value) {
      stored[key] = value
      touched = true
    }
  }
  if (touched) {
    stored.landing_url = window.location.href
    stored.first_touch_at = stored.first_touch_at || new Date().toISOString()
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      /* storage unavailable (private mode) — params still returned for this view */
    }
  }
  return stored
}

export function getTrackingParams() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function trackPageView() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'page_view', ...getTrackingParams() })
}

export function trackLead(lead) {
  const payload = { event: 'generate_lead', ...getTrackingParams(), ...lead }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
  console.log('[tracking] Lead event', payload)
}
