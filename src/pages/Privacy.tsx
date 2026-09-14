import { Link } from 'react-router-dom'
import { contacts } from '../data/contacts.ts'
import LegalLayout from './LegalLayout.tsx'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="13 September 2026">
      <h2>1. Who we are</h2>
      <p>
        Shortlist (“we”, “us”) operates this website from {contacts.address}. This policy explains
        what personal data we collect, why, and what rights you have.
      </p>

      <h2>2. Data we collect</h2>
      <ul>
        <li>
          <strong>Data you give us</strong> — your name and email address when you request your
          personal shortlist through the form on our site.
        </li>
        <li>
          <strong>Data collected automatically</strong> — usage and device data via Google Tag
          Manager / Google Analytics and Meta Pixel (pages viewed, approximate location, device
          type, referral source), plus advertising identifiers where you have consented.
        </li>
      </ul>

      <h2>3. How we use it</h2>
      <ul>
        <li>
          To email you the casino shortlist you requested and occasional follow-up offers (you can
          unsubscribe with one click in any email).
        </li>
        <li>To measure site performance and improve our content.</li>
        <li>To measure the effectiveness of our advertising.</li>
      </ul>

      <h2>4. Legal basis</h2>
      <p>
        We process your data on the basis of your consent (form submission, marketing emails) and
        our legitimate interest in operating and improving the site (analytics).
      </p>

      <h2>5. Sharing</h2>
      <p>
        We do not sell your personal data. It is shared only with the service providers that run
        our infrastructure and analytics (e.g. Google, Meta, our email delivery provider), each
        bound by their own data-processing terms.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep your contact details until you unsubscribe or ask us to delete them, and analytics
        data for the standard retention period of the respective tool.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data, withdraw
        consent, or object to processing at any time — just email us. If you are in the EEA/UK you
        also have the right to lodge a complaint with your supervisory authority.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use cookies and similar technologies set by Google Tag Manager, Google Analytics and
        Meta Pixel — but only after you accept them in the consent banner. If you decline, no
        analytics or advertising scripts are loaded. You can also block cookies in your browser
        settings; the site keeps working without them.
      </p>

      <h2>9. Age limit</h2>
      <p>
        This site is for adults 18+. We do not knowingly collect data from minors; if you believe
        a minor has provided us data, contact us and we will delete it.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update this policy from time to time; the current version is always available on
        this page. See also our <Link to="/terms">Terms of Use</Link>.
      </p>
    </LegalLayout>
  )
}
