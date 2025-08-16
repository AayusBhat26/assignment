'use client'

import { useState, useEffect } from 'react'
import AuthForm from '@/components/AuthForm'
import ActivityList from '@/components/ActivityList'
import MyBookings from '@/components/MyBookings'

interface User {
  id: string
  email: string
}

interface Activity {
  id: string
  title: string
  description: string
  location: string
  price: number
  available_slots: number
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [view, setView] = useState<'activities' | 'bookings'>('activities')

  useEffect(() => {
    // Check for stored token on component mount
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData: User, userToken: string) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Welcome to Activity Booking
          </h2>
          <AuthForm onLogin={handleLogin} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome, {user.email}!
            </h2>
            <p className="text-gray-600">Manage your activities and bookings</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setView('activities')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === 'activities'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Browse Activities
          </button>
          <button
            onClick={() => setView('bookings')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === 'bookings'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            My Bookings
          </button>
        </div>

        {view === 'activities' ? (
          <ActivityList token={token!} />
        ) : (
          <MyBookings token={token!} />
        )}
      </div>
    </div>
  )
}
