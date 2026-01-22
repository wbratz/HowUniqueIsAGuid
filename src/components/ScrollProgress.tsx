import { motion, useScroll, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/hooks'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = usePrefersReducedMotion()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 100,
    damping: prefersReducedMotion ? 100 : 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
