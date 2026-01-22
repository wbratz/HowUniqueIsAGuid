import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const samples = {
  javascript: {
    label: 'JavaScript',
    lines: [
      "import { randomUUID } from 'crypto'",
      '',
      'const id = randomUUID()',
      'console.log(id)',
    ],
  },
  python: {
    label: 'Python',
    lines: ['import uuid', '', 'id = uuid.uuid4()', 'print(id)'],
  },
  go: {
    label: 'Go',
    lines: [
      'package main',
      '',
      'import (',
      '  "fmt"',
      '  "github.com/google/uuid"',
      ')',
      '',
      'func main() {',
      '  id := uuid.New()',
      '  fmt.Println(id)',
      '}',
    ],
  },
  csharp: {
    label: 'C#',
    lines: ['using System;', '', 'var id = Guid.NewGuid();', 'Console.WriteLine(id);'],
  },
} as const

type SampleKey = keyof typeof samples

export default function CodeSamples() {
  const [active, setActive] = useState<SampleKey>('javascript')
  const [copied, setCopied] = useState(false)

  const code = samples[active].lines.join('\n')

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="code-samples" className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Generate GUIDs in your code
        </motion.h2>

        <div className="mt-8">
          <div className="flex gap-2">
            {Object.entries(samples).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setActive(key as keyof typeof samples)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold hover:bg-white/15 ${
                  active === key ? 'bg-white/10' : 'bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative mt-4">
            <pre className="rounded-lg bg-white/5 p-4 overflow-x-auto font-mono text-sm">
              <code>{code}</code>
            </pre>
            <button
              onClick={copy}
              className="absolute top-2 right-2 inline-flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
