# Shortlist — casino matcher landing

React + Vite landing page with a full analytics layer: Meta Pixel, GA4 / Google Ads
(gtag), GTM (dataLayer) and UTM / Click ID attribution.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the built site
```

## Analytics

All tracking lives in `src/lib/tracking.js`; it is initialised once in
`src/main.jsx` before React renders.

**Configuration** — copy `.env.example` to `.env` and fill in real IDs.
Vendors with an empty ID are skipped; the dataLayer, UTM capture, hidden form
fields and console logs work regardless, so everything is verifiable without
any live account.

| Variable | What it is |
| --- | --- |
| `VITE_GTM_ID` | GTM container (preferred route) |
| `VITE_META_PIXEL_ID` | Meta Pixel ID (direct install) |
| `VITE_GA4_ID` | GA4 measurement ID (direct gtag) |
| `VITE_GOOGLE_ADS_ID` + `VITE_GOOGLE_ADS_LABEL` | Google Ads conversion action |

**Events**

| Moment | dataLayer (GTM) | Meta Pixel | gtag |
| --- | --- | --- | --- |
| Page load | `page_view` + attribution | `PageView` | automatic via `config` |
| Lead form submit | `generate_lead` + attribution + lead fields | `Lead` | `generate_lead` (GA4) + `conversion` (Ads) |

When using the GTM route, create GA4/Pixel tags inside the container fired on
the custom events `page_view` and `generate_lead` — every push already carries
the UTM/click-ID fields as dataLayer variables.

**Attribution (UTM + Click ID)** — on first load `captureTrackingParams()`
reads `utm_source/medium/campaign/term/content`, `fbclid`, `gclid`, `gbraid`,
`wbraid`, `ttclid`, `msclkid` from the query string and persists them in
`localStorage` (`sl_tracking`, first-touch wins). They are then:

- injected as hidden inputs into the lead form (`src/components/LeadForm.jsx`),
- attached to every dataLayer push and to the GA4 `generate_lead` params,
- logged to the console (`[tracking] …`).

Lead name/email are treated as PII: they go into the dataLayer / your backend
only, never into direct Pixel or gtag calls.

**How to verify**

1. Open the site with tracking params, e.g.
   `http://localhost:4173/?utm_source=meta&utm_campaign=test&fbclid=FB123&gclid=G456`
2. DevTools console shows `[tracking] init` (active vendors + captured params)
   and `[tracking] PageView`.
3. Submit the form → `[tracking] Lead event` with attribution, and
   `window.dataLayer` contains the `generate_lead` push.
4. Reload without query params — attribution persists from localStorage.
5. With real IDs configured, check Meta Pixel Helper / GA4 DebugView /
   GTM Preview as usual.
