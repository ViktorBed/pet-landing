import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import LeadForm from './LeadForm.tsx'

function renderForm() {
  return render(
    <MemoryRouter>
      <LeadForm />
    </MemoryRouter>,
  )
}

describe('LeadForm', () => {
  beforeEach(() => {
    localStorage.clear()
    window.dataLayer = []
  })

  afterEach(cleanup)

  it('renders the form with name and email fields', () => {
    renderForm()
    expect(screen.getByLabelText(/your name/i)).toBeTruthy()
    expect(screen.getByLabelText(/email/i)).toBeTruthy()
  })

  it('submit shows the thanks state and fires generate_lead with the lead data', () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alex@example.com' } })
    fireEvent.submit(screen.getByRole('button', { name: /send my shortlist/i }))

    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.queryByRole('button', { name: /send my shortlist/i })).toBeNull()

    const lead = window.dataLayer.find(
      (e) =>
        typeof e === 'object' && e !== null && (e as { event?: string }).event === 'generate_lead',
    )
    expect(lead).toMatchObject({ lead_name: 'Alex', lead_email: 'alex@example.com' })
  })
})
