import { motion } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { useState, useMemo } from 'react'
import { collisionProbability, SPACE_122 } from '../lib/math'

export default function ProbabilityCalculator() {
  const examples = [
    { label: '1 million GUIDs', n: '1e6' },
    { label: '1 billion GUIDs', n: '1e9' },
    { label: '1 trillion GUIDs', n: '1e12' },
    { label: '1 quadrillion GUIDs', n: '1e15' },
    { label: '1 quintillion GUIDs', n: '1e18' },
  ]

  const [nStr, setNStr] = useState<string>('')
  const sanitize = (s: string) => s.replace(/[,_\s]/g, '')

  const result = useMemo(() => {
    const clean = sanitize(nStr)
    if (!clean.trim()) return { text: '—', interp: '' }
    try {
        const N = new Decimal(clean)
        if (!Number.isFinite(N.toNumber()) || N.isNegative()) return { text: 'Invalid', interp: '' }
      const p = collisionProbability(N, SPACE_122).mul(100)
      const text = p.lessThan(0.000001) ? p.toExponential(2) + '%' : p.toFixed(6) + '%'
      const interp = `If you create ${N.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} GUIDs, the chance any two are the same is ${text}.`
      return { text, interp }
    } catch {
      return { text: 'Invalid', interp: '' }
    }
  }, [nStr])

  return (
    <section id="calc" className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Will any two match? (birthday probability)
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 backdrop-blur-card rounded-2xl p-6">
            <label htmlFor="n" className="text-sm text-white/70">How many GUIDs do you generate (n)?</label>
            <input
              id="n"
              inputMode="numeric"
              value={nStr}
              onChange={(e) => setNStr(e.target.value)}
              placeholder="e.g., 50,000 or 1e9"
              className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-accent/50"
            />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setNStr(ex.n)}
                  className="rounded-xl bg-white/5 px-4 py-3 text-left hover:bg-white/10 transition"
                >
                  <p className="text-sm text-white/70">{ex.label}</p>
                  <p className="font-semibold">
                    {(() => {
                      const N = new Decimal(ex.n)
                      const p = collisionProbability(N, SPACE_122).mul(100)
                      return p.lessThan(0.000001) ? p.toExponential(2) + '%' : p.toFixed(6) + '%'
                    })()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-card rounded-2xl p-6">
            <p className="text-sm text-white/70">Chance of at least one duplicate</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">{result.text}</p>
            <p className="mt-4 text-xs text-white/60">Uses the birthday approximation p ≈ 1 − exp(−n(n−1) / (2·2^122)).</p>
            <p className="mt-3 text-xs text-white/60">{result.interp}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
