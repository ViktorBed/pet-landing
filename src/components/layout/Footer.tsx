import { Link } from 'react-router-dom'
import { contacts } from '../../data/contacts.ts'
import { sections } from '../../data/nav.ts'
import AnchorLink from '../ui/AnchorLink.tsx'
import LogoMark from '../ui/LogoMark.tsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">
              <LogoMark size={36} />
              Shortlist
            </p>
            <p className="footer__tag">The independent casino index. Tested, timed, translated.</p>
            <address className="footer__contacts">
              <a href={contacts.phoneHref}>{contacts.phone}</a>
              <a href={contacts.emailHref}>{contacts.email}</a>
              <span>{contacts.address}</span>
            </address>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            {sections.map((section) => (
              <AnchorLink key={section.id} section={section.id}>
                {section.label}
              </AnchorLink>
            ))}
            <Link to="/terms">Terms of Use</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>

        <div className="footer__legal">
          <span className="footer__age" aria-label="18 plus only">
            18+
          </span>
          <p>
            Gambling involves risk. Play responsibly and only with money you can afford to lose.
            Free, confidential support:{' '}
            <a href={contacts.responsibleGamblingUrl} target="_blank" rel="noreferrer noopener">
              BeGambleAware.org
            </a>
            . Shortlist lists licensed operators only and may receive referral fees — fees never
            affect rankings.
          </p>
        </div>

        <p className="footer__copy">© 2026 Shortlist. All rights reserved. This is a demo project.</p>
      </div>
    </footer>
  )
}
