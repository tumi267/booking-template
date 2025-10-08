'use client'
import React, { useEffect, useState } from 'react'
import CreateService from './CreateService/CreateService'

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
  const [isCreate,setIsCreate]=useState(false)
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
  const opencreatemodule=()=>{
    setIsCreate(!isCreate)
  }
  if (loading) return <p>Loading services...</p>

  return (
    <div>
      <button className='bg-black text-white p-[0.5em]' onClick={opencreatemodule}>Add Service</button>
      {isCreate&&<CreateService
      openCreateModule={opencreatemodule}
      />}
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