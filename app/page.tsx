import PageClient from './page-client'
import { getPublishedGuides, normalizeGuides } from '@/lib/supabase/server'

export default async function Page() {
  const { items, failed } = await getPublishedGuides()
  const guides = normalizeGuides(items)

  return <PageClient guides={guides} guidesFailed={failed} />
}
