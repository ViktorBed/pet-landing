import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { EASE_OUT } from './anim.ts'

interface CountUpProps {
  /** Final text, e.g. "214", "41 min", "90 days" — the leading integer animates. */
  value: string
  duration?: number
}

/** Counts the leading number of `value` up from 0 when scrolled into view. */
export default function CountUp({ value, duration = 1.3 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    const match = /^(\d+)([\s\S]*)$/.exec(value)
    if (!inView || !el || !match || reduced) return
    const target = parseInt(match[1] ?? '', 10)
    const suffix = match[2] ?? ''
    const controls = animate(0, target, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, reduced])

  return <span ref={ref}>{value}</span>
}
