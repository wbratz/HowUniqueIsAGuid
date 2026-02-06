import { motion } from 'framer-motion'
import { AlertCircle, Eye, Cog } from 'lucide-react'

export default function LayersExplainer() {
  const cards = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: 'Generate',
      text: 'Somewhere in the world, two systems happen to create the same GUID. This is where a duplicate is born.',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Encounter',
      text: 'You or your software actually encounter both of those IDs at some point — in records, reports, or data you work with.',
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: 'Recognize',
      text: 'You or your software notices that two IDs are identical and flags it as a duplicate.',
    },
  ]
  return (
    <section className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Three layers from a duplicate to <em>you</em> noticing
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl backdrop-blur-card p-6"
            >
              <div className="text-accent">{c.icon}</div>
              <p className="mt-2 text-lg font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-white/70">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
