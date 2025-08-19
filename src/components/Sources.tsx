import React from 'react'
import { motion } from 'framer-motion'

export default function Sources() {
  const items = [
    {
      id: 1,
      label: 'University of Hawaii estimate of ~7.5e18 grains of sand on Earth',
      url: 'https://manoa.hawaii.edu/news/article.php?aId=607',
    },
    {
      id: 2,
      label: 'United Nations, world population reached 8 billion in 2022',
      url: 'https://www.un.org/en/desa/world-population-reached-8-billion-2022',
    },
    {
      id: 3,
      label: 'NASA, age of the universe is about 13.8 billion years',
      url: 'https://science.nasa.gov/astrophysics/focus-areas/how-old-is-the-universe/',
    },
  ]

  return (
    <section id="sources" className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Sources & references
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 backdrop-blur-card rounded-2xl p-6"
        >
          <ol className="list-decimal list-inside space-y-2 text-white/80 text-sm">
            {items.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
