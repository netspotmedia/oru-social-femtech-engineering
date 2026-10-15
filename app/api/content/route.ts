import { NextRequest, NextResponse } from 'next/server'
import { getPublishedContent, isContentType } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type')
  if (type && !isContentType(type)) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 400 })
  }

  const { items, failed } = await getPublishedContent(type && isContentType(type) ? type : undefined)
  if (failed) {
    return NextResponse.json({ error: 'Content service unavailable.' }, { status: 503 })
  }
  return NextResponse.json({ items }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } })
}
