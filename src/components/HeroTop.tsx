import { motion } from 'framer-motion'
import BitGrid from './BitGrid'

export default function HeroTop() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            How <span className="text-accent">unique</span> is a GUID?
          </h1>
          <BitGrid />
        </motion.div>
      </div>
    </section>
  )
}
