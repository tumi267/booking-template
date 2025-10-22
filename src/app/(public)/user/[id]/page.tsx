// app/user/[userId]/page.tsx
import React from 'react'

interface UserProfilePageProps {
  params: {
    id: string
  }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params
// menu
// profile
// booking
// booking history
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p><strong>User ID:</strong> {id}</p>
            {/* Add more profile info here */}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Bookings Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
            <p>Your current bookings will appear here.</p>
            {/* Add bookings list component */}
          </div>

          {/* Booking History */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Booking History</h2>
            <p>Your booking history will appear here.</p>
            {/* Add booking history component */}
          </div>
        </div>
      </div>
    </div>
  )
}