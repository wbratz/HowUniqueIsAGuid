import { motion } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { SPACE_122 } from '../lib/math'

const ODDS_POWERBALL = new Decimal('292201338')
const LN2 = Math.LN2

function powerballWinsEquivalent() {
  const k = (122 * LN2) / Math.log(ODDS_POWERBALL.toNumber())
  return k
}

function rollsNeeded(base: number) {
  return (122 * LN2) / Math.log(base)
}

function charsNeeded(alphabet: number) {
  return Math.ceil(rollsNeeded(alphabet))
}

export default function RelatableScenarios() {
  const kPowerball = powerballWinsEquivalent()
  const kD20 = Math.round(rollsNeeded(20))
  const chars36 = charsNeeded(36)
  const chars62 = charsNeeded(62)

  const grains = new Decimal('7.5e18')
  const twoSameGrainTwiceProb = new Decimal(1).div(grains.pow(2))
  const pairCollisionProb = new Decimal(1).div(SPACE_122)

  const cards = [
    {
      title: 'Lottery streak',
      lead: `Win Powerball about ${kPowerball.toFixed(2)} times in a row`,
      blurb:
        'Two fresh random v4 GUIDs matching is roughly as unlikely as hitting the Powerball jackpot ~4–5 times in a row.',
      foot: 'Powerball odds are 1 in 292,201,338 per drawing; assumes independence.'
    },
    {
      title: 'Gamer dice',
      lead: `Match a specific ${kD20}-roll D20 sequence`,
      blurb:
        'Write down 28 exact D20 results (like 7, 13, 20, …). Rolling that exact sequence is on the same scale as a two‑GUID collision.',
      foot: 'Uses base^k ≈ 2^122 with base = 20.'
    },
    {
      title: 'Typing a random code (A–Z, 0–9)',
      lead: `Match a random ${chars36}-character code`,
      blurb:
        'With upper‑case letters and digits only, ~24 random characters is comparable to a two‑GUID collision.',
      foot: '36^24 is slightly larger than 2^122; 23 would be slightly smaller.'
    },
    {
      title: 'Typing a random code (a–z, A–Z, 0–9)',
      lead: `Match a random ${chars62}-character code`,
      blurb:
        'Using upper+lower+digits, about 21 characters is on the same order as a two‑GUID collision.',
      foot: '62^21 ≈ 2^122 (order of magnitude).'
    },
    {
      title: 'Sand, twice in a row',
      lead: 'Pick the exact same grain twice from all Earth’s beaches',
      blurb:
        'Doing it twice — mixing the sand between picks — is a bit less likely than two random GUIDs matching.',
      foot: `1/(7.5e18)^2 ≈ ${twoSameGrainTwiceProb.toExponential(2)} vs 1/2^122 ≈ ${pairCollisionProb.toExponential(2)}.`
    }
  ]

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
          Everyday-scale ways to feel the odds
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="rounded-2xl backdrop-blur-card p-6"
            >
              <p className="text-sm text-white/70">{c.title}</p>
              <p className="mt-2 text-xl font-semibold">{c.lead}</p>
              <p className="mt-2 text-sm text-white/60">{c.blurb}</p>
              <p className="mt-3 text-xs text-white/50">{c.foot}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
