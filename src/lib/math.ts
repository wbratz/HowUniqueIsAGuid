import Decimal from 'decimal.js-light'

export type Num = Decimal | number | string

export const TWO = new Decimal(2)
export const BITS_TOTAL = new Decimal(128)
export const BITS_RANDOM_V4 = new Decimal(122) // 6 bits fixed by version + variant
export const SPACE_128 = TWO.pow(BITS_TOTAL) // 2^128
export const SPACE_122 = TWO.pow(BITS_RANDOM_V4) // 2^122 (v4 random space)

export const formatBig = (d: Decimal, dp = 2) => {
  const abs = d.abs()
  if ((abs.greaterThan('1e6') || abs.lessThan('1e-3')) && !abs.isZero()) {
    return d.toExponential(dp)
  }
  return d.toFixed(dp)
}

export const prettyInt = (d: Decimal) => {
  const s = d.toFixed(0)
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/** Birthday paradox approximation: p ≈ 1 − exp( − n(n−1) / (2·space) ) */
export function collisionProbability(n: Num, space: Num = SPACE_122) {
  const N = new Decimal(n)
  if (N.lessThanOrEqualTo(1)) return new Decimal(0)
  const S = new Decimal(space)
  const frac = N.mul(N.minus(1)).div(S.mul(2))
  if (frac.greaterThan(50)) return new Decimal(1) // avoid underflow
  return new Decimal(1).minus(new Decimal(Math.exp(-frac.toNumber())))
}

export function yearsToExhaust(ratePerSecond: Num, space: Num = SPACE_122) {
  const seconds = new Decimal(space).div(ratePerSecond)
  return seconds.div(60).div(60).div(24).div(365)
}

export const estimates = {
  grainsOfSand: new Decimal('7.5e18'), // ~7.5e18 grains on Earth — University of Hawaii estimate: https://manoa.hawaii.edu/news/article.php?aId=607
  people: new Decimal('8e9'), // ~8 billion people — UN 2022 world population prospects: https://www.un.org/en/desa/world-population-reached-8-billion-2022
  ageUniverseYears: new Decimal('1.38e10'), // Age of universe ≈13.8 billion years — NASA: https://science.nasa.gov/astrophysics/focus-areas/how-old-is-the-universe/
}

/** Break d into mantissa×10^exp with 2 sig figs mantissa */
export function scientificParts(d: Decimal) {
  const s = d.toExponential(2) // "3.40e+38"
  const m = s.match(/^(\d+(?:\.\d+)?)e([+-]?\d+)$/)
  if (!m) return { coeff: d.toString(), exp: 0 }
  const coeffStr = m[1] as string
  const expStr = m[2] as string
  return { coeff: coeffStr, exp: parseInt(expStr, 10) }
}

const SCALE_NAMES_MAP: Record<number, string> = {
  3: 'thousand',
  6: 'million',
  9: 'billion',
  12: 'trillion',
  15: 'quadrillion',
  18: 'quintillion',
  21: 'sextillion',
  24: 'septillion',
  27: 'octillion',
  30: 'nonillion',
  33: 'decillion',
  36: 'undecillion',
  39: 'duodecillion',
  42: 'tredecillion',
  45: 'quattuordecillion',
  48: 'quindecillion',
  51: 'sexdecillion',
  54: 'septendecillion',
  57: 'octodecillion',
  60: 'novemdecillion',
  63: 'vigintillion',
}

export function speakable(d: Decimal) {
  const { coeff, exp } = scientificParts(d)
  const name = SCALE_NAMES_MAP[exp]
  const rounded = new Decimal(coeff).toFixed(2)
  if (name) return `about ${rounded} ${name}`
  return `about ${rounded} × 10^${exp} (${rounded} with ${exp} zeros)`
}

export function zerosLine(d: Decimal) {
  const { coeff, exp } = scientificParts(d)
  return `That’s a ${coeff} with ${exp} more zeros.`
}

export function speakableWithName(d: Decimal) {
  if (d.isZero()) return 'zero'
  const s = d.toExponential(2)
  const m = s.match(/^(\d+(?:\.\d+)?)e([+-]?\d+)$/)
  if (!m) return d.toString()
  const coeff = new Decimal(m[1] as string)
  const exp = parseInt(m[2] as string, 10)
  const group = Math.floor(exp / 3) * 3
  const name = SCALE_NAMES_MAP[group]
  const scaled = coeff.mul(new Decimal(10).pow(exp - group))
  if (name) {
    // roll up "1000 million" → "1 billion" when possible
    if (scaled.greaterThanOrEqualTo(1000)) {
      const nextName = SCALE_NAMES_MAP[group + 3]
      if (nextName) {
        const rolled = scaled.div(1000)
        return `about ${rolled.toFixed(0)} ${nextName}`
      }
    }
    const val = scaled.greaterThanOrEqualTo(100) ? scaled.toFixed(0) : scaled.toFixed(2)
    return `about ${val} ${name}`
  }
  return `about ${coeff.toFixed(2)} × 10^${exp} (no standard short-scale name)`
}

export function parseFlexibleNumber(s: string) {
  const clean = s.replace(/[,_\s]/g, '')
  return new Decimal(clean)
}

export function expectedPairs(n: Num, space: Num = SPACE_122) {
  const N = new Decimal(n)
  if (N.lessThanOrEqualTo(1)) return new Decimal(0)
  const S = new Decimal(space)
  return N.mul(N.minus(1)).div(S.mul(2))
}

export function probAtLeastOne(lambda: Num) {
  const L = new Decimal(lambda)
  if (L.greaterThan(50)) return new Decimal(1)
  // For very small lambda, Math.exp(-L) rounds to 1.0 in float64,
  // losing precision. Use the approximation P ≈ lambda (valid when lambda << 1).
  if (L.lessThan('1e-15')) return L
  return new Decimal(1).minus(new Decimal(Math.exp(-L.toNumber())))
}

/** Probability YOU witness ≥1 collision given exposure fraction e and recognition d */
export function witnessProbability(
  n: Num,
  exposureFraction: Num,
  recognition: Num,
  space: Num = SPACE_122,
) {
  const lambda = expectedPairs(n, space)
  const e = new Decimal(exposureFraction)
  const d = new Decimal(recognition)
  const lambdaSeen = lambda.mul(e.mul(e)).mul(d)
  return probAtLeastOne(lambdaSeen)
}

/** Format a probability as human-readable "1 in X" odds, no scientific notation */
export function humanOdds(p: Decimal): string {
  if (p.isZero()) return 'essentially zero'
  if (p.greaterThanOrEqualTo(1)) return '~100%'
  const oneIn = new Decimal(1).div(p)
  if (oneIn.lessThan(1000)) return `1 in ${oneIn.toFixed(0)}`
  // Build a human-readable "1 in X [scale-word]" string
  const { exp } = scientificParts(oneIn)
  const group = Math.floor(exp / 3) * 3
  const name = SCALE_NAMES_MAP[group]
  const scaled = oneIn.div(new Decimal(10).pow(group))
  if (name) {
    // Roll up e.g. "1,200 million" → "1.2 billion"
    if (scaled.greaterThanOrEqualTo(1000)) {
      const nextName = SCALE_NAMES_MAP[group + 3]
      if (nextName) return `1 in ${scaled.div(1000).toFixed(1)} ${nextName}`
    }
    const val = scaled.greaterThanOrEqualTo(100) ? scaled.toFixed(0) : scaled.toFixed(1)
    return `1 in ${val} ${name}`
  }
  // Fallback for very large exponents: use friendly phrasing
  return `1 in a number with ${exp + 1} digits`
}

/** Pick a relatable analogy based on how unlikely an event is (probability as Decimal) */
export function oddsAnalogy(p: Decimal): string {
  if (p.isZero()) return 'So unlikely that no analogy can capture it.'
  const oneIn = new Decimal(1).div(p)
  // Use scientificParts to get exponent safely (avoids Infinity from toNumber())
  const { exp } = scientificParts(oneIn)

  // Ordered from "merely unlikely" to "cosmically impossible"
  // Each analogy is fact-checked:
  if (exp < 8) return 'Like guessing a specific person out of everyone alive on Earth.'
  if (exp < 12)
    // Powerball odds: 1 in 292 million ≈ 10^8.5
    return 'Like winning the Powerball jackpot — except less likely.'
  if (exp < 16)
    // Back-to-back Powerball: (1/292M)^2 ≈ 10^-17, but 10^12-16 range
    return 'Like winning a major lottery jackpot twice in a row.'
  if (exp < 19)
    // Grains of sand on Earth: ~7.5×10^18
    return 'Like blindly picking one specific grain of sand from every beach, desert, and ocean floor on Earth.'
  if (exp < 23)
    // 10^22 stars in the observable universe
    return 'Like picking one specific star out of every star in the observable universe — and getting it right on the first try.'
  if (exp < 28)
    // Atoms in a human body: ~7×10^27
    return 'Like tagging one specific atom in your body, shuffling all of them, and randomly picking that exact atom back out.'
  if (exp < 35)
    // Winning Powerball 4× in a row: (1/292M)^4 ≈ 10^-34
    return 'Like winning the Powerball jackpot four times in a row — every ticket a winner.'
  if (exp < 45)
    // Atoms on Earth: ~10^50, but this range is 10^35-45
    return 'Like numbering every grain of sand on a billion Earths and randomly picking the same one twice.'
  // 10^45+
  return 'For all practical purposes: impossible. Not in your lifetime, not in a million lifetimes, not before the stars burn out.'
}

/** Format a number with commas for readability: 1000000 → "1,000,000" */
export function commaNumber(d: Decimal): string {
  const s = d.toFixed(0)
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/** Format a large count in human-friendly words: 3.65e13 → "36.5 trillion" */
export function humanCount(d: Decimal): string {
  if (d.lessThan(1000)) return d.toFixed(0)
  const { exp } = scientificParts(d)
  const group = Math.floor(exp / 3) * 3
  const name = SCALE_NAMES_MAP[group]
  const scaled = d.div(new Decimal(10).pow(group))
  if (name) {
    if (scaled.greaterThanOrEqualTo(1000)) {
      const nextName = SCALE_NAMES_MAP[group + 3]
      if (nextName) return `${scaled.div(1000).toFixed(1)} ${nextName}`
    }
    const val = scaled.greaterThanOrEqualTo(100) ? scaled.toFixed(0) : scaled.toFixed(1)
    return `${val} ${name}`
  }
  return commaNumber(d)
}
