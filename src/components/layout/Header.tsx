import { useEffect, useState } from 'react'
import { sections } from '../../data/nav.ts'
import AnchorLink from '../ui/AnchorLink.tsx'
import LogoMark from '../ui/LogoMark.tsx'

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
    if (!open) return
    const gutter = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header__inner">
        <AnchorLink section="top" className="header__logo" aria-label="Shortlist — home">
          <LogoMark size={36} />
          Shortlist
        </AnchorLink>

        <nav className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {sections.map((section) => (
            <AnchorLink key={section.id} section={section.id} onClick={closeMenu}>
              {section.label}
            </AnchorLink>
          ))}
          <AnchorLink
            section="lead-form"
            className="btn btn--primary header__nav-cta"
            onClick={closeMenu}
          >
            Find my casino
          </AnchorLink>
        </nav>

        <AnchorLink section="lead-form" className="btn btn--primary header__cta">
          Find my casino
        </AnchorLink>

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
