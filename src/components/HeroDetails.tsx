import { motion } from 'framer-motion'
import { SPACE_128, SPACE_122, speakable, zerosLine } from '../lib/math'

export default function HeroDetails() {
  return (
    <section id="math" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white/70 max-w-2xl mx-auto">
            GUIDs (also called UUIDs) are 128‑bit identifiers — think of{' '}
            <span className="font-semibold">128 on/off switches</span>. In version 4 (the random
            kind), <span className="font-semibold">6 of those switches are reserved</span> to label
            the version and rules, so{' '}
            <span className="font-semibold">122 switches are truly random</span>. That's about the
            same randomness as <span className="font-semibold">122 coin flips</span>.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">Total possible GUIDs</h3>
              <p className="text-2xl font-bold">{speakable(SPACE_128)}</p>
              <p className="mt-2 text-white/70 text-sm">Math form: 2^128 ≈ 3.40 × 10^38</p>
              <p className="mt-1 text-white/60 text-xs">{zerosLine(SPACE_128)}</p>
            </div>
            <div className="backdrop-blur-card rounded-2xl p-6 shadow-glow">
              <h3 className="text-lg font-semibold mb-2">Usable GUIDs (version 4)</h3>
              <p className="text-2xl font-bold">{speakable(SPACE_122)}</p>
              <p className="mt-2 text-white/70 text-sm">Math form: 2^122 ≈ 5.32 × 10^36</p>
              <p className="mt-1 text-white/60 text-xs">{zerosLine(SPACE_122)}</p>
            </div>
          </div>

          <div className="mt-10 backdrop-blur-card rounded-2xl p-6">
            <p className="text-sm text-white/70">
              Chance that <span className="font-semibold">any two</span> match after generating{' '}
              <em>n</em> GUIDs:
            </p>
            <p className="text-xl md:text-2xl font-mono mt-3">
              p(n) ≈ 1 − exp( − n·(n−1) / ( 2 · 2^122 ) )
            </p>
            <p className="mt-3 text-xs text-white/60">
              Like asking "do any two people share a birthday?" — but with 5 undecillion
              "birthdays."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
