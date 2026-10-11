import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FEATURED, POSTS, pickPosts } from '../posts'
import { usePageTitle } from '../lib/usePageTitle'
import Cover from '../components/Cover'
import PhotoCredit from '../components/PhotoCredit'
import BlogCard, { fmtDate } from '../components/BlogCard'
import ArticleSidebar from '../components/ArticleSidebar'
import AdSlot from '../components/AdSlot'
import NotFound from './NotFound'

export default function Article() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)
  usePageTitle(post ? `${post.title} | Kickline` : 'Article not found | Kickline')
  if (!post) return <NotFound />
  const more = pickPosts(FEATURED).filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-8 grid lg:grid-cols-[1fr_320px] gap-10">
        <article className="min-w-0">
          <Link to="/articles" className="text-sm text-mute hover:text-volt">← All articles</Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider mt-5">
            <span className="bg-volt text-onvolt font-bold px-2 py-0.5">{post.cat}</span>
            <span className="text-mute">{fmtDate(post.date)} · {post.mins} min read</span>
          </div>
          <h1 className="display font-extrabold leading-[1] text-4xl sm:text-5xl mt-3">{post.title}</h1>
          <p className="mt-3 text-lg text-mute">{post.excerpt}</p>
          <Cover post={post} className="aspect-[16/9] mt-6 border border-line" />
          <PhotoCredit slug={post.slug} />
          <div className="mt-8 space-y-4">
            {post.body.map((b, i) => (
              <Fragment key={i}>
                {b.startsWith('## ') ? (
                  <h2 className="display text-3xl font-bold text-volt pt-4">{b.slice(3)}</h2>
                ) : (
                  <p className="text-[17px] leading-relaxed text-bone/90">{b}</p>
                )}
                {i === 1 && <AdSlot placement="infeed" />}
              </Fragment>
            ))}
          </div>
          <p className="mt-8 text-xs text-mute">Tips are guides, not guarantees. 18+ only. Please play responsibly.</p>
        </article>
        <ArticleSidebar exclude={post.slug} />
      </div>

      <section className="mx-auto max-w-5xl px-4 mt-12">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="display text-3xl font-bold">Featured stories</h2>
          <div className="h-px flex-1 bg-line" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {more.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 mt-6">
        <AdSlot placement="footer" />
      </div>
    </>
  )
}
