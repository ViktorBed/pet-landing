export interface Section {
  readonly id: string
  readonly label: string
}

// Landing-page section nav shared by the header and the footer. Rendered via
// <AnchorLink>, which owns cross-route hash navigation.
export const sections: readonly Section[] = [
  { id: 'offers', label: 'Top offers' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]
