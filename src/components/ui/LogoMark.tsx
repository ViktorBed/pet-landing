interface LogoMarkProps {
  readonly size?: number
}

/**
 * Abstract mark — a three-blade aperture orb: two crimson blades and a white one,
 * with a counter-rotated translucent inner layer. Kept in sync with public/favicon.svg.
 */
export default function LogoMark({ size = 36 }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <path id="lm-blade" d="M 54.52 19 A 26 26 0 0 1 36.51 57.6 A 80 80 0 0 0 54.52 19 Z" />
        <linearGradient id="lm-g1" x1="54" y1="19" x2="37" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff4d5e" />
          <stop offset="1" stopColor="#e5333f" />
        </linearGradient>
        <linearGradient id="lm-g2" x1="54" y1="19" x2="37" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e5333f" />
          <stop offset="1" stopColor="#b3142a" />
        </linearGradient>
        <linearGradient id="lm-g3" x1="54" y1="19" x2="37" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9ced6" />
        </linearGradient>
      </defs>
      <g>
        <use href="#lm-blade" fill="url(#lm-g1)" />
        <use href="#lm-blade" fill="url(#lm-g2)" transform="rotate(120 32 32)" />
        <use href="#lm-blade" fill="url(#lm-g3)" transform="rotate(240 32 32)" />
      </g>
      <g transform="rotate(60 32 32) translate(11.2 11.2) scale(0.65)" opacity="0.4">
        <use href="#lm-blade" fill="#ff4d5e" />
        <use href="#lm-blade" fill="#ff4d5e" transform="rotate(120 32 32)" />
        <use href="#lm-blade" fill="#ffffff" transform="rotate(240 32 32)" />
      </g>
    </svg>
  )
}
