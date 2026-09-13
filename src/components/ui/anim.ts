import type { Transition } from 'motion/react'

// Shared motion vocabulary — one easing and one spring across the site so
// every animated surface feels like the same material.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const hoverSpring: Transition = { type: 'spring', stiffness: 320, damping: 24 }

export const viewportOnce = { once: true, margin: '0px 0px -40px 0px' } as const
