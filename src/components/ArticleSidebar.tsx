import { Link } from 'react-router-dom'
import TrendingList from './TrendingList'
import AdSlot from './AdSlot'

export default function ArticleSidebar({ exclude }: { exclude: string }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28 self-start">
      <TrendingList exclude={exclude} />
      <AdSlot placement="sidebar" />
      <div className="border border-line bg-panel p-4">
        <div className="display text-2xl font-bold text-volt leading-tight">Get the tips first</div>
        <p className="text-sm text-mute mt-1">Daily picks straight to Telegram.</p>
        <a href="#" className="mt-3 grid place-items-center h-11 bg-volt text-onvolt display font-bold tracking-wide">
          JOIN TELEGRAM
        </a>
        <Link to="/botd" className="mt-3 block text-center text-sm text-mute hover:text-volt transition-colors">
          See today's bet of the day →
        </Link>
      </div>
    </aside>
  )
}
