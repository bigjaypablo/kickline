import { Link } from 'react-router-dom'
import { POSTS } from '../posts'
import { SPORTS } from '../config'
import type { Sport } from '../data'
import SectionTitle from './SectionTitle'
import BlogCard from './BlogCard'

export default function BlogSection({ sport }: { sport?: Sport }) {
  const cat = sport ? SPORTS[sport].name : ''
  const ordered = [...POSTS].sort((a, b) => Number(b.cat === cat) - Number(a.cat === cat))
  const [first, ...rest] = ordered
  return (
    <section id="articles" className="mx-auto max-w-5xl px-4 mt-12">
      <SectionTitle>From the blog</SectionTitle>
      <BlogCard post={first} featured />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {rest.slice(0, 3).map((p) => <BlogCard key={p.slug} post={p} />)}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/articles"
          className="inline-grid place-items-center h-11 px-6 border border-line hover:border-volt hover:text-volt display font-bold tracking-wide transition-colors"
        >
          VIEW ALL ARTICLES
        </Link>
      </div>
    </section>
  )
}
