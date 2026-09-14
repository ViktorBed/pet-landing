// Consent state shared between the banner UI and the analytics bootstrap
// (public/init-analytics.js reads the same storage key on page load).
export type ConsentChoice = 'granted' | 'denied'

const CONSENT_KEY = 'sl_consent'

declare global {
  interface Window {
    slLoadTrackers?: () => void
  }
}

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function storeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    /* storage unavailable (private mode) — the choice just won't persist */
  }
  if (choice === 'granted') window.slLoadTrackers?.()
}
