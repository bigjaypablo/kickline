import { useState, type ReactNode } from 'react'
import type { Post } from '../posts'

const ART: Record<Post['art'], ReactNode> = {
  football: (
    <>
      <rect x="20" y="20" width="360" height="210" /><line x1="200" y1="20" x2="200" y2="230" />
      <circle cx="200" cy="125" r="38" /><rect x="20" y="75" width="55" height="100" /><rect x="325" y="75" width="55" height="100" />
    </>
  ),
  basketball: (
    <>
      <rect x="20" y="20" width="360" height="210" /><line x1="200" y1="20" x2="200" y2="230" />
      <circle cx="200" cy="125" r="34" /><path d="M20 70h110v110H20M380 70H270v110h110" />
      <circle cx="130" cy="125" r="34" /><circle cx="270" cy="125" r="34" />
    </>
  ),
  hockey: (
    <>
      <rect x="20" y="20" width="360" height="210" rx="70" /><line x1="200" y1="20" x2="200" y2="230" />
      <line x1="135" y1="20" x2="135" y2="230" /><line x1="265" y1="20" x2="265" y2="230" /><circle cx="200" cy="125" r="32" />
    </>
  ),
  handball: (
    <>
      <rect x="20" y="20" width="360" height="210" /><line x1="200" y1="20" x2="200" y2="230" />
      <path d="M20 55a70 70 0 0 1 70 70a70 70 0 0 1-70 70M380 55a70 70 0 0 0-70 70a70 70 0 0 0 70 70" />
    </>
  ),
  guide: (
    <>
      <circle cx="200" cy="125" r="30" /><circle cx="200" cy="125" r="62" /><circle cx="200" cy="125" r="94" />
    </>
  ),
}

export default function Cover({ post, className = '' }: { post: Post; className?: string }) {
  const [broken, setBroken] = useState(!post.image)
  return (
    <div className={`relative overflow-hidden bg-panel ${className}`}>
      {!broken ? (
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          onError={() => setBroken(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="absolute inset-0 dots opacity-60" />
          <svg
            viewBox="0 0 400 250"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="absolute inset-0 w-full h-full text-volt/50"
          >
            {ART[post.art]}
          </svg>
          <div className="absolute bottom-0 left-0 h-[3px] w-16 bg-volt" />
        </>
      )}
    </div>
  )
}
