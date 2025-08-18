import { motion } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { SPACE_122, estimates, yearsToExhaust, prettyInt, speakableWithName } from '../lib/math'

const items = (() => {
  const perGrain = SPACE_122.div(estimates.grainsOfSand)
  const perPerson = SPACE_122.div(estimates.people)
  const yearsAt1Bps = yearsToExhaust('1e9', SPACE_122)
  const coinFlips = 122

  return [
    {
      title: 'Per grain of sand',
      value: `${speakableWithName(perGrain)} GUIDs`,
      foot: '…for every grain of sand on Earth',
      detail: `~${prettyInt(perGrain)} per grain`,
    },
    {
      title: 'Per person alive',
      value: `${speakableWithName(perPerson)} GUIDs`,
      foot: '…for each of the ~8 billion people',
      detail: `${prettyInt(perPerson)} each`,
    },
    {
      title: 'Time to “run out”',
      value: `${speakableWithName(yearsAt1Bps)} years`,
      foot: '…if you minted 1 billion GUIDs per second',
      detail: `That’s astronomically longer than the age of the universe`,
    },
    {
      title: 'Coin‑flip analogy',
      value: `${coinFlips} flips`,
      foot: 'Equivalent to flipping 122 fair coins',
      detail: '…and using the exact head/tail sequence as your ID',
    },
  ]
})()

export default function StatGrid() {
  return (
    <section id="compare" className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Big numbers, grounded comparisons
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="backdrop-blur-card rounded-2xl p-6"
            >
              <p className="text-white/70 text-sm">{it.title}</p>
              <p className="text-2xl font-semibold mt-2">{it.value}</p>
              <p className="text-white/60 text-xs mt-1">{it.foot}</p>
              <p className="text-white/50 text-xs mt-3">{it.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
