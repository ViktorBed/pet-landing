export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">
              Shortlist<span>.</span>
            </p>
            <p className="footer__tag">The independent casino index. Tested, timed, translated.</p>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            <a href="#offers">Top offers</a>
            <a href="#how-it-works">How it works</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>

        <div className="footer__legal">
          <span className="footer__age" aria-label="18 plus only">
            18+
          </span>
          <p>
            Gambling involves risk. Play responsibly and only with money you can afford to lose.
            Free, confidential support:{' '}
            <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer noopener">
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
