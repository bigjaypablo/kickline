import { FEATURED, pickPosts } from '../posts'
import BlogCard from './BlogCard'
import TrendingList from './TrendingList'

export default function TopStories() {
  const [lead] = pickPosts(FEATURED)
  if (!lead) return null
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="display text-3xl font-bold">Top stories</h2>
        <div className="h-px flex-1 bg-line" />
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <BlogCard post={lead} />
        <TrendingList limit={4} />
      </div>
    </section>
  )
}
