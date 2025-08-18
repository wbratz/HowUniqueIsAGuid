import { motion } from 'framer-motion'
import Decimal from 'decimal.js-light'
import { useMemo, useState } from 'react'
import { SPACE_122, expectedPairs, probAtLeastOne, witnessProbability, parseFlexibleNumber, prettyInt } from '../lib/math'

function Slider({ label, value, onChange, min=0, max=1, step=0.001, suffix='' }:{label:string; value:number; onChange:(v:number)=>void; min?:number; max?:number; step?:number; suffix?:string}){
  return (
    <div>
      <div className="flex justify-between text-sm text-white/70">
        <span>{label}</span>
        <span className="text-white/90 font-medium">{(value*100).toFixed(2)}%</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(parseFloat(e.target.value))} className="w-full" />
      {suffix && <div className="text-xs text-white/60 mt-1">{suffix}</div>}
    </div>
  )
}

export default function WitnessCalculator(){
  const [rateWorld, setRateWorld] = useState('1e12') // GUIDs/day globally
  const [rateYou, setRateYou]   = useState('1e7')   // GUIDs/day your org
  const [days, setDays] = useState('3650') // 10 years
  const [visibility, setVisibility] = useState(0.2)
  const [recognition, setRecognition] = useState(0.8)

  const result = useMemo(()=>{
    try{
      const Rw = parseFlexibleNumber(rateWorld)
      const Ry = parseFlexibleNumber(rateYou)
      const D  = parseFlexibleNumber(days)
      if ([Rw,Ry,D].some(x=>!x.isFinite() || x.isNegative())) throw new Error('bad')
      const nGlobal = Rw.mul(D)
      const nYouSee = Ry.mul(visibility).mul(D)
      const exposure = nYouSee.div(nGlobal).toNumber()
      const lambda = expectedPairs(nGlobal, SPACE_122)
      const pAnyGlobal = probAtLeastOne(lambda).mul(100)
      const pYouWitness = witnessProbability(nGlobal, exposure, recognition, SPACE_122).mul(100)

      return {
        nGlobal, lambda,
        pAnyGlobalText: pAnyGlobal.lessThan(1e-6) ? pAnyGlobal.toExponential(2)+'%' : pAnyGlobal.toFixed(6)+'%',
        pYouText: pYouWitness.lessThan(1e-6) ? pYouWitness.toExponential(2)+'%' : pYouWitness.toFixed(6)+'%',
      }
    }catch{
      return null
    }
  },[rateWorld, rateYou, days, visibility, recognition])

  const fmt = (x: Decimal) => x.greaterThan('1e6') ? x.toExponential(2) : x.toFixed(0)

  return (
    <section id="witness" className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Your odds of actually <em>witnessing</em> a collision
        </motion.h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          There are three layers: (1) a collision exists somewhere, (2) <span className="font-semibold">you</span> touch both IDs, and (3) you <span className="font-semibold">notice</span> it. This model combines all three.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 backdrop-blur-card rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Global GUIDs per day</label>
                <input value={rateWorld} onChange={e=>setRateWorld(e.target.value)} placeholder="e.g., 1e12, 1,000,000,000,000" className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-accent/50"/>
              </div>
              <div>
                <label className="text-sm text-white/70">Your org’s GUIDs per day</label>
                <input value={rateYou} onChange={e=>setRateYou(e.target.value)} placeholder="e.g., 1e7, 10,000,000" className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-accent/50"/>
              </div>
              <div>
                <label className="text-sm text-white/70">Time horizon (days)</label>
                <input value={days} onChange={e=>setDays(e.target.value)} placeholder="e.g., 3650" className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-accent/50"/>
              </div>
              <div className="space-y-4">
                <Slider label="What fraction do you actually see?" value={visibility} onChange={setVisibility} suffix="Logs, traces, or IDs you personally inspect vs. what your org generates." />
                <Slider label="If both pass through you, chance you recognize it" value={recognition} onChange={setRecognition} suffix="Recognition depends on alerting, dedup checks, humans noticing, etc." />
              </div>
            </div>
          </div>

          <div className="backdrop-blur-card rounded-2xl p-6">
            {result ? (
              <>
                <p className="text-sm text-white/70">Global draws in window</p>
                <p className="text-lg font-semibold">{prettyInt(result.nGlobal)} GUIDs</p>
                <p className="mt-2 text-sm text-white/70">Expected global collisions (λ)</p>
                <p className="text-lg font-semibold">{fmt(result.lambda)}</p>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-sm text-white/70">Chance any duplicate exists (global)</p>
                  <p className="text-2xl font-extrabold">{result.pAnyGlobalText}</p>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-sm text-white/70">Chance <span className="font-semibold">you</span> witness & recognize ≥1</p>
                  <p className="text-2xl font-extrabold">{result.pYouText}</p>
                </div>
              </>
            ) : (
              <p>Enter valid numbers above.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
