import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { isActive } from '../lib/paths'

const NAV = [
  { to: '/botd', label: 'BOTD' },
  { to: '/', label: 'Football' },
  { to: '/basketball', label: 'Basketball' },
  { to: '/hockey', label: 'Hockey' },
  { to: '/handball', label: 'Handball' },
  { to: '/articles', label: 'Articles' },
  { to: '/leagues', label: 'Leagues' },
]

interface Props {
  theme: 'dark' | 'light'
  toggle: () => void
}

export default function Header({ theme, toggle }: Props) {
  const { pathname } = useLocation()
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>('[data-active="true"]')
    if (el && bar.current) bar.current.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' })
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 bg-ink/95 backdrop-blur">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 h-14">
        <Link to="/"><Logo /></Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center border border-line hover:border-volt transition-colors overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#" className="bg-volt text-onvolt display font-bold tracking-wide text-xs sm:text-sm px-3 sm:px-4 h-9 grid place-items-center">
            JOIN TELEGRAM
          </a>
        </div>
      </div>

      <nav className="hidden sm:block bg-panel border-y border-line">
        <div ref={bar} className="relative mx-auto max-w-5xl flex overflow-x-auto">
          {NAV.map((n) => {
            const on = isActive(pathname, n.to) || (n.to === '/' && pathname.startsWith('/football'))
            return (
              <Link
                key={n.to}
                to={n.to}
                data-active={on}
                className={`relative shrink-0 px-5 sm:px-6 h-11 grid place-items-center display text-base font-bold tracking-wide transition-colors ${on ? 'text-onvolt' : 'text-bone hover:text-volt'}`}
              >
                {on && (
                  <motion.span
                    layoutId="navpill"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-volt"
                  />
                )}
                <span className="relative">{n.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
