import { motion } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { SPACE_122, speakableWithName } from '../lib/math'
import ShareButton from './ShareButton'

const Row = ({
  title,
  lead,
  blurb,
  id,
}: {
  title: string
  lead: string
  blurb: string
  id: string
}) => (
  <div id={id} className="rounded-2xl backdrop-blur-card p-6 group">
    <div className="flex items-start justify-between gap-2">
      <p className="text-sm text-white/70">{title}</p>
      <ShareButton
        section={id}
        title={lead}
        text={`${title}: ${lead}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
    <p className="mt-2 text-xl font-semibold">{lead}</p>
    <p className="mt-2 text-sm text-white/60">{blurb}</p>
  </div>
)

export default function DeepComparisons() {
  const stars = new Decimal('1e22')
  const atomsHuman = new Decimal('7e27')
  const idsPerStar = SPACE_122.div(stars)
  const idsPerAtomHuman = SPACE_122.div(atomsHuman)

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
          Stretch your intuition
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Row
            id="stars-comparison"
            title="Stars in the observable universe"
            lead={`${speakableWithName(idsPerStar)} GUIDs per star`}
            blurb="Even if you labeled each of ~10^22 stars with trillions of trillions of unique IDs, you'd barely scratch the surface of total possible GUIDs."
          />
          <Row
            id="atoms-comparison"
            title="Atoms in the human body"
            lead={`${speakableWithName(idsPerAtomHuman)} GUIDs per atom`}
            blurb="A typical human body has ~7×10^27 atoms, leaving hundreds of millions of v4 GUIDs for every atom."
          />
        </div>
      </div>
    </section>
  )
}
