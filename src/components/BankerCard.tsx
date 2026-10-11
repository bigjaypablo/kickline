import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import { tipLabel } from '../lib/tip'
import type { Prediction } from '../data'
import Crest from './Crest'

export default function BankerCard({ banker, title = "Banker of the day" }: { banker: Prediction; title?: string }) {
  return (
    <motion.section
      key={banker.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      id="banker" className="mx-auto max-w-5xl px-4 mt-8"
    >
      <div className="relative border border-line bg-panel overflow-hidden">
        <div className="absolute inset-0 dots opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 h-[3px] w-20 bg-volt" />
        <div className="relative p-5">
          <div className="display text-center text-volt text-xl font-bold tracking-wide">{title}</div>
          <div className="text-center text-[11px] text-mute mt-0.5">{banker.league} · {banker.time}</div>

          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2">
              <Crest name={banker.home} />
              <div className="display font-bold text-lg leading-tight">{banker.home}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-volt text-onvolt grid place-items-center display font-extrabold">VS</div>
            <div className="flex flex-col items-center gap-2">
              <Crest name={banker.away} />
              <div className="display font-bold text-lg leading-tight">{banker.away}</div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-line grid grid-cols-3 gap-2 items-end">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-mute">Our pick</div>
              <div className="display text-3xl font-extrabold text-volt leading-none">{banker.tip}</div>
              <div className="text-[11px] text-mute mt-1">{tipLabel(banker.tip)}</div>
            </div>
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-mute">Odds</div>
              <div className="font-mono tabular-nums text-2xl">{banker.odds.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-mute">Probability</div>
              <div className="font-mono tabular-nums text-2xl text-volt">{banker.prob}%</div>
            </div>
          </div>

          <div className="mt-4 h-1.5 bg-line">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${banker.prob}%` }}
              transition={{ duration: 0.8, ease: EASE }}
              className="h-full bg-volt"
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
