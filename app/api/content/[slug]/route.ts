import { NextResponse } from 'next/server'
import { getPublishedContentBySlug } from '@/lib/supabase/server'

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params
  const { item, failed } = await getPublishedContentBySlug(slug)

  if (failed) {
    return NextResponse.json({ error: 'Content service unavailable.' }, { status: 503 })
  }

  if (!item) {
    return NextResponse.json({ error: 'Content not found.' }, { status: 404 })
  }

  return NextResponse.json(
    { item },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  )
}
