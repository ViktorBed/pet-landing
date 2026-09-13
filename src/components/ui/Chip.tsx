import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface ChipProps {
  active: boolean
  onToggle: () => void
  children: ReactNode
}

/** Toggleable filter chip — keeps the `is-active` class and `aria-pressed` in lockstep. */
export default function Chip({ active, onToggle, children }: ChipProps) {
  return (
    <motion.button
      className={`chip ${active ? 'is-active' : ''}`}
      aria-pressed={active}
      onClick={onToggle}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      {children}
    </motion.button>
  )
}
