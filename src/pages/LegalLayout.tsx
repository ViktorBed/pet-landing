import type { ReactNode } from 'react'
import { contacts } from '../data/contacts.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'

interface LegalLayoutProps {
  readonly title: string
  readonly updated: string
  readonly children: ReactNode
}

/** Shared frame for the legal pages: article column plus the contact box. */
export default function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  usePageMeta(`${title} — Shortlist`)

  return (
    <main className="container container--narrow legal">
      <h1>{title}</h1>
      <p className="legal__updated">Last updated: {updated}</p>

      {children}

      <div className="legal__contact">
        <p>
          <strong>Contact us</strong>
        </p>
        <p>
          Phone: <a href={contacts.phoneHref}>{contacts.phone}</a>
        </p>
        <p>
          Email: <a href={contacts.emailHref}>{contacts.email}</a>
        </p>
        <p>Address: {contacts.address}</p>
      </div>
    </main>
  )
}
