import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    // Verify the token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { activityId, bookingDate } = await request.json()
    const userId = user.id

    if (!activityId) {
      return NextResponse.json(
        { error: 'Activity ID is required' },
        { status: 400 }
      )
    }

    // Validate booking date
    if (!bookingDate) {
      return NextResponse.json(
        { error: 'Booking date is required' },
        { status: 400 }
      )
    }

    // Check if booking date is in the future
    const selectedDate = new Date(bookingDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'Booking date must be in the future' },
        { status: 400 }
      )
    }

    // Check if activity exists and has available slots
    const { data: activity, error: activityError } = await supabase
      .from('activities')
      .select('*')
      .eq('id', activityId)
      .single()

    if (activityError || !activity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      )
    }

    if (activity.available_slots <= 0) {
      return NextResponse.json(
        { error: 'No available slots for this activity' },
        { status: 400 }
      )
    }

    // Check if user already has a booking for this activity on the same date
    const { data: existingBooking, error: checkError } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .eq('activity_id', activityId)
      .eq('booking_date', bookingDate)
      .single()

    if (existingBooking) {
      return NextResponse.json(
        { error: 'You already have a booking for this activity on this date' },
        { status: 400 }
      )
    }

    // Create the booking with date
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: userId,
          activity_id: activityId,
          booking_date: bookingDate,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()

    if (bookingError) {
      return NextResponse.json(
        { error: bookingError.message },
        { status: 400 }
      )
    }

    // Update available slots
    const { error: updateError } = await supabase
      .from('activities')
      .update({ available_slots: activity.available_slots - 1 })
      .eq('id', activityId)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update activity slots' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Booking created successfully',
      booking: {
        ...booking[0],
        activity: activity
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Book activity error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
