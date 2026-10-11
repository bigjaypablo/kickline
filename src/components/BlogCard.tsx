import { Link } from 'react-router-dom'
import type { Post } from '../posts'
import Cover from './Cover'

export const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })

export default function BlogCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      to={`/articles/${post.slug}`}
      className={`group block border border-line bg-panel hover:border-volt transition-colors ${featured ? 'md:grid md:grid-cols-2' : ''}`}
    >
      <Cover post={post} className={featured ? 'aspect-[16/10] md:aspect-auto md:min-h-[320px]' : 'aspect-[16/10]'} />
      <div className="p-4 sm:p-5 flex flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider">
          <span className="bg-volt text-onvolt font-bold px-2 py-0.5">{post.cat}</span>
          <span className="text-mute">{fmtDate(post.date)} · {post.mins} min read</span>
        </div>
        <h3 className={`display font-extrabold leading-[1.05] mt-3 ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-mute leading-relaxed line-clamp-3">{post.excerpt}</p>
        <span className="mt-4 text-sm font-semibold text-volt w-fit transition-transform group-hover:translate-x-1">
          Read article →
        </span>
      </div>
    </Link>
  )
}
