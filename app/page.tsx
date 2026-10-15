import PageClient from './page-client'
import { getPublishedGuides, normalizeGuides } from '@/lib/supabase/server'

export default async function Page() {
  const guides = normalizeGuides(await getPublishedGuides())

  return <PageClient guides={guides} />
}
