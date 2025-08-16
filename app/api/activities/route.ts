import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for pagination and filtering
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const price = searchParams.get('price') || ''
    const sort = searchParams.get('sort') || 'title'
    
    let query = supabase
      .from('activities')
      .select('*')
      .gte('available_slots', 1) 
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }
    if (location) {
      query = query.ilike('location', `%${location}%`)
    }
    if (price && price !== 'all') {
      switch (price) {
        case '0-25':
          query = query.lte('price', 25)
          break
        case '25-50':
          query = query.gte('price', 25).lte('price', 50)
          break
        case '50-100':
          query = query.gte('price', 50).lte('price', 100)
          break
        case '100+':
          query = query.gte('price', 100)
          break
      }
    }
    switch (sort) {
      case 'price_low':
        query = query.order('price', { ascending: true })
        break
      case 'price_high':
        query = query.order('price', { ascending: false })
        break
      case 'location':
        query = query.order('location', { ascending: true })
        break
      case 'title':
      default:
        query = query.order('title', { ascending: true })
        break
    }

    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    const { data: activities, error, count } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      activities,
      pagination: {
        page,
        limit,
        total: count || activities.length,
        hasMore: activities.length === limit
      }
    })
  } catch (error) {
    console.error('Get activities error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
