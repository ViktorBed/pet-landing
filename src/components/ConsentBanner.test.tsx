import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ConsentBanner from './ConsentBanner.tsx'

function renderBanner() {
  return render(
    <MemoryRouter>
      <ConsentBanner />
    </MemoryRouter>,
  )
}

describe('ConsentBanner', () => {
  beforeEach(() => {
    localStorage.clear()
    window.slLoadTrackers = vi.fn()
  })

  afterEach(() => {
    cleanup()
    delete window.slLoadTrackers
  })

  it('shows when no choice is stored', () => {
    renderBanner()
    expect(screen.getByRole('region', { name: /cookie consent/i })).toBeTruthy()
  })

  it('does not show when a choice is already stored', () => {
    localStorage.setItem('sl_consent', 'denied')
    renderBanner()
    expect(screen.queryByRole('region', { name: /cookie consent/i })).toBeNull()
  })

  it('Accept stores consent, loads trackers and hides the banner', () => {
    renderBanner()
    fireEvent.click(screen.getByRole('button', { name: /accept/i }))
    expect(localStorage.getItem('sl_consent')).toBe('granted')
    expect(window.slLoadTrackers).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('region', { name: /cookie consent/i })).toBeNull()
  })

  it('Decline stores the refusal and does not load trackers', () => {
    renderBanner()
    fireEvent.click(screen.getByRole('button', { name: /decline/i }))
    expect(localStorage.getItem('sl_consent')).toBe('denied')
    expect(window.slLoadTrackers).not.toHaveBeenCalled()
    expect(screen.queryByRole('region', { name: /cookie consent/i })).toBeNull()
  })
})
