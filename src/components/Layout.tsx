import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../theme'
import Header from './Header'
import Footer from './Footer'
import StickyBar from './StickyBar'
import BottomNav from './BottomNav'
import MenuDrawer from './MenuDrawer'

export default function Layout() {
  const { theme, toggle } = useTheme()
  const [menu, setMenu] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    setMenu(false)
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div id="top" className="min-h-screen pb-32 sm:pb-0">
      <Header theme={theme} toggle={toggle} />
      <Outlet />
      <Footer />
      <StickyBar />
      <BottomNav onMenu={() => setMenu(true)} />
      <MenuDrawer open={menu} onClose={() => setMenu(false)} />
    </div>
  )
}
