import type { FC, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

const base: IconProps = {
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

export const ArrowRight: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Check: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
)

export const Minus: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
  </svg>
)

export const Clock: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const Shield: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
  </svg>
)

export const Plus: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const FileText: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4M9.5 12h5M9.5 16h5" />
  </svg>
)

export const Scale: FC<IconProps> = (props) => (
  <svg {...base} {...props}>
    <path d="M12 4.5v14.5M8.5 19h7M5 7.5l7-2.5 7 2.5" />
    <path d="M2.5 12.5L5 7.5l2.5 5a2.6 2.6 0 0 1-5 0z" />
    <path d="M16.5 12.5l2.5-5 2.5 5a2.6 2.6 0 0 1-5 0z" />
  </svg>
)

