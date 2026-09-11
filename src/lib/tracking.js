// Analytics layer: Meta Pixel, GA4 / Google Ads (gtag) and GTM (dataLayer),
// plus first-touch capture of UTM params and click IDs (fbclid, gclid, …).
//
// Set your real IDs below or via a .env file (see .env.example). Vendors with
// an empty ID are simply skipped — dataLayer events, UTM capture, hidden form
// fields and console logging keep working either way, so the GTM route can be
// used on its own by only filling in VITE_GTM_ID.
const CONFIG = {
  gtmId: import.meta.env.VITE_GTM_ID || '', // 'GTM-XXXXXXX'
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '', // '1234567890123456'
  ga4Id: import.meta.env.VITE_GA4_ID || '', // 'G-XXXXXXXXXX'
  googleAdsId: import.meta.env.VITE_GOOGLE_ADS_ID || '', // 'AW-123456789'
  // Conversion label from the Google Ads conversion action ('AW-123/AbC…' → 'AbC…')
  googleAdsLabel: import.meta.env.VITE_GOOGLE_ADS_LABEL || '',
}

const TRACKED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
  'gbraid',
  'wbraid',
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

/* ---------------------------------------------------------------- loaders */

function loadScript(src) {
  const el = document.createElement('script')
  el.async = true
  el.src = src
  document.head.appendChild(el)
}

function loadGtm(id) {
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${id}`)
  // The usual <noscript> GTM iframe is omitted intentionally: this is a React
  // SPA, so a no-JS visitor gets no page at all — the iframe would never show.
}

// Fallback only: the canonical Meta Pixel install is the base code in
// index.html <head> (per Meta's docs), which defines fbq before this runs.
function loadMetaPixel(id) {
  if (window.fbq) return
  const fbq = (window.fbq = function (...args) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  })
  window._fbq = fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  loadScript('https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', id)
}

function loadGtag(ids) {
  window.gtag = function () {
    // gtag must forward `arguments` itself (not a rest-spread array) —
    // GA inspects the Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  for (const id of ids) window.gtag('config', id)
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`)
}

/* ------------------------------------------------------------------ init */

export function initAnalytics() {
  if (window.__slAnalyticsInited) return
  window.__slAnalyticsInited = true

  window.dataLayer = window.dataLayer || []
  const params = captureTrackingParams()

  if (CONFIG.gtmId) loadGtm(CONFIG.gtmId)
  if (CONFIG.metaPixelId) loadMetaPixel(CONFIG.metaPixelId)
  const gtagIds = [CONFIG.ga4Id, CONFIG.googleAdsId].filter(Boolean)
  if (gtagIds.length) loadGtag(gtagIds)

  trackPageView()

  console.log('[tracking] init', {
    vendors: {
      gtm: CONFIG.gtmId || '(off)',
      meta_pixel: CONFIG.metaPixelId || '(off)',
      ga4: CONFIG.ga4Id || '(off)',
      google_ads: CONFIG.googleAdsId || '(off)',
    },
    captured_params: params,
  })
}

/* ---------------------------------------------------------------- events */

export function trackPageView() {
  const params = getTrackingParams()
  // GTM route: fire a GA4 page_view tag off this event. Meta Pixel PageView
  // fires from the base code in index.html <head> (per Meta's spec); GA4
  // sends page_view automatically on gtag('config', …).
  window.dataLayer.push({ event: 'page_view', ...params })
  console.log('[tracking] PageView', params)
}

export function trackLead(lead) {
  const params = getTrackingParams()
  const payload = { ...params, ...lead }

  // GTM route: a GA4 "generate_lead" / Pixel "Lead" tag listens for this event.
  window.dataLayer.push({ event: 'generate_lead', ...payload })

  // Direct vendor calls. Only attribution params go out — lead name/email are
  // PII and stay in the dataLayer / your own backend.
  if (window.fbq) window.fbq('track', 'Lead')
  if (window.gtag) {
    if (CONFIG.ga4Id) {
      window.gtag('event', 'generate_lead', {
        utm_source: params.utm_source,
        utm_medium: params.utm_medium,
        utm_campaign: params.utm_campaign,
        gclid: params.gclid,
        fbclid: params.fbclid,
      })
    }
    if (CONFIG.googleAdsId && CONFIG.googleAdsLabel) {
      window.gtag('event', 'conversion', {
        send_to: `${CONFIG.googleAdsId}/${CONFIG.googleAdsLabel}`,
      })
    }
  }

  console.log('[tracking] Lead event', payload)
}
