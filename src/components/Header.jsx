import { useEffect, useState } from 'react'

const links = [
  { href: '#offers', label: 'Top offers' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__logo" aria-label="Shortlist — home">
          Shortlist<span className="header__logo-dot">.</span>
        </a>

        <nav className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#lead-form" className="btn btn--primary header__nav-cta" onClick={() => setOpen(false)}>
            Find my casino
          </a>
        </nav>

        <a href="#lead-form" className="btn btn--primary header__cta">
          Find my casino
        </a>

        <button
          className="header__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
