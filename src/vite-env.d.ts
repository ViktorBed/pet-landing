/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Tag Manager container id, e.g. 'GTM-XXXXXXX' */
  readonly VITE_GTM_ID?: string
  /** Meta Pixel id, e.g. '1234567890123456' */
  readonly VITE_META_PIXEL_ID?: string
  /** GA4 measurement id, e.g. 'G-XXXXXXXXXX' */
  readonly VITE_GA4_ID?: string
  /** Google Ads tag id, e.g. 'AW-123456789' */
  readonly VITE_GOOGLE_ADS_ID?: string
  /** Conversion label from the Google Ads conversion action ('AW-123/AbC…' → 'AbC…') */
  readonly VITE_GOOGLE_ADS_LABEL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
