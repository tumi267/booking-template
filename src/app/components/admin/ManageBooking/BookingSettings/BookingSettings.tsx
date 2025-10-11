'use client'
import React, { useEffect, useState } from 'react'

interface TeamMember {
  id: string;
  memberName: string;
}

interface Booking {
  members: TeamMember[];
  price: number;
  services: string[];
  specials: string[];
  session: number;
}

interface Service {
  id: string
  name: string
  description?: string
}

interface Provider {
  id: string
  firstName: string
  lastName: string
}

interface MemberProps {
  teamMembers: Provider[];
}

interface BookingSettingsData {
  id?: string
  providerId: string
  serviceId: string
  defaultSessionDuration: number
  defaultPrice: number
}

function BookingSettings() {
  const [services, setServices] = useState<Service[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [existingSettings, setExistingSettings] = useState<BookingSettingsData[]>([])
  const [booking, setBooking] = useState<Booking>({
    members: [],
    price: 650,
    services: [],
    specials: [],
    session: 60 
  })
  const [isLoading, setIsLoading] = useState(false)

  // Fetch services and existing settings
  useEffect(() => {
    fetchServices()
    fetchProviders()
    fetchExistingSettings()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const fetchProviders = async () => {
    try {
      const res = await fetch('/api/team/getActiveProvider')
      if (res.ok) {
        const data = await res.json()
        setProviders(data)
      }
    } catch (error) {
      console.error('Error fetching providers:', error)
    }
  }


//   must be by id
  const fetchExistingSettings = async () => {
    try {
      const res = await fetch(`/api/booking-settings`)
      if (res.ok) {
        const data = await res.json()
        
        if(data.length > 0){
        
          const existingSetting = data[0]
          
          // Convert the API data to match your Booking interface
          setBooking({
            members: [
              {
                id: existingSetting.providerId,
                memberName: `${existingSetting.provider.firstName} ${existingSetting.provider.lastName}`
              }
            ],
            services: [existingSetting.service.name],
            price: existingSetting.defaultPrice,
            session: existingSetting.defaultSessionDuration,
            specials: [] // You can populate this if you have specials data
          })
          // Optionally pre-populate form with existing settings
          // const firstSetting = data[0]
          // setBooking(prev => ({
          //   ...prev,
          //   price: firstSetting.defaultPrice,
          //   session: firstSetting.defaultSessionDuration
          // }))
        }
      }
    } catch (error) {
      console.error('Error fetching booking settings:', error)
    }
  }

  const handleAddService = (service: string) => {
    if (!booking.services.includes(service)) {
      setBooking({
        ...booking,
        services: [...booking.services, service]
      })
    }
  }

  const handleRemoveService = (service: string) => {
    const newServicesList = booking.services.filter((e) => e !== service)
    setBooking({
      ...booking,
      services: newServicesList
    })
  }

  const handleAddMember = (memberName: string, id: string) => {
    if (!booking.members.some(member => member.id === id)) {
      setBooking({
        ...booking,
        members: [...booking.members, { id, memberName }]
      })
    }
  }

  const handleRemoveMember = (memberId: string) => {
    const newMembersList = booking.members.filter((member) => member.id !== memberId)
    setBooking({
      ...booking,
      members: newMembersList
    })
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      // You need to decide how to handle multiple providers/services
      // This is a simplified version - you might need to adjust based on your needs
      const settingsData = {
        providerId: booking.members[0]?.id || providers[0]?.id, // First selected member or first provider
        serviceId: services.find(s => s.name === booking.services[0])?.id || '', // First selected service
        defaultSessionDuration: booking.session,
        defaultPrice: booking.price
      }

      const uploadSetting = await fetch('/api/booking-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Fixed typo
        body: JSON.stringify(settingsData) // Send the properly formatted data
      })
      
      if (uploadSetting.ok) {
        const data = await uploadSetting.json() // Only parse once
       
        alert('Settings have been updated')
        fetchExistingSettings() // Refresh existing settings
      } else {
        alert('Failed to update settings')
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      alert('Error updating settings')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Session Duration */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Session Duration</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={booking.session}
              onChange={(e) => setBooking({
                ...booking,
                session: parseInt(e.target.value) || 60
              })}
              className="border px-3 py-2 w-full rounded"
              min="15"
              step="15"
            />
          </div>
        </div>

        {/* Default Price */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Price</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Price (R)</label>
            <input
              type="number"
              value={booking.price}
              onChange={(e) => setBooking({
                ...booking,
                price: parseFloat(e.target.value) || 650
              })}
              className="border px-3 py-2 w-full rounded"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Services</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Available Services</label>
            <div className='flex gap-2 flex-wrap'>
              {services.map((service) => (
                <button 
                  key={service.id} 
                  type="button"
                  className={`border px-3 py-2 rounded transition ${
                    booking?.services.includes(service.name) 
                      ? 'bg-blue-100 border-blue-300' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleAddService(service.name)}
                  disabled={booking?.services.includes(service.name)}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>
          {booking?.services.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Selected Services</label>
              <div className='flex gap-2 flex-wrap'>
                {booking.services.map((service, index) => (
                  <button 
                    key={index} 
                    type="button"
                    className='border px-3 py-2 rounded bg-red-100 hover:bg-red-200 transition'
                    onClick={() => handleRemoveService(service)}
                  >
                    {service} ×
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Members Section */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Team Members</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Available Members</label>
            <div className='flex gap-2 flex-wrap'>
              {providers.map((member) => (
                <button 
                  key={member.id} 
                  type="button"
                  className={`border px-3 py-2 rounded transition ${
                    booking.members.some(m => m.id === member.id)
                      ? 'bg-blue-100 border-blue-300'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleAddMember(`${member.firstName} ${member.lastName}`, member.id)}
                  disabled={booking.members.some(m => m.id === member.id)}
                >
                  {member.firstName} {member.lastName}
                </button>
              ))}
            </div>
          </div>
          {booking.members.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Selected Members</label>
              <div className='flex gap-2 flex-wrap'>
                {booking.members.map((member) => (
                  <button 
                    key={member.id} 
                    type="button"
                    className='border px-3 py-2 rounded bg-red-100 hover:bg-red-200 transition'
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    {member.memberName} ×
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button 
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingSettings