import { motion } from 'framer-motion'

export default function Summary() {
  return (
    <section id="summary" className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Wrap-up & further exploration
        </motion.h2>

        <div className="mt-6 backdrop-blur-card rounded-2xl p-6">
          <ul className="list-disc list-inside space-y-2 text-white/80">
            <li>
              Version-4 GUIDs give you 122 bits of randomness — over 5.32 × 10^36 possibilities.
            </li>
            <li>Even at global scales, the odds of any collision remain astronomically small.</li>
            <li>
              Spotting a duplicate yourself is even rarer, factoring in visibility and recognition.
            </li>
          </ul>

          <p className="mt-4 text-white/70">
            Curious to dig deeper? Tinker with the calculators above, inspect the math, or jump into
            the source to explore more angles on GUID uniqueness.
          </p>
        </div>
      </div>
    </section>
  )
}
