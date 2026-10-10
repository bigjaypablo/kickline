import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

export default function Hero({ count, avg }: { count: number; avg: number }) {
  const stats = [
    { v: String(count), l: 'tips this day', hl: false },
    { v: `${avg}%`, l: 'avg. probability', hl: true },
    { v: 'Free', l: 'no paywall', hl: false },
  ]
  return (
    <section className="force-dark relative overflow-hidden border-b border-line bg-ink">
      <motion.img
        src="/hero.webp"
        alt=""
        fetchPriority="high"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 h-[3px] w-28 bg-volt" />

      <div className="relative mx-auto max-w-5xl px-4 pt-12 pb-14">
        <div className="flex items-center gap-2 text-xs text-bone/80 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-volt opacity-60 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-volt" />
          </span>
          Updated today
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="display font-extrabold leading-[0.9] text-6xl sm:text-9xl"
        >
          Today's<br /><span className="text-volt">football tips</span>
        </motion.h1>

        <p className="mt-5 max-w-md text-bone/80">
          Researched picks with odds and win probability. Every tip is logged, win or lose.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#tips" className="bg-volt text-onvolt display font-bold tracking-wide px-6 h-11 grid place-items-center">
            VIEW TODAY'S TIPS
          </a>
          <a href="#" className="border border-bone/40 hover:border-volt display font-bold tracking-wide px-6 h-11 grid place-items-center transition-colors">
            JOIN TELEGRAM
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 border border-bone/20 divide-x divide-bone/20 bg-black/40 backdrop-blur-sm max-w-md">
          {stats.map((s) => (
            <div key={s.l} className="px-3 py-3">
              <div className={`font-mono tabular-nums text-xl ${s.hl ? 'text-volt' : ''}`}>{s.v}</div>
              <div className="text-[11px] text-bone/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
