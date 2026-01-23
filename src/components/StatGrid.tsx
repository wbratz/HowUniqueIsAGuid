import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { useEffect, useRef, ReactNode } from 'react'
import { SPACE_122, estimates, yearsToExhaust, prettyInt, speakableWithName } from '../lib/math'
import ShareButton from './ShareButton'

type Item = {
  id: string
  title: string
  num: number
  format: (n: number) => string
  foot: ReactNode
  detail: ReactNode
  shareText: string
}

const items: Item[] = (() => {
  const perGrain = SPACE_122.div(estimates.grainsOfSand)
  const perPerson = SPACE_122.div(estimates.people)
  const yearsAt1Bps = yearsToExhaust('1e9', SPACE_122)
  const coinFlips = 122

  return [
    {
      id: 'guids-per-sand-grain',
      title: 'Per grain of sand',
      num: perGrain.toNumber(),
      format: (n) => `${speakableWithName(new Decimal(n))} GUIDs`,
      foot: (
        <>
          …for every grain of sand on Earth<sup>1</sup>
        </>
      ),
      detail: `~${prettyInt(perGrain)} per grain`,
      shareText: `There are ${speakableWithName(perGrain)} possible GUIDs for every grain of sand on Earth.`,
    },
    {
      id: 'guids-per-person',
      title: 'Per person alive',
      num: perPerson.toNumber(),
      format: (n) => `${speakableWithName(new Decimal(n))} GUIDs`,
      foot: (
        <>
          …for each of the ~8 billion people<sup>2</sup>
        </>
      ),
      detail: `${prettyInt(perPerson)} each`,
      shareText: `There are ${speakableWithName(perPerson)} possible GUIDs for each person alive on Earth.`,
    },
    {
      id: 'time-to-exhaust',
      title: 'Time to "run out"',
      num: yearsAt1Bps.toNumber(),
      format: (n) => `${speakableWithName(new Decimal(n))} years`,
      foot: '…if you minted 1 billion GUIDs per second',
      detail: (
        <>
          That's astronomically longer than the age of the universe<sup>3</sup>
        </>
      ),
      shareText: `Generating 1 billion GUIDs per second, it would take ${speakableWithName(yearsAt1Bps)} years to run out. That's astronomically longer than the age of the universe.`,
    },
    {
      id: 'coin-flip-analogy',
      title: 'Coin‑flip analogy',
      num: coinFlips,
      format: (n) => `${Math.round(n)} flips`,
      foot: 'Equivalent to flipping 122 fair coins',
      detail: '…and using the exact head/tail sequence as your ID',
      shareText: `A GUID has 122 random bits - like flipping 122 coins and using the exact head/tail sequence as your unique ID.`,
    },
  ]
})()

function StatCard({
  id,
  title,
  num,
  format,
  foot,
  detail,
  shareText,
  index,
}: Item & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (latest) => format(latest))

  useEffect(() => {
    if (inView) {
      animate(motionValue, num, { duration: 1.2, ease: 'easeOut' })
    }
  }, [inView, num, motionValue])

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="backdrop-blur-card rounded-2xl p-6 group"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-white/70 text-sm">{title}</p>
        <ShareButton
          section={id}
          title={`${format(num)} ${title}`}
          text={shareText}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <motion.p className="text-2xl font-semibold mt-2">{display}</motion.p>
      <p className="text-white/60 text-xs mt-1">{foot}</p>
      <p className="text-white/50 text-xs mt-3">{detail}</p>
    </motion.div>
  )
}

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
          So how many unique GUIDs are there?
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <StatCard key={i} index={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  )
}
