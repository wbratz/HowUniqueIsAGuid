import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

const RESERVED_INDICES = [48, 49, 50, 51, 64, 65]
const ALL_INDICES = Array.from({ length: 128 }, (_, i) => i)
const RANDOM_INDICES = ALL_INDICES.filter((i) => !RESERVED_INDICES.includes(i))

export default function BitGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [hovered, setHovered] = useState(false)
  const [bits, setBits] = useState(() => ALL_INDICES.map((i) => RESERVED_INDICES.includes(i)))

  const active = inView || hovered

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setBits((prev) => {
        const next = [...prev]
        const idx = RANDOM_INDICES[Math.floor(Math.random() * RANDOM_INDICES.length)]!
        next[idx] = !next[idx]
        return next
      })
    }, 200)
    return () => clearInterval(id)
  }, [active])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mx-auto mt-6 grid gap-1"
      style={{ gridTemplateColumns: 'repeat(16, minmax(0,1fr))' }}
    >
      {bits.map((bit, i) => (
        <div
          key={i}
          className={`h-3 w-3 sm:h-4 sm:w-4 rounded-sm transition-colors duration-200 ${
            RESERVED_INDICES.includes(i) ? 'bg-accent' : bit ? 'bg-white' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
}
