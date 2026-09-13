import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight } from '../ui/icons.tsx'
import CountUp from '../ui/CountUp.tsx'
import TiltCard from '../ui/TiltCard.tsx'
import { EASE_OUT } from '../ui/anim.ts'

interface Stat {
  readonly value: string
  readonly label: string
}

const stats: readonly Stat[] = [
  { value: '214', label: 'casinos tested with real deposits' },
  { value: '41 min', label: 'fastest verified payout this year' },
  { value: '90 days', label: 'max age of any score on the index' },
]

interface ScoreBar {
  readonly name: string
  readonly width: `${number}%`
  readonly score: string
}

const demoBars: readonly ScoreBar[] = [
  { name: 'Payout speed', width: '96%', score: '9.6' },
  { name: 'Bonus value', width: '91%', score: '9.1' },
  { name: 'Game library', width: '84%', score: '8.4' },
]

const copy: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true">
        <motion.span
          className="hero__blob hero__blob--rose"
          animate={reduced ? undefined : { x: [0, -70, 40, 0], y: [0, 45, -30, 0], scale: [1, 1.15, 0.92, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="hero__blob hero__blob--gold"
          animate={reduced ? undefined : { x: [0, 60, -40, 0], y: [0, -35, 25, 0], scale: [1, 0.9, 1.12, 1] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="container hero__inner">
        <motion.div className="hero__copy" variants={copy} initial="hidden" animate="show">
          <motion.p className="eyebrow" variants={item}>
            Independent casino index · updated weekly
          </motion.p>
          <motion.h1 className="hero__title" variants={item}>
            Stop guessing. Find the casino that actually fits <em>you</em>.
          </motion.h1>
          <motion.p className="hero__sub" variants={item}>
            We deposit real money, time every payout and read the bonus small print — then match
            you with your top three casinos in under a minute.
          </motion.p>
          <motion.div className="hero__actions" variants={item}>
            <a href="#lead-form" className="btn btn--primary btn--lg">
              Get my match — free
              <ArrowRight />
            </a>
            <a href="#offers" className="btn btn--ghost btn--lg">
              See top offers
            </a>
          </motion.div>
          <motion.dl className="hero__stats" variants={item}>
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <dt className="hero__stat-value">
                  <CountUp value={s.value} />
                </dt>
                <dd className="hero__stat-label">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="hero__visual"
          aria-hidden="true"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
        >
          <motion.div
            className="hero__orb"
            animate={reduced ? undefined : { rotate: 360, scale: [1, 1.07, 1] }}
            transition={{
              rotate: { duration: 45, repeat: Infinity, ease: 'linear' },
              scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
          <motion.div
            className="hero__float"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            <TiltCard className="match-card" maxTilt={6} lift={0}>
              <div className="match-card__head">
                <span className="monogram monogram--lime">NS</span>
                <div>
                  <p className="match-card__name">NovaSpin</p>
                  <p className="match-card__meta">Curacao licence · est. 2021</p>
                </div>
                <div className="match-ring">
                  <svg viewBox="0 0 44 44" width="44" height="44">
                    <circle cx="22" cy="22" r="19" className="match-ring__track" />
                    <motion.circle
                      cx="22"
                      cy="22"
                      r="19"
                      className="match-ring__value"
                      initial={{ strokeDashoffset: 119.4 }}
                      animate={{ strokeDashoffset: 2.4 }}
                      transition={{ duration: 1.1, delay: 0.8, ease: EASE_OUT }}
                    />
                  </svg>
                  <span className="match-ring__label">98%</span>
                </div>
              </div>
              <div className="match-card__bars">
                {demoBars.map((bar, i) => (
                  <div key={bar.name} className="scorebar">
                    <span className="scorebar__name">{bar.name}</span>
                    <span className="scorebar__track">
                      <motion.span
                        className="scorebar__fill"
                        initial={{ width: 0 }}
                        animate={{ width: bar.width }}
                        transition={{ duration: 0.9, delay: 0.7 + i * 0.12, ease: EASE_OUT }}
                      />
                    </span>
                    <span className="scorebar__num">{bar.score}</span>
                  </div>
                ))}
              </div>
              <div className="match-card__foot">
                <span className="match-card__bonus">200% up to €500</span>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
