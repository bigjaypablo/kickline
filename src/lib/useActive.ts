import { useEffect, useState } from 'react'

export function useActive(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160
      let cur = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}
