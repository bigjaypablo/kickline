import { Link } from 'react-router-dom'
import { TRENDING, pickPosts } from '../posts'
import Cover from './Cover'

export default function TrendingList({ limit = 5, exclude }: { limit?: number; exclude?: string }) {
  const items = pickPosts(TRENDING).filter((p) => p.slug !== exclude).slice(0, limit)
  return (
    <div className="border border-line bg-panel">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <h3 className="display text-xl font-bold">Trending now</h3>
      </div>
      <ol className="divide-y divide-line">
        {items.map((p, i) => (
          <li key={p.slug}>
            <Link to={`/articles/${p.slug}`} className="group flex items-center gap-3 p-3 hover:bg-ink/60 transition-colors">
              <span className="display text-3xl font-extrabold text-volt w-6 text-center">{i + 1}</span>
              <Cover post={p} className="w-16 h-14 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-mute">{p.cat}</div>
                <div className="text-sm font-medium leading-snug line-clamp-2">{p.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
