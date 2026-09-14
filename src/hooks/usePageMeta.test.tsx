import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, renderHook } from '@testing-library/react'
import { usePageMeta } from './usePageMeta.ts'

describe('usePageMeta', () => {
  afterEach(cleanup)

  it('sets the document title on mount', () => {
    document.title = 'Original'
    renderHook(() => usePageMeta('Terms of Use — Shortlist'))
    expect(document.title).toBe('Terms of Use — Shortlist')
  })

  it('restores the previous title on unmount', () => {
    document.title = 'Original'
    const { unmount } = renderHook(() => usePageMeta('Privacy Policy — Shortlist'))
    unmount()
    expect(document.title).toBe('Original')
  })

  it('follows title changes across rerenders', () => {
    const { rerender } = renderHook(({ title }) => usePageMeta(title), {
      initialProps: { title: 'First' },
    })
    expect(document.title).toBe('First')
    rerender({ title: 'Second' })
    expect(document.title).toBe('Second')
  })
})
