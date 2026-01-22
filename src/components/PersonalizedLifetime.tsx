import { useState, useMemo } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { User, Clock, Percent } from 'lucide-react'
import Decimal from 'decimal.js-light'
import { SPACE_122, formatBig } from '../lib/math'
import { usePrefersReducedMotion } from '../lib/hooks'
import { useEffect } from 'react'

const SECONDS_PER_YEAR = new Decimal(365.25 * 24 * 60 * 60)

export default function PersonalizedLifetime() {
  const [age, setAge] = useState<string>('')
  const prefersReducedMotion = usePrefersReducedMotion()

  const result = useMemo(() => {
    const ageNum = parseInt(age, 10)
    if (!age || isNaN(ageNum) || ageNum <= 0 || ageNum > 150) {
      return null
    }

    const secondsAlive = SECONDS_PER_YEAR.mul(ageNum)
    const guidsGenerated = secondsAlive // 1 GUID per second
    const percentOfSpace = guidsGenerated.div(SPACE_122).mul(100)
    const zerosAfterDecimal = Math.abs(Math.floor(Math.log10(percentOfSpace.toNumber()))) - 1

    return {
      age: ageNum,
      secondsAlive,
      guidsGenerated,
      percentOfSpace,
      zerosAfterDecimal,
      formattedGuids: formatBig(guidsGenerated, 2),
      formattedPercent: percentOfSpace.toExponential(2),
    }
  }, [age])

  // Animated counter for GUIDs
  const guidsMotion = useMotionValue(0)
  const displayGuids = useTransform(guidsMotion, (v) => {
    if (v < 1e6) return Math.floor(v).toLocaleString()
    return v.toExponential(2)
  })

  useEffect(() => {
    if (result) {
      const target = result.guidsGenerated.toNumber()
      animate(guidsMotion, target, {
        duration: prefersReducedMotion ? 0 : 1.2,
        ease: 'easeOut',
      })
    } else {
      guidsMotion.set(0)
    }
  }, [result, guidsMotion, prefersReducedMotion])

  return (
    <section className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Your lifetime in GUIDs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-center text-white/70 max-w-2xl mx-auto"
        >
          If you generated 1 GUID every second since birth, how much of the GUID space would you
          have used?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 backdrop-blur-card rounded-2xl p-6 max-w-xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-accent" />
            <label htmlFor="age-input" className="text-white/80">
              Enter your age:
            </label>
          </div>

          <input
            id="age-input"
            type="number"
            min="1"
            max="150"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 30"
            className="mt-3 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus-glow transition-all"
          />

          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-4"
            >
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                <Clock className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-white/60 text-sm">Seconds alive</p>
                  <p className="text-xl font-semibold">
                    {result.secondsAlive.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                <span className="text-accent text-lg font-mono mt-0.5">#</span>
                <div>
                  <p className="text-white/60 text-sm">GUIDs you would have generated</p>
                  <motion.p className="text-xl font-semibold">{displayGuids}</motion.p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/20 border border-accent/30">
                <Percent className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-white/60 text-sm">Percentage of GUID space used</p>
                  <p className="text-2xl font-bold text-accent">{result.formattedPercent}%</p>
                  <p className="mt-1 text-sm text-white/50">
                    That's a decimal point followed by{' '}
                    <span className="text-white/80 font-semibold">{result.zerosAfterDecimal}</span>{' '}
                    zeros before any significant digit.
                  </p>
                </div>
              </div>

              <p className="text-center text-white/50 text-sm pt-2">
                Even after {result.age} years of non-stop generation, you'd have barely scratched
                the surface of all possible GUIDs.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
