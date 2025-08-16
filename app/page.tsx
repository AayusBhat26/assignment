'use client'

import { useState, useEffect } from 'react'
import AuthForm from '@/components/AuthForm'
import ActivityList from '@/components/ActivityList'
import MyBookings from '@/components/MyBookings'

export default function Home() {
  const [token, setToken] = useState<string | null>(null)
  const [view, setView] = useState<'activities' | 'bookings'>('activities')

  useEffect(() => {
    // Check for stored token on component mount
    const storedToken = localStorage.getItem('token')
    
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const handleAuth = (userToken: string) => {
    setToken(userToken)
    localStorage.setItem('token', userToken)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  if (!token) {
    return <AuthForm onAuth={handleAuth} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🎯 Activity Booking API
              </h1>
              <p className="text-gray-600 text-lg">
                Discover and book amazing activities
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg className="h-5 w-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setView('activities')}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                view === 'activities'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <svg className="h-5 w-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse Activities
            </button>
            <button
              onClick={() => setView('bookings')}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                view === 'bookings'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <svg className="h-5 w-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              My Bookings
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          {view === 'activities' ? (
            <ActivityList token={token} />
          ) : (
            <MyBookings token={token} />
          )}
        </div>
      </div>
    </div>
  )
}
