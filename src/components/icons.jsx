const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const ArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Check = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
)

export const Minus = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
  </svg>
)

export const Clock = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const Shield = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
  </svg>
)

export const Star = (props) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6-5.9-3.4-5.9 3.4 1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" />
  </svg>
)

export const Plus = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Sliders = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h7M18 7h2M4 17h2M13 17h7" />
    <circle cx="15" cy="7" r="2.5" />
    <circle cx="9" cy="17" r="2.5" />
  </svg>
)

export const Bars = (props) => (
  <svg {...base} {...props}>
    <path d="M5 20v-6M12 20V4M19 20v-9" />
  </svg>
)

export const FileText = (props) => (
  <svg {...base} {...props}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4M9.5 12h5M9.5 16h5" />
  </svg>
)

export const Scale = (props) => (
  <svg {...base} {...props}>
    <path d="M12 4.5v14.5M8.5 19h7M5 7.5l7-2.5 7 2.5" />
    <path d="M2.5 12.5L5 7.5l2.5 5a2.6 2.6 0 0 1-5 0z" />
    <path d="M16.5 12.5l2.5-5 2.5 5a2.6 2.6 0 0 1-5 0z" />
  </svg>
)

export const Gift = (props) => (
  <svg {...base} {...props}>
    <rect x="4" y="9" width="16" height="11" rx="2" />
    <path d="M12 9v11M4 14h16" />
    <path d="M12 9c-2.2 0-4.5-.8-4.5-2.8A2.1 2.1 0 0 1 9.6 4c1.8 0 2.4 3 2.4 5z" />
    <path d="M12 9c2.2 0 4.5-.8 4.5-2.8A2.1 2.1 0 0 0 14.4 4C12.6 4 12 7 12 9z" />
  </svg>
)
