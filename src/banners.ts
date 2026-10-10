export type Placement = 'top' | 'infeed' | 'footer' | 'sticky'

export interface Banner {
  id: string
  placement: Placement
  label: string
  href: string
  image?: string
}
export interface Affiliate {
  name: string
  href: string
}

// MOCK. These will come from the admin panel (banners and affiliates tables).
const BANNERS: Banner[] = [
  { id: 'b1', placement: 'top', label: 'Sample banner · 728×90', href: '#' },
  { id: 'b2', placement: 'sticky', label: 'Sample sticky · 320×50', href: '#' },
]

export const AFFILIATES: Affiliate[] = [{ name: 'Bookmaker A', href: '#' }]

export const getBanner = (p: Placement) => BANNERS.find((b) => b.placement === p)

export const track = (id: string) => {
  // later: insert a click row in Supabase so the owner can show advertisers real numbers
  console.log('banner click', id)
}
