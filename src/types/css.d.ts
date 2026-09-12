import 'react'

// The design system drives staggered reveals and list reordering through
// CSS custom properties set inline (--reveal-delay, --rows, --i).
declare module 'react' {
  interface CSSProperties {
    [customProperty: `--${string}`]: string | number | undefined
  }
}
