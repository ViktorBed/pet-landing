import { useEffect, useState } from 'react'
import LogoMark from '../ui/LogoMark.tsx'

interface NavLink {
  readonly href: string
  readonly label: string
}

const links: readonly NavLink[] = [
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

  // fullscreen mobile menu — freeze the page behind it. Removing the scrollbar
  // changes the layout width, which would derail an in-flight smooth anchor
  // scroll — pad the body by the scrollbar width so the layout never shifts.
  useEffect(() => {
    if (open) {
      const gutter = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (gutter > 0) document.body.style.paddingRight = `${gutter}px`
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__logo" aria-label="Shortlist — home">
          <LogoMark size={36} />
          Shortlist
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
