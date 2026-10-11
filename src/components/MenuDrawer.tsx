import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MENU } from '../config'
import { EASE } from '../lib/motion'
import Logo from './Logo'

export default function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation()
  const [group, setGroup] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (open) setGroup(MENU.find((m) => m.children?.some((c) => c.to === pathname))?.label ?? null)
  }, [open, pathname])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60"
        />
      )}
      {open && (
        <motion.aside
          key="panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed right-0 top-0 bottom-0 z-50 w-[86%] max-w-sm bg-panel border-l border-line overflow-y-auto flex flex-col"
        >
          <div className="flex items-center justify-between px-5 h-14 border-b border-line shrink-0">
            <Logo />
            <button onClick={onClose} aria-label="Close menu" className="w-9 h-9 grid place-items-center border border-line">✕</button>
          </div>

          <nav className="flex-1">
            {MENU.map((m) =>
              m.children ? (
                <div key={m.label} className="border-b border-line">
                  <button
                    onClick={() => setGroup((g) => (g === m.label ? null : m.label))}
                    className="w-full flex items-center justify-between px-5 py-4 display text-2xl font-bold"
                  >
                    {m.label}
                    <motion.svg animate={{ rotate: group === m.label ? 180 : 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-volt">
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {group === m.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3">
                          {m.children.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              onClick={onClose}
                              className={`block pl-8 pr-5 py-2.5 text-[15px] ${pathname === c.to ? 'text-volt font-semibold' : 'text-bone/80 hover:text-volt'}`}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={m.label}
                  to={m.to!}
                  onClick={onClose}
                  className={`block px-5 py-4 border-b border-line display text-2xl font-bold ${pathname === m.to ? 'text-volt' : ''}`}
                >
                  {m.label}
                </Link>
              )
            )}
          </nav>

          <div className="p-5 shrink-0">
            <a href="#" className="grid place-items-center h-12 bg-volt text-onvolt display font-bold tracking-wide">
              JOIN TELEGRAM
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
