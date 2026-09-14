// Consent-gated analytics bootstrap. No third-party script (GTM, Meta Pixel)
// is loaded and no marketing cookie is set until the visitor accepts the
// consent banner (see src/components/ConsentBanner.tsx). External file so the
// CSP can keep script-src free of 'unsafe-inline'.
;(function () {
  var GTM_ID = 'GTM-KPX2ZJLN'
  var META_PIXEL_ID = '1119426050436499'
  var CONSENT_KEY = 'sl_consent'

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }

  // Google Consent Mode v2: everything denied until the visitor opts in.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  })

  var loaded = false

  // Injects GTM + Meta Pixel and flips consent to granted. Called on page
  // load when consent was stored earlier, or by the banner's Accept button.
  window.slLoadTrackers = function () {
    if (loaded) return
    loaded = true

    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    })

    // Google Tag Manager
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : ''
      j.async = true
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, 'script', 'dataLayer', GTM_ID)

    // Meta Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')
  }

  var stored = null
  try {
    stored = localStorage.getItem(CONSENT_KEY)
  } catch (e) {
    /* storage unavailable — treat as no consent */
  }
  if (stored === 'granted') window.slLoadTrackers()
})()
