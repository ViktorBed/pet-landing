import { Link } from 'react-router-dom'
import { contacts } from '../data/contacts.ts'
import LegalLayout from './LegalLayout.tsx'

export default function Terms() {
  return (
    <LegalLayout title="Terms of Use" updated="13 September 2026">
      <h2>1. Who we are</h2>
      <p>
        Shortlist (“we”, “us”) is an independent online casino comparison and review service. We
        are not a gambling operator: we do not accept wagers, hold player funds or offer any games
        of chance. Our offices are located at {contacts.address}.
      </p>

      <h2>2. Acceptance of these terms</h2>
      <p>
        By accessing or using this website you agree to these Terms of Use. If you do not agree,
        please do not use the site.
      </p>

      <h2>3. Age restriction</h2>
      <p>
        This site is intended for adults aged 18 or over (or the legal gambling age in your
        jurisdiction, whichever is higher). By using the site you confirm that you meet this
        requirement. Online gambling is prohibited in some jurisdictions — it is your
        responsibility to comply with the laws that apply to you.
      </p>

      <h2>4. Nature of our content</h2>
      <p>
        Rankings, scores and reviews reflect our own testing methodology and editorial opinion.
        They are provided for information only and are not a guarantee of any outcome or winnings.
        Bonus terms are set by the operators and can change at any time — always verify the
        current terms on the operator’s site before depositing.
      </p>

      <h2>5. Affiliate disclosure</h2>
      <p>
        We may receive a referral fee when you register or deposit with an operator through links
        on this site. Fees never affect a casino’s score or position in our rankings.
      </p>

      <h2>6. No warranties; limitation of liability</h2>
      <p>
        The site is provided “as is” without warranties of any kind. To the maximum extent
        permitted by law we accept no liability for losses arising from your use of this site or
        of any third-party service linked from it, including gambling losses.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All content on this site — text, graphics, logos and the Shortlist mark — belongs to us or
        our licensors and may not be reproduced without written permission.
      </p>

      <h2>8. Responsible gambling</h2>
      <p>
        Gambling involves risk. Only play with money you can afford to lose. If gambling stops
        being fun, free and confidential help is available at{' '}
        <a href={contacts.responsibleGamblingUrl} target="_blank" rel="noreferrer noopener">
          BeGambleAware.org
        </a>
        .
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update these terms at any time; the current version is always available on this
        page. Continued use of the site after changes means you accept the updated terms. See also
        our <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </LegalLayout>
  )
}
