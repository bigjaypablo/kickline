const MAP: Record<string, string> = {
  'Free tips': '/football/free-tips',
  'Banker tips': '/football/banker-tips',
  'Over 2.5 goals': '/football/over-2-5-goals',
  BTTS: '/football/btts',
  Basketball: '/basketball',
  'About us': '/about',
  'Contact us': '/contact',
  'Advertise with us': '/advertise',
  Articles: '/articles',
  Leagues: '/leagues',
  Disclaimer: '/disclaimer',
  'Privacy policy': '/privacy',
  'Terms & conditions': '/terms',
  'Cookie policy': '/cookies',
  'Responsible gambling': '/responsible-gambling',
}

export const pathFor = (label: string) => MAP[label] ?? '/'

export const isActive = (pathname: string, to: string) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(to + '/')
