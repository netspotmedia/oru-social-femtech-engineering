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

const contentItemSelect = 'id, slug, title, summary, content_type, read_time, image_url, body, category:content_categories(name)'

export async function getPublishedGuides() {
  let supabase: Awaited<ReturnType<typeof createClient>>
  try {
    supabase = await createClient()
  } catch (error) {
    console.error('[oru] Supabase client init failed:', error instanceof Error ? error.message : error)
    return { items: [], failed: true }
  }
  const { data, error } = await supabase
    .from('content_items')
    .select(contentItemSelect)
    .eq('is_published', true)
    .eq('content_type', 'article')
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(12)

  if (error) {
    console.error('[v0] Published guides query failed:', error.message)
    return { items: [], failed: true }
  }

  return { items: ((data ?? []) as ContentItem[]), failed: false }
}

export async function getPublishedContent(contentType?: ContentItem['content_type']) {
  let supabase: Awaited<ReturnType<typeof createClient>>
  try {
    supabase = await createClient()
  } catch (error) {
    console.error('[oru] Supabase client init failed:', error instanceof Error ? error.message : error)
    return { items: [], failed: true }
  }
  let query = supabase
    .from('content_items')
    .select(contentItemSelect)
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(50)

  if (contentType) query = query.eq('content_type', contentType)

  const { data, error } = await query
  if (error) {
    console.error('[v0] Published content query failed:', error.message)
    return { items: [], failed: true }
  }

  return { items: ((data ?? []) as ContentItem[]), failed: false }
}

export async function getPublishedContentBySlug(slug: string) {
  let supabase: Awaited<ReturnType<typeof createClient>>
  try {
    supabase = await createClient()
  } catch (error) {
    console.error('[oru] Supabase client init failed:', error instanceof Error ? error.message : error)
    return { item: null, failed: true }
  }
  const { data, error } = await supabase
    .from('content_items')
    .select(contentItemSelect)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) {
    console.error('[v0] Content detail query failed:', error.message)
    return { item: null, failed: true }
  }

  return { item: ((data ?? null) as ContentItem | null), failed: false }
}

export function isContentType(value: string | null): value is ContentItem['content_type'] {
  return value === 'article' || value === 'resource' || value === 'expert'
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

// Content authoring convention (must be governed, see docs/current-status.md):
// `body` line 1 = reviewer attribution, line 2 = evidence reference,
// line 3 = image credit URL. Anything outside that format renders as plain
// library text — never as a verified clinical claim.
export function getGuideReviewer(item: ContentItem) {
  return item.body?.split('\n')[0] || 'ORU content library'
}

export function getGuideReference(item: ContentItem) {
  return item.body?.split('\n')[1] || 'Awaiting evidence-reference entry'
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
  reviewer: 'ORU content library',
  ref: 'Awaiting evidence-reference entry',
}

export function normalizeGuides(items: ContentItem[]) {
  return items.length ? items.map(toGuideCard) : [emptyGuideCard]
}

export type { GuideCard as PublishedGuideCard }
