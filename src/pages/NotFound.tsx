import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found | Kickline')
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 text-center">
      <div className="display font-extrabold text-8xl text-volt">404</div>
      <p className="mt-2 text-mute">That page does not exist or has moved.</p>
      <Link to="/" className="inline-grid place-items-center h-11 px-6 mt-6 bg-volt text-onvolt display font-bold tracking-wide">
        BACK TO HOME
      </Link>
    </section>
  )
}
