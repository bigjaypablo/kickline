import type { Prediction } from '../data'
import { AFFILIATES } from '../banners'
import { tipLabel } from '../lib/tip'

export default function BetButton({ tip }: { tip: Prediction }) {
  const a = AFFILIATES[0]
  if (!a) return null
  return (
    <div>
      <a
        href={a.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="flex items-center justify-between bg-volt text-onvolt px-4 h-11 display font-bold tracking-wide"
      >
        <span>BET {tipLabel(tip.tip).toUpperCase()} @ {tip.odds.toFixed(2)}</span>
        <span>{a.name} →</span>
      </a>
      <p className="text-[10px] text-mute mt-1">18+ only. T&amp;Cs apply. Gamble responsibly.</p>
    </div>
  )
}
