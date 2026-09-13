import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { EASE_OUT, hoverSpring, viewportOnce } from './anim.ts'

interface TiltCardProps {
  as?: 'article' | 'div'
  className?: string
  children: ReactNode
  /** Entrance delay in seconds (stagger by index). */
  delay?: number
  /** Max tilt in degrees at the card edges. */
  maxTilt?: number
  /** translateY on hover, px (0 disables the lift). */
  lift?: number
}

const tiltSpring = { stiffness: 220, damping: 18, mass: 0.6 }

/**
 * Card with a pointer-tracking 3D tilt and a light glare that follows the
 * cursor. Touch pointers are ignored; reduced-motion users get a static card
 * with the plain scroll-in fade.
 */
export default function TiltCard({
  as = 'div',
  className,
  children,
  delay = 0,
  maxTilt = 4,
  lift = -6,
}: TiltCardProps) {
  const reduced = useReducedMotion()

  // Pointer position over the card, normalised to 0..1.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), tiltSpring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), tiltSpring)

  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(420px 320px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.09), transparent 60%)`

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onPointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  const Comp = as === 'article' ? motion.article : motion.div

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      whileHover={reduced || lift === 0 ? undefined : { y: lift, transition: hoverSpring }}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={reduced ? undefined : onPointerMove}
      onPointerLeave={reduced ? undefined : onPointerLeave}
    >
      {children}
      {!reduced && (
        <motion.span className="card-glare" aria-hidden="true" style={{ background: glare }} />
      )}
    </Comp>
  )
}
