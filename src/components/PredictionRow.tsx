import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Prediction } from '../data'
import { mockForm, mockReason, type Form } from '../extra'
import { EASE, item } from '../lib/motion'
import BetButton from './BetButton'

function Badge({ r, time }: { r: Prediction['result']; time: string }) {
  if (r === 'won') return <span className="text-volt font-semibold">WON</span>
  if (r === 'lost') return <span className="text-red-500 font-semibold">LOST</span>
  return <span className="text-mute">{time}</span>
}

function FormRow({ name, form }: { name: string; form: Form[] }) {
  const cls: Record<Form, string> = {
    W: 'bg-volt text-onvolt',
    D: 'bg-mute text-ink',
    L: 'bg-red-500 text-white',
  }
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="truncate text-sm">{name}</span>
      <div className="flex gap-1">
        {form.map((f, i) => (
          <span key={i} className={`w-5 h-5 grid place-items-center text-[10px] font-bold ${cls[f]}`}>{f}</span>
        ))}
      </div>
    </div>
  )
}

export default function PredictionRow({ r }: { r: Prediction }) {
  const [open, setOpen] = useState(false)
  const hf = useMemo(() => mockForm(r.id + 'h'), [r.id])
  const af = useMemo(() => mockForm(r.id + 'a'), [r.id])
  const hot = r.result === 'pending' && r.prob >= 80

  return (
    <motion.div variants={item}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-ink/60 transition-colors"
      >
        <div className="w-11 font-mono text-xs tabular-nums"><Badge r={r.result} time={r.time} /></div>
        <div className="flex-1 min-w-0 text-sm leading-snug">
          <div className="truncate">
            {r.home}
            {hot && <span className="ml-2 align-middle text-[9px] font-bold bg-red-500 text-white px-1 py-0.5">HOT</span>}
          </div>
          <div className="truncate text-mute">{r.away}</div>
        </div>
        <div className="text-right">
          <div className="inline-block border border-line px-2 py-0.5 text-xs font-medium">{r.tip}</div>
          <div className="font-mono text-xs tabular-nums mt-1">
            <span className="text-volt">{r.odds.toFixed(2)}</span>
            <span className="text-mute"> · {r.prob}%</span>
          </div>
        </div>
        <motion.svg animate={{ rotate: open ? 180 : 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mute shrink-0">
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-4 pt-1 space-y-3">
              <FormRow name={r.home} form={hf} />
              <FormRow name={r.away} form={af} />
              <div>
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-mute mb-1">
                  <span>Win probability</span><span className="font-mono">{r.prob}%</span>
                </div>
                <div className="h-1.5 bg-line">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.prob}%` }} transition={{ duration: 0.6, ease: EASE }} className="h-full bg-volt" />
                </div>
              </div>
              <p className="text-xs text-mute leading-relaxed">{mockReason(r)}</p>
              <BetButton tip={r} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
