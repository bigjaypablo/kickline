import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isActive } from '../lib/paths'

const ic = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
}
const cell = 'relative flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors'

const ITEMS: { to: string; label: string; icon: ReactNode }[] = [
  { to: '/', label: 'Home', icon: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /> },
  { to: '/botd', label: 'BOTD', icon: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" /> },
  { to: '/articles', label: 'Articles', icon: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></> },
  { to: '/leagues', label: 'Leagues', icon: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /> },
]

export default function BottomNav({ onMenu }: { onMenu: () => void }) {
  const { pathname } = useLocation()
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-30 h-14 bg-panel border-t border-line flex">
      {ITEMS.map((it) => {
        const on = it.to === '/' ? ['/', '/basketball', '/hockey', '/handball'].includes(pathname) || pathname.startsWith('/football') : isActive(pathname, it.to)
        return (
          <Link key={it.to} to={it.to} className={`${cell} ${on ? 'text-volt' : 'text-bone/70'}`}>
            {on && <motion.span layoutId="botbar" className="absolute top-0 inset-x-4 h-[3px] bg-volt" />}
            <svg {...ic}>{it.icon}</svg>
            {it.label}
          </Link>
        )
      })}
      <button onClick={onMenu} className={`${cell} text-bone/70`}>
        <svg {...ic}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        Menu
      </button>
    </nav>
  )
}
