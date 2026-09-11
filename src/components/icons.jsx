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
