import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Server Components cannot always write cookies; proxy refreshes sessions.
          }
        },
      },
    },
  )
}

export type ContentItem = {
  id: string
  slug: string
  title: string
  summary: string
  content_type: 'article' | 'resource' | 'expert'
  read_time: string | null
  image_url: string | null
  body: string | null
  category: { name: string } | { name: string }[] | null
}

export async function getPublishedGuides() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('content_items')
    .select('id, slug, title, summary, content_type, read_time, image_url, body, category:content_categories(name)')
    .eq('is_published', true)
    .eq('content_type', 'article')
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(12)

  if (error) {
    console.error('[v0] Published guides query failed:', error.message)
    return []
  }

  return (data ?? []) as ContentItem[]
}

export function getCategoryName(category: ContentItem['category']) {
  return Array.isArray(category) ? category[0]?.name ?? 'Clinical guide' : category?.name ?? 'Clinical guide'
}

export function getGuideImage(item: ContentItem) {
  return item.image_url || '/guides/guide-endometriosis.jpg'
}

export function getGuideTime(item: ContentItem) {
  return item.read_time || 'Clinical guide'
}

export function getGuideReviewer(item: ContentItem) {
  return item.body?.split('\n')[0] || 'Reviewed by the ORU clinical editorial team'
}

export function getGuideReference(item: ContentItem) {
  return item.body?.split('\n')[1] || 'ORU clinical evidence standard'
}

export function getGuideCreditUrl(item: ContentItem) {
  return item.body?.split('\n')[2] || 'https://oru.social'
}

export function toGuideCard(item: ContentItem) {
  return {
    category: getCategoryName(item.category),
    time: getGuideTime(item),
    image: getGuideImage(item),
    imageAlt: item.title,
    creditUrl: getGuideCreditUrl(item),
    title: item.title,
    summary: item.summary,
    reviewer: getGuideReviewer(item),
    ref: getGuideReference(item),
  }
}

export type GuideCard = ReturnType<typeof toGuideCard>

export const emptyGuideCard: GuideCard = {
  category: 'Clinical guide',
  time: 'Coming soon',
  image: '/guides/guide-endometriosis.jpg',
  imageAlt: 'ORU clinical guide',
  creditUrl: 'https://oru.social',
  title: 'New clinical guides are being reviewed',
  summary: 'The ORU editorial team is preparing the next evidence-based resources for the library.',
  reviewer: 'ORU clinical editorial team',
  ref: 'ORU evidence standard',
}

export function normalizeGuides(items: ContentItem[]) {
  return items.length ? items.map(toGuideCard) : [emptyGuideCard]
}

export type { GuideCard as PublishedGuideCard }
