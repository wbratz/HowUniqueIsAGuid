import { motion } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { SPACE_122, speakableWithName, estimates } from '../lib/math'
import ShareButton from './ShareButton'

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

  const grains = estimates.grainsOfSand
  const grainsSquared = grains.pow(2)
  const sandOdds = speakableWithName(grainsSquared).replace('about ', '')
  const guidOdds = speakableWithName(SPACE_122).replace('about ', '')

  const cards = [
    {
      id: 'lottery-streak',
      title: 'Lottery streak',
      lead: `Win Powerball about ${kPowerball.toFixed(0)} times in a row`,
      blurb:
        'Two random GUIDs matching is roughly as unlikely as hitting the Powerball jackpot ~4–5 times in a row.',
      foot: 'Powerball odds are 1 in 292,201,338 per drawing; assumes independence.',
      shareText:
        'GUIDs are unique IDs used across all digital systems. Two of them randomly matching is about as likely as winning the Powerball jackpot 4–5 times in a row.',
    },
    {
      id: 'sand-twice',
      title: 'Sand, twice in a row',
      lead: "Pick the exact same grain twice from all Earth's beaches",
      blurb:
        'Doing it twice — mixing the sand between picks — is a bit less likely than two random GUIDs matching.',
      foot: (
        <>
          Odds: ~1 in {sandOdds} vs ~1 in {guidOdds} for two GUIDs matching.<sup>1</sup>
        </>
      ),
      shareText:
        "Blindly pick one grain of sand from every beach on Earth, put it back, and pick the exact same grain again. That's roughly the odds of two GUIDs matching.",
    },
    {
      id: 'gamer-dice',
      title: 'Gamer dice',
      lead: `Match a specific ${kD20}-roll D20 sequence`,
      blurb: `Write down ${kD20} exact results on a 20-sided die (like 7, 13, 20, …). Rolling that exact sequence is on the same scale as two GUIDs matching.`,
      foot: 'A D20 is a 20-sided die used in games like Dungeons & Dragons.',
      shareText: `Write down ${kD20} specific numbers from 1–20. Now roll a 20-sided die ${kD20} times and hit every single one in order. Those are roughly the odds of two GUIDs matching.`,
    },
    {
      id: 'random-code',
      title: 'Typing a random code',
      lead: `Match a random ${chars36}-character code`,
      blurb:
        'With upper-case letters and digits only (A–Z, 0–9), ~24 random characters is comparable to two GUIDs matching.',
      foot: '36^24 is slightly larger than 2^122; 23 would be slightly smaller.',
      shareText: `Randomly type ${chars36} characters using A–Z and 0–9. The odds of someone else randomly typing the exact same code? About the same as two GUIDs matching.`,
    },
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
          What are the odds two GUIDs would ever match?
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              id={c.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="rounded-2xl backdrop-blur-card p-6 group"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-white/70">{c.title}</p>
                <ShareButton
                  section={c.id}
                  title={c.lead}
                  text={c.shareText}
                  className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                />
              </div>
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
