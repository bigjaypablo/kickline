import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useActive } from '../lib/useActive'

const ic = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
}
const IDS = ['tips', 'results', 'stats']

const ITEMS: { id: string; label: string; href: string; icon: ReactNode }[] = [
  { id: 'top', label: 'Home', href: '#top', icon: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /> },
  { id: 'tips', label: 'Tips', href: '#tips', icon: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /> },
  { id: 'results', label: 'Results', href: '#results', icon: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.7L16 9.5" /></> },
  { id: 'stats', label: 'Stats', href: '#stats', icon: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /> },
  { id: 'tg', label: 'Telegram', href: '#', icon: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></> },
]

export default function BottomNav() {
  const active = useActive(IDS)
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-30 h-14 bg-panel border-t border-line flex">
      {ITEMS.map((it) => {
        const on = it.id === 'top' ? active === '' : active === it.id
        return (
          <a
            key={it.id}
            href={it.href}
            className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors ${on ? 'text-volt' : 'text-bone/70'}`}
          >
            {on && <motion.span layoutId="botbar" className="absolute top-0 inset-x-4 h-[3px] bg-volt" />}
            <svg {...ic}>{it.icon}</svg>
            {it.label}
          </a>
        )
      })}
    </nav>
  )
}
