'use client'

import { useState, useEffect } from 'react'

interface Activity {
  id: string
  title: string
  description: string
  location: string
  price: number
  available_slots: number
}

interface Booking {
  id: string
  created_at: string
  booking_date: string
  activities: Activity
}

interface MyBookingsProps {
  token: string
}

export default function MyBookings({ token }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null)

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/my-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch bookings')
      }

      setBookings(data.bookings)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [token])

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return 'Date not available'
    }
    
    const date = new Date(dateString)
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date'
    }
    
    // Format date without time to avoid timezone issues
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return
    }

    setCancelling(bookingId)
    try {
      const response = await fetch(`/api/cancel-booking?id=${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel booking')
      }

      // Remove the cancelled booking from the list
      setBookings(prev => prev.filter(booking => booking.id !== bookingId))
      
      alert('Booking cancelled successfully!')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setCancelling(null)
    }
  }

  const isPastBooking = (bookingDate: string) => {
    if (!bookingDate) return false
    
    const date = new Date(bookingDate)
    if (isNaN(date.getTime())) return false
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return date < today
  }

  if (loading) {
    return <div className="text-center py-8">Loading your bookings...</div>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">My Bookings</h3>

      {error && (
        <div className="text-red-600 text-center">{error}</div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500">You haven't booked any activities yet.</p>
          <p className="text-gray-400 text-sm">Browse activities and make your first booking!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const isPast = isPastBooking(booking.booking_date)
            
            return (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-primary-500">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {booking.activities.title}
                    </h4>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isPast ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {isPast ? 'Completed' : 'Booked'}
                      </span>
                      {isPast && (
                        <span className="text-xs text-gray-500">Past Activity</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {booking.activities.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{booking.activities.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Price:</span>
                      <span className="ml-2">${booking.activities.price}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Booked on:</span>
                      <span className="ml-2">{formatDate(booking.created_at)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Activity Date:</span>
                      <span className="ml-2">
                        {(() => {
                          if (!booking.booking_date) {
                            return 'Date not available'
                          }
                          
                          const date = new Date(booking.booking_date)
                          if (isNaN(date.getTime())) {
                            return 'Invalid date'
                          }
                          
                          return date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        })()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Cancel Button - Only show for future bookings */}
                  {!isPast && (
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancelling === booking.id}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {cancelling === booking.id ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Cancelling...
                          </span>
                        ) : (
                          '❌ Cancel Booking'
                        )}
                      </button>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Booking ID: {booking.id}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
