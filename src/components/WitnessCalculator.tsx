import { motion, AnimatePresence } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { useMemo, useState } from 'react'
import { ChevronDown, Settings, User, Building2, Globe, Wrench } from 'lucide-react'
import {
  SPACE_122,
  expectedPairs,
  probAtLeastOne,
  witnessProbability,
  parseFlexibleNumber,
  humanOdds,
  humanCount,
  oddsAnalogy,
} from '../lib/math'
import { useAnimationProps } from '../lib/hooks'

type PersonaKey = 'hobbyist' | 'startup' | 'bigtech' | 'custom'
type TimePeriodKey = '1y' | '10y' | 'career' | '100y'

interface Persona {
  key: PersonaKey
  icon: React.ReactNode
  label: string
  subtitle: string
  globalPerDay: string
  orgPerDay: string
  visibility: number
  recognition: number
}

const PERSONAS: Persona[] = [
  {
    key: 'hobbyist',
    icon: <User className="h-6 w-6" />,
    label: 'Hobbyist',
    subtitle: 'A few per week',
    globalPerDay: '1e10',
    orgPerDay: '100',
    visibility: 1.0,
    recognition: 0.5,
  },
  {
    key: 'startup',
    icon: <Building2 className="h-6 w-6" />,
    label: 'Startup',
    subtitle: 'Thousands per day',
    globalPerDay: '1e11',
    orgPerDay: '50000',
    visibility: 0.2,
    recognition: 0.7,
  },
  {
    key: 'bigtech',
    icon: <Globe className="h-6 w-6" />,
    label: 'Big Tech',
    subtitle: 'Billions per day',
    globalPerDay: '1e12',
    orgPerDay: '1e7',
    visibility: 0.01,
    recognition: 0.8,
  },
  {
    key: 'custom',
    icon: <Wrench className="h-6 w-6" />,
    label: 'Custom',
    subtitle: 'Enter your own',
    globalPerDay: '1e12',
    orgPerDay: '1e7',
    visibility: 0.2,
    recognition: 0.8,
  },
]

const TIME_PERIODS: { key: TimePeriodKey; label: string; days: number }[] = [
  { key: '1y', label: '1 year', days: 365 },
  { key: '10y', label: '10 years', days: 3650 },
  { key: 'career', label: 'Whole career', days: 14600 },
  { key: '100y', label: '100 years', days: 36500 },
]

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.001,
  suffix = '',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  suffix?: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm text-white/70">
        <span>{label}</span>
        <span className="font-medium text-white/90">{(value * 100).toFixed(0)}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      {suffix && <div className="mt-1 text-xs text-white/50">{suffix}</div>}
    </div>
  )
}

