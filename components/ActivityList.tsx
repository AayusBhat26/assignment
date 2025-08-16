'use client'

import { useState, useEffect } from 'react'
import DatePicker from './DatePicker'

interface Activity {
  id: string
  title: string
  description: string
  location: string
  price: number
  available_slots: number
}

interface ActivityListProps {
  token: string
}

export default function ActivityList({ token }: ActivityListProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('title')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)

  const fetchActivities = async (page: number = 1, search: string = '', location: string = '', price: string = '', sort: string = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(search && { search }),
        ...(location && { location }),
        ...(price && price !== 'all' && { price }),
        ...(sort && { sort })
      })

      const response = await fetch(`/api/activities?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch activities')
      }

      if (page === 1) {
        setActivities(data.activities)
      } else {
        setActivities(prev => [...prev, ...data.activities])
      }

      setHasMore(data.pagination.hasMore)
      setCurrentPage(page)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchActivities(1, searchTerm, locationFilter, priceRange, sortBy)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setLocationFilter('')
    setPriceRange('all')
    setSortBy('title')
    setCurrentPage(1)
    fetchActivities(1, '', '', 'all', 'title')
  }

  const handleBookClick = (activityId: string) => {
    setSelectedActivityId(activityId)
    setShowDatePicker(true)
  }

  const handleDateSelect = async (bookingDate: string) => {
    if (!selectedActivityId) return

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          activityId: selectedActivityId,
          bookingDate 
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book activity')
      }

      // Refresh activities to update available slots
      fetchActivities(currentPage, searchTerm, locationFilter, priceRange, sortBy)
      
      alert(`Activity booked successfully for ${new Date(bookingDate).toLocaleDateString()}!`)
      
      // Close date picker
      setShowDatePicker(false)
      setSelectedActivityId(null)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDatePickerCancel = () => {
    setShowDatePicker(false)
    setSelectedActivityId(null)
  }

  const loadMore = () => {
    if (hasMore) {
      fetchActivities(currentPage + 1, searchTerm, locationFilter, priceRange, sortBy)
    }
  }

  if (loading && activities.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="mt-2 text-gray-600">Loading activities...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter Activities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Prices</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100+">$100+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="title">Title A-Z</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            🔍 Search
          </button>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            🗑️ Clear Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {activity.title}
                </h3>
                <span className="text-lg font-bold text-primary-600">
                  ${activity.price}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {activity.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📍</span>
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">🎫</span>
                  <span className={activity.available_slots > 0 ? 'text-green-600' : 'text-red-600'}>
                    {activity.available_slots} slot{activity.available_slots !== 1 ? 's' : ''} available
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleBookClick(activity.id)}
                disabled={activity.available_slots <= 0}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {activity.available_slots > 0 ? '🎯 Book Now' : '❌ No Slots Available'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            📄 Load More Activities
          </button>
        </div>
      )}

      {activities.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg">No activities found</p>
          <p className="text-sm">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Date Picker Modal */}
      <DatePicker
        isOpen={showDatePicker}
        onDateSelect={handleDateSelect}
        onCancel={handleDatePickerCancel}
      />
    </div>
  )
}
