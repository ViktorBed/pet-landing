import { useEffect } from 'react'

// Per-route document title; restores the previous one on unmount. Robots
// directives are NOT handled here — crawlers can't be relied on to run JS,
// so noindex for the legal pages is served as an X-Robots-Tag header
// (see vercel.json).
export function usePageMeta(title: string): void {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    return () => {
      document.title = prevTitle
    }
  }, [title])
}
