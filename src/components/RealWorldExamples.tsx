import { motion } from 'framer-motion'
import { ShoppingCart, Gamepad2, FileText, CreditCard, Database } from 'lucide-react'

const examples = [
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: 'Online orders',
    description: 'Your order confirmation number is often a GUID or similar unique ID',
    example: 'ORD-a4f2c8e1-9b7d-4e3f...',
  },
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: 'Video game saves',
    description: 'Each save file, character, or session gets a unique identifier',
    example: 'save_7f3a2b1c-e5d4-48f9...',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Documents & files',
    description: 'Cloud storage services tag every file with a unique ID',
    example: 'doc_b8c9d0e1-f2a3-4567...',
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: 'Transactions',
    description: 'Every payment, transfer, or transaction has a unique reference',
    example: 'txn_c1d2e3f4-a5b6-7890...',
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: 'Behind the scenes',
    description: 'Databases use GUIDs to track users, sessions, and records',
    example: 'user_d4e5f6a7-b8c9-0123...',
  },
]

export default function RealWorldExamples() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center"
        >
          You've already seen GUIDs everywhere
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-center text-white/60 max-w-2xl mx-auto"
        >
          Even if you didn't know the name, unique IDs are working behind the scenes of almost
          everything digital.
        </motion.p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="backdrop-blur-card rounded-xl p-5 group hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent/20 text-accent shrink-0">{item.icon}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-white/90">{item.title}</p>
                  <p className="mt-1 text-sm text-white/60">{item.description}</p>
                  <p className="mt-2 font-mono text-xs text-white/40 truncate">{item.example}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
