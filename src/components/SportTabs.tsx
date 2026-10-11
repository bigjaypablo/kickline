import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isActive } from '../lib/paths'

const SPORTS = [
  { to: '/', label: 'Football', football: true },
  { to: '/basketball', label: 'Basketball' },
  { to: '/hockey', label: 'Hockey' },
  { to: '/handball', label: 'Handball' },
]

export default function SportTabs() {
  const { pathname } = useLocation()
  return (
    <div className="sm:hidden sticky top-14 z-10 flex bg-ink/95 backdrop-blur border-b border-line">
      {SPORTS.map((s) => {
        const on = s.football ? pathname === '/' || pathname.startsWith('/football') : isActive(pathname, s.to)
        return (
          <Link
            key={s.to}
            to={s.to}
            className={`relative flex-1 text-center py-3 display text-[17px] font-bold tracking-wide transition-colors ${on ? 'text-volt' : 'text-bone/70'}`}
          >
            {s.label}
            {on && <motion.span layoutId="sporttab" className="absolute -bottom-px inset-x-2 h-[3px] bg-volt" />}
          </Link>
        )
      })}
    </div>
  )
}
