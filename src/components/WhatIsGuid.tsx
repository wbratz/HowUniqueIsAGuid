import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Fingerprint } from 'lucide-react'

function generateExampleGuid(): string {
  const hex = '0123456789abcdef'
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return pattern.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return hex[v] ?? '0'
  })
}

export default function WhatIsGuid() {
  const [exampleGuid, setExampleGuid] = useState(generateExampleGuid())

  useEffect(() => {
    const interval = setInterval(() => {
      setExampleGuid(generateExampleGuid())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-card rounded-2xl p-8 max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-accent/20">
              <Fingerprint className="h-8 w-8 text-accent" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold">
            A GUID is like a <span className="text-accent">digital fingerprint</span>
          </h2>

          <p className="mt-4 text-white/70 text-lg">
            Every time you buy something online, stream a video, or save a game — a unique ID is
            created to track that exact moment. GUIDs (Globally Unique Identifiers) are 32-character
            codes designed so that{' '}
            <span className="font-semibold text-white/90">no two should ever match</span>, anywhere
            in the world, ever.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-2">Example GUID (changes every 3 seconds)</p>
            <motion.p
              key={exampleGuid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-lg md:text-xl text-accent break-all"
            >
              {exampleGuid}
            </motion.p>
          </div>

          <p className="mt-6 text-sm text-white/50">
            That's it — just a really, really unique ID. Now let's explore <em>how</em> unique...
          </p>
        </motion.div>
      </div>
    </section>
  )
}
