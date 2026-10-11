import { usePageTitle } from '../lib/usePageTitle'
import PageHeader from '../components/PageHeader'
import StatsSection from '../components/StatsSection'

export default function Leagues() {
  usePageTitle('League tables, top scorers and stats | Kickline')
  return (
    <>
      <PageHeader title="Leagues" sub="Full tables, top scorers, goals stats and discipline for the top leagues." />
      <StatsSection />
    </>
  )
}
