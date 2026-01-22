import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Clock, Zap } from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/hooks'

// Estimated global GUID generation rate: ~50,000 per second
// This is a conservative estimate based on enterprise usage patterns
const GUIDS_PER_SECOND = 50000

export default function TimeOnPage() {
  const [seconds, setSeconds] = useState(0)
  const guidsGenerated = useMotionValue(0)
  const displayGuids = useTransform(guidsGenerated, (v) => Math.floor(v).toLocaleString())
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const target = seconds * GUIDS_PER_SECOND
    animate(guidsGenerated, target, {
      duration: prefersReducedMotion ? 0 : 0.8,
      ease: 'easeOut',
    })
  }, [seconds, guidsGenerated, prefersReducedMotion])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    if (mins > 0) {
      return `${mins}m ${secs}s`
    }
    return `${secs}s`
  }

  return (
    <section className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-card rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-white/70 mb-4">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Live counter</span>
          </div>

          <p className="text-lg text-white/80 mb-2">
            In the <span className="text-accent font-bold text-xl">{formatTime(seconds)}</span>{' '}
            you've been here...
          </p>

          <div className="my-6">
            <div className="flex items-center justify-center gap-3">
              <Zap className="h-8 w-8 text-accent" />
              <motion.span className="text-4xl md:text-5xl font-bold text-white">
                {displayGuids}
              </motion.span>
            </div>
            <p className="mt-2 text-white/60">GUIDs have been generated worldwide*</p>
          </div>

          <p className="text-sm text-white/50 max-w-lg mx-auto">
            And not a single duplicate. At ~50,000 GUIDs per second globally, it would take{' '}
            <span className="text-white/70">168 billion years</span> to use just 1% of all possible
            GUIDs.
          </p>

          <p className="mt-4 text-xs text-white/30">
            *Estimate based on typical enterprise usage patterns
          </p>
        </motion.div>
      </div>
    </section>
  )
}
