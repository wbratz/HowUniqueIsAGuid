import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Sparkles } from 'lucide-react'

function uuidv4() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'))
  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-')
}

export default function Generator() {
  const [ids, setIds] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generate = (count = 5) => {
    const next = Array.from({ length: count }, () => uuidv4())
    setIds((prev) => [...next, ...prev].slice(0, 25))
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(ids.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const copyId = async (id: string, index: number) => {
    await navigator.clipboard.writeText(id)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <section id="generator" className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Try it: generate some GUIDs
        </motion.h2>

        <div className="mt-8 backdrop-blur-card rounded-2xl p-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => generate(5)}
              className="inline-flex items-center gap-2 rounded-xl bg-accent/90 px-4 py-3 font-semibold shadow-glow hover:bg-accent"
            >
              <Sparkles className="h-5 w-5" /> Generate 5
            </button>
            <button
              onClick={() => generate(50)}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/15"
            >
              <Sparkles className="h-5 w-5" /> Generate 50
            </button>
            <button
              onClick={copyAll}
              disabled={!ids.length}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/15 disabled:opacity-50"
            >
              <Copy className="h-5 w-5" /> {copied ? 'Copied!' : 'Copy all'}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ids.map((id, i) => (
              <button
                key={i}
                onClick={() => copyId(id, i)}
                className="relative text-left rounded-lg bg-white/5 px-3 py-2 font-mono text-sm hover:bg-white/10"
              >
                {id}
                {copiedIndex === i && (
                  <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 text-xs text-white">
                    Copied!
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-white/60 text-sm">
          These are random version‑4 GUIDs generated with the browser’s cryptographically secure
          RNG.
        </p>
        <p className="mt-2 text-center text-white/60 text-sm">
          Want to use GUIDs in your own code? See the{' '}
          <a href="#code-samples" className="text-accent underline">
            code samples
          </a>
          .
        </p>
      </div>
    </section>
  )
}