export default function WitnessCalculator() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaKey>('startup')
  const [selectedTime, setSelectedTime] = useState<TimePeriodKey>('10y')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Custom overrides (only used when persona is 'custom')
  const [customGlobal, setCustomGlobal] = useState('1e12')
  const [customOrg, setCustomOrg] = useState('1e7')
  const [customVisibility, setCustomVisibility] = useState(0.2)
  const [customRecognition, setCustomRecognition] = useState(0.8)

  const { fadeIn, staggeredFadeIn } = useAnimationProps()

  const persona = PERSONAS.find((p) => p.key === selectedPersona)!
  const timePeriod = TIME_PERIODS.find((t) => t.key === selectedTime)!

  const isCustom = selectedPersona === 'custom'
  const globalPerDay = isCustom ? customGlobal : persona.globalPerDay
  const orgPerDay = isCustom ? customOrg : persona.orgPerDay
  const visibility = isCustom ? customVisibility : persona.visibility
  const recognition = isCustom ? customRecognition : persona.recognition

  const result = useMemo(() => {
    try {
      const Rw = parseFlexibleNumber(globalPerDay)
      const Ry = parseFlexibleNumber(orgPerDay)
      const D = new Decimal(timePeriod.days)
      if ([Rw, Ry].some((x) => !Number.isFinite(x.toNumber()) || x.isNegative())) throw new Error()

      const nGlobal = Rw.mul(D)
      const nYouSee = Ry.mul(visibility).mul(D)
      const exposure = nYouSee.div(nGlobal)

      // Layer 1: chance any duplicate exists globally
      const lambda = expectedPairs(nGlobal, SPACE_122)
      const pAnyGlobal = probAtLeastOne(lambda)

      // Layer 2 + 3: chance YOU witness and recognize one
      const pYouWitness = witnessProbability(nGlobal, exposure.toNumber(), recognition, SPACE_122)

      return {
        nGlobal,
        nYouSee,
        exposure,
        lambda,
        pAnyGlobal,
        pYouWitness,
      }
    } catch {
      return null
    }
  }, [globalPerDay, orgPerDay, timePeriod.days, visibility, recognition])

  return (
    <section id="witness" className="py-10 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeIn} className="text-center text-3xl font-bold md:text-4xl">
          What are <em className="text-accent">your</em> odds of seeing a duplicate?
        </motion.h2>

        <motion.p
          {...staggeredFadeIn(1)}
          className="mx-auto mt-4 max-w-2xl text-center text-white/70"
        >
          Even if a duplicate GUID were born somewhere in the world, three things would have to go
          wrong for <span className="font-semibold text-white/90">you</span> to ever notice.
        </motion.p>

        {/* Persona picker */}
        <motion.div {...staggeredFadeIn(2)} className="mt-8">
          <p className="mb-3 text-center text-sm text-white/60">
            Pick a scenario that sounds like you:
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {PERSONAS.map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedPersona(p.key)}
                className={`rounded-xl p-4 text-left transition-all ${
                  selectedPersona === p.key
                    ? 'bg-accent/20 ring-2 ring-accent/60'
                    : 'backdrop-blur-card hover:bg-white/10'
                }`}
              >
                <div className={`${selectedPersona === p.key ? 'text-accent' : 'text-white/60'}`}>
                  {p.icon}
                </div>
                <p className="mt-2 text-sm font-semibold">{p.label}</p>
                <p className="text-xs text-white/50">{p.subtitle}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Custom inputs (shown when "Custom" is selected) */}
        <AnimatePresence>
          {isCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl backdrop-blur-card p-5 md:grid-cols-2">
                <div>
                  <label className="text-sm text-white/70">GUIDs created worldwide per day</label>
                  <input
                    value={customGlobal}
                    onChange={(e) => setCustomGlobal(e.target.value)}
                    placeholder="e.g., 1,000,000,000,000"
                    className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">
                    GUIDs your organization creates per day
                  </label>
                  <input
                    value={customOrg}
                    onChange={(e) => setCustomOrg(e.target.value)}
                    placeholder="e.g., 10,000,000"
                    className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-accent/50"
                  />
                </div>
                <Slider
                  label="What share of your org's GUIDs do you personally see?"
                  value={customVisibility}
                  onChange={setCustomVisibility}
                  suffix="The fraction of IDs that cross your desk or your screen."
                />
                <Slider
                  label="If a duplicate crossed your desk, would you spot it?"
                  value={customRecognition}
                  onChange={setCustomRecognition}
                  suffix="How likely you are to notice two identical IDs."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time period picker */}
        <motion.div {...staggeredFadeIn(3)} className="mt-6">
          <p className="mb-3 text-center text-sm text-white/60">Over what time period?</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TIME_PERIODS.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedTime(t.key)}
                className={`rounded-full px-5 py-2 text-sm transition-all ${
                  selectedTime === t.key
                    ? 'bg-accent text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Three-layer results */}
        {result && (
          <div className="mt-10 space-y-4">
            {/* Layer 1: Does a duplicate exist? */}
            <motion.div {...staggeredFadeIn(4)} className="rounded-2xl backdrop-blur-card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                  1
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">Could a duplicate even exist?</h3>
                  <p className="mt-1 text-sm text-white/60">
                    In {timePeriod.label.toLowerCase()}, the world would create about{' '}
                    <span className="font-semibold text-white/90">
                      {humanCount(result.nGlobal)}
                    </span>{' '}
                    GUIDs. Out of all possible pairs, what are the odds any two match?
                  </p>
                  <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="text-2xl font-extrabold text-white">
                      {humanOdds(result.pAnyGlobal)}
                    </span>
                    <span className="text-sm text-white/50">
                      chance any two GUIDs on Earth are identical
                    </span>
                  </div>
                  {result.pAnyGlobal.greaterThan(0) && (
                    <p className="mt-2 text-sm italic text-white/40">
                      {oddsAnalogy(result.pAnyGlobal)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Narrowing arrow */}
            <motion.div {...staggeredFadeIn(5)} className="flex justify-center">
              <div className="flex flex-col items-center text-white/30">
                <span className="text-xs">Even less likely</span>
                <ChevronDown className="h-5 w-5" />
              </div>
            </motion.div>

            {/* Layer 2: Would you encounter both? */}
            <motion.div {...staggeredFadeIn(6)} className="rounded-2xl backdrop-blur-card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                  2
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">Would you ever encounter both?</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Of the {humanCount(result.nGlobal)} GUIDs created worldwide, you&apos;d
                    personally see about{' '}
                    <span className="font-semibold text-white/90">
                      {humanCount(result.nYouSee)}
                    </span>
                    . That&apos;s{' '}
                    <span className="font-semibold text-white/90">
                      {result.exposure.mul(100).toNumber() < 0.01
                        ? 'less than 0.01'
                        : result.exposure
                            .mul(100)
                            .toFixed(result.exposure.mul(100).toNumber() < 1 ? 2 : 0)}
                      %
                    </span>{' '}
                    of all GUIDs. For both halves of a duplicate to land on <em>your</em> desk, that
                    tiny fraction gets squared — making it dramatically less likely.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Narrowing arrow */}
            <motion.div {...staggeredFadeIn(7)} className="flex justify-center">
              <div className="flex flex-col items-center text-white/30">
                <span className="text-xs">Even less likely still</span>
                <ChevronDown className="h-5 w-5" />
              </div>
            </motion.div>

            {/* Layer 3: Would you notice? */}
            <motion.div {...staggeredFadeIn(8)} className="rounded-2xl backdrop-blur-card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                  3
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">Would you even notice?</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Even if both duplicates crossed your path, would you actually spot two identical
                    32-character codes? With a{' '}
                    <span className="font-semibold text-white/90">
                      {(recognition * 100).toFixed(0)}%
                    </span>{' '}
                    chance of noticing, your already-tiny odds shrink further.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Final verdict */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-2 rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center"
            >
              <p className="text-sm font-medium uppercase tracking-wider text-accent/80">
                Your final odds
              </p>
              <p className="mt-3 text-3xl font-extrabold md:text-4xl">
                {humanOdds(result.pYouWitness)}
              </p>
              <p className="mx-auto mt-4 max-w-lg text-base text-white/70">
                {oddsAnalogy(result.pYouWitness)}
              </p>
            </motion.div>
          </div>
        )}

        {/* Advanced toggle */}
        {!isCustom && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <Settings className="h-4 w-4" />
              {showAdvanced ? 'Hide' : 'Show'} assumptions
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mx-auto mt-4 max-w-2xl rounded-xl bg-white/5 p-5 text-left text-sm text-white/50">
                    <p className="mb-3 font-medium text-white/70">
                      Assumptions for &ldquo;{persona.label}&rdquo; over{' '}
                      {timePeriod.label.toLowerCase()}:
                    </p>
                    <ul className="space-y-1.5">
                      <li>
                        Worldwide GUID creation:{' '}
                        <span className="text-white/80">
                          {humanCount(parseFlexibleNumber(persona.globalPerDay))} per day
                        </span>
                      </li>
                      <li>
                        Your organization creates:{' '}
                        <span className="text-white/80">
                          {humanCount(parseFlexibleNumber(persona.orgPerDay))} per day
                        </span>
                      </li>
                      <li>
                        You personally see:{' '}
                        <span className="text-white/80">
                          {(persona.visibility * 100).toFixed(0)}%
                        </span>{' '}
                        of your org&apos;s GUIDs
                      </li>
                      <li>
                        Chance you&apos;d spot a duplicate:{' '}
                        <span className="text-white/80">
                          {(persona.recognition * 100).toFixed(0)}%
                        </span>
                      </li>
                    </ul>
                    <p className="mt-3 text-xs text-white/40">
                      Want to adjust these? Select &ldquo;Custom&rdquo; above.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
