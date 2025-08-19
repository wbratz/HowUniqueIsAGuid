import Decimal, { type Numeric } from 'decimal.js-light'
import { collisionProbability, SPACE_122 } from './math'

export type Point = { x: number; y: number }

// Generate points representing collision probability (%) for n in [0, max]
export function collisionSeries(max: Numeric, steps = 50): Point[] {
  const maxDecimal = new Decimal(max)
  if (maxDecimal.lessThanOrEqualTo(0)) return []
  const pts: Point[] = []
  for (let i = 0; i <= steps; i++) {
    const n = maxDecimal.mul(i).div(steps)
    const p = collisionProbability(n, SPACE_122).mul(100)
    pts.push({ x: n.toNumber(), y: p.toNumber() })
  }
  return pts
}

// Convert points into an SVG path within given width/height
export function linePath(points: Point[], width: number, height: number) {
  if (points.length === 0) return ''
  const maxX = Math.max(...points.map((p) => p.x)) || 1
  const maxY = Math.max(...points.map((p) => p.y)) || 1
  return points
    .map((p, i) => {
      const x = (p.x / maxX) * width
      const y = height - (p.y / maxY) * height
      return `${i === 0 ? 'M' : 'L'}${x} ${y}`
    })
    .join(' ')
}
