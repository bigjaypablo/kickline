import { useState } from 'react'
import { POSTS } from '../posts'
import { usePageTitle } from '../lib/usePageTitle'
import PageHeader from '../components/PageHeader'
import BlogCard from '../components/BlogCard'
import TopStories from '../components/TopStories'
import AdSlot from '../components/AdSlot'

const CATS = ['All', 'Football', 'Basketball', 'Hockey', 'Handball', 'Guides']

export default function Articles() {
  usePageTitle('Articles and betting guides | Kickline')
  const [cat, setCat] = useState('All')
  const items = POSTS.filter((p) => cat === 'All' || p.cat === cat)

  return (
    <>
      <PageHeader title="Articles" sub="Guides, explainers and analysis to help you read the games." />
      <main className="mx-auto max-w-5xl px-4 py-6">
        {cat === 'All' && <TopStories />}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 text-sm px-3 py-1 border transition-colors ${c === cat ? 'bg-volt text-onvolt border-volt font-medium' : 'border-line text-mute hover:text-bone'}`}
            >
              {c}
            </button>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="text-mute text-sm py-12 text-center">No articles here yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        )}
        <AdSlot placement="footer" />
      </main>
    </>
  )
}
