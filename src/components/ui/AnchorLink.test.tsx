import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, render, screen } from '@testing-library/react'
import AnchorLink from './AnchorLink.tsx'

describe('AnchorLink', () => {
  afterEach(cleanup)

  it('links to the landing page with the section hash', () => {
    render(
      <MemoryRouter initialEntries={['/terms']}>
        <AnchorLink section="offers">Top offers</AnchorLink>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Top offers' }).getAttribute('href')).toBe('/#offers')
  })

  it('forwards className and other anchor props', () => {
    render(
      <MemoryRouter>
        <AnchorLink section="lead-form" className="btn" aria-label="Find my casino">
          CTA
        </AnchorLink>
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: 'Find my casino' })
    expect(link.className).toBe('btn')
    expect(link.getAttribute('href')).toBe('/#lead-form')
  })
})
