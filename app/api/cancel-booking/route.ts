import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest) {
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

    const userId = user.id
    const searchParams = request.nextUrl.searchParams
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    // First, get the booking to verify ownership and get activity details
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select(`
        *,
        activities (
          id,
          available_slots
        )
      `)
      .eq('id', bookingId)
      .eq('user_id', userId)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found or you do not have permission to cancel it' },
        { status: 404 }
      )
    }

    // Check if the booking is in the past (can't cancel past activities)
    const bookingDate = new Date(booking.booking_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (bookingDate < today) {
      return NextResponse.json(
        { error: 'Cannot cancel past bookings' },
        { status: 400 }
      )
    }

    // Delete the booking
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId)
      .eq('user_id', userId)

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 400 }
      )
    }

    // Increase available slots for the activity
    const { error: updateError } = await supabase
      .from('activities')
      .update({ 
        available_slots: (booking.activities.available_slots || 0) + 1 
      })
      .eq('id', booking.activities.id)

    if (updateError) {
      console.error('Failed to update activity slots after cancellation:', updateError)
      // Don't fail the cancellation if slot update fails
    }

    return NextResponse.json({
      message: 'Booking cancelled successfully',
      bookingId: bookingId
    })

  } catch (error) {
    console.error('Cancel booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
