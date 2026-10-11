import { useEffect, useState } from 'react'
import { getPredictions, day, type Prediction } from '../data'
import { usePageTitle } from '../lib/usePageTitle'
import PageHeader from '../components/PageHeader'
import BankerCard from '../components/BankerCard'
import AdSlot from '../components/AdSlot'

export default function Botd() {
  usePageTitle('Bet of the day | Kickline')
  const [best, setBest] = useState<Prediction | null>(null)

  useEffect(() => {
    getPredictions(day(0)).then((d) => setBest([...d].sort((a, b) => b.prob - a.prob)[0] ?? null))
  }, [])

  return (
    <>
      <PageHeader title="Bet of the day" sub="Our single most confident pick across every sport, updated daily." />
      {best ? (
        <BankerCard banker={best} title="Bet of the day" />
      ) : (
        <p className="text-mute text-sm py-16 text-center">No pick yet today. Check back soon.</p>
      )}
      <div className="mx-auto max-w-5xl px-4 mt-6">
        <AdSlot placement="top" />
      </div>
      <p className="mx-auto max-w-5xl px-4 text-sm text-mute">
        Even our best pick can lose. Tips are guides, not guarantees. 18+ only. Please play responsibly.
      </p>
    </>
  )
}
