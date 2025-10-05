'use client'
import React, { useState } from 'react'

interface Booking {
  members: string[];
  price: number;
  operatingHours: { start: string; end: string };
  services: string[];
  specials: string[];
  session: number;
}

interface TeamMember {
  firstName: string;
  lastName: string;
}

interface MemberProps {
  teamMembers: TeamMember[];
}

function BookingSettings({ teamMembers }: MemberProps) {
    const [booking, setBooking] = useState<Booking>({
        members: [],
        price: 650,
        operatingHours: { start: '09:00', end: '17:00' },
        services: [],
        specials: [],
        session: 60 
    })
   
    const services = [
        { service: 'services0' },
        { service: 'services1' },
        { service: 'services2' }
    ]

    const handleAddService = (service: string) => {
        setBooking({
            ...booking,
            services: [...booking.services, service]
        })
    }

    const handleRemoveService = (service: string) => {
        const newServicesList = booking.services.filter((e) => e !== service)
        setBooking({
            ...booking,
            services: newServicesList
        })
    }

    const handleAddMember = (memberName: string) => {
        setBooking({
            ...booking,
            members: [...booking.members, memberName]
        })
    }

    const handleRemoveMember = (memberName: string) => {
        const newMembersList = booking.members.filter((e) => e !== memberName)
        setBooking({
            ...booking,
            members: newMembersList
        })
    }

    const handleupdate =()=>{
      console.log(booking)
      alert('setting')
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Booking Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Operating Hours */}
                <div className="bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold mb-4">Operating Hours</h2>
                    <div className="flex gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Start Time</label>
                            <input
                                type="time"
                                value={booking.operatingHours.start}
                                onChange={(e) => setBooking({
                                    ...booking,
                                    operatingHours: {
                                        ...booking.operatingHours,
                                        start: e.target.value
                                    }
                                })}
                                className="border px-3 py-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">End Time</label>
                            <input
                                type="time"
                                value={booking.operatingHours.end}
                                onChange={(e) => setBooking({
                                    ...booking,
                                    operatingHours: {
                                        ...booking.operatingHours,
                                        end: e.target.value
                                    }
                                })}
                                className="border px-3 py-2 w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Session Duration */}
                <div className="bg-white p-4 shadow">
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
                            className="border px-3 py-2 w-full"
                            min="15"
                            step="15"
                        />
                    </div>
                </div>

                {/* Default Price */}
                <div className="bg-white p-4 shadow">
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
                            className="border px-3 py-2 w-full"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                {/* Services Section */}
                <div className="bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold mb-4">Services</h2>
                    <div>
                        <label className="block text-sm font-medium mb-2">Available Services</label>
                        <div className='flex gap-2 flex-wrap'>
                            {services.map((service, index) => (
                                <button 
                                    key={index} 
                                    type="button"
                                    className='border px-3 py-2 rounded hover:bg-gray-50 transition'
                                    onClick={() => handleAddService(service.service)}
                                >
                                    {service.service}
                                </button>
                            ))}
                        </div>
                    </div>
                    {booking.services.length > 0 && (
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
                <div className="bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold mb-4">Team Members</h2>
                    <div>
                        <label className="block text-sm font-medium mb-2">Available Members</label>
                        <div className='flex gap-2 flex-wrap'>
                            {teamMembers.map((member, index) => (
                                <button 
                                    key={index} 
                                    type="button"
                                    className='border px-3 py-2 rounded hover:bg-gray-50 transition'
                                    onClick={() => handleAddMember(`${member.firstName} ${member.lastName}`)}
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
                                {booking.members.map((member, index) => (
                                    <button 
                                        key={index} 
                                        type="button"
                                        className='border px-3 py-2 rounded bg-red-100 hover:bg-red-200 transition'
                                        onClick={() => handleRemoveMember(member)}
                                    >
                                        {member} ×
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div><button onClick={handleupdate}>Save</button></div>
            </div>
        </div>
    )
}

export default BookingSettings