import type { ReactNode } from 'react'

interface ChipProps {
  active: boolean
  onToggle: () => void
  children: ReactNode
}

/** Toggleable filter chip — keeps the `is-active` class and `aria-pressed` in lockstep. */
export default function Chip({ active, onToggle, children }: ChipProps) {
  return (
    <button
      className={`chip ${active ? 'is-active' : ''}`}
      aria-pressed={active}
      onClick={onToggle}
    >
      {children}
    </button>
  )
}
