'use client'
import React, { useEffect, useState } from 'react'

interface ServiceType {
  id: string
  name: string
  description?: string
  duration: number
  price: number
}

function ServicesDash() {
  const [services, setServices] = useState<ServiceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetch('/api/services')
        const data: ServiceType[] = await res.json()
        setServices(data)
      } catch (err) {
        console.error('Failed to fetch services:', err)
      } finally {
        setLoading(false)
      }
    }
    getServices()
  }, [])

  if (loading) return <p>Loading services...</p>

  return (
    <div>
      {services.length === 0 && <h2>No services returned</h2>}
      {services.length > 0 &&
        services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            {service.description && <p>{service.description}</p>}
            <p>Duration: {service.duration} min</p>
            <p>Price: ${service.price}</p>
          </div>
        ))}
    </div>
  )
}

export default ServicesDash