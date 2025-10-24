'use client'
import React, { useEffect, useState } from 'react'

interface Props {
  userId: string
}

function BookingHistory({ userId }: Props) {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return
      
      setIsLoading(true)
      try {
        const response = await fetch(`/api/booking?clientId=${userId}`)
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [userId])

  if (!userId) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        <p>Please sign in to view your booking history.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        <p>Loading your bookings...</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Booking History</h2>
      
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{booking.services.name}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    with {booking.provider.firstName} {booking.provider.lastName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R{booking.price}</p>
                  <p className="text-sm text-gray-600">{booking.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookingHistory