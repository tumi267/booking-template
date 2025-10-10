'use client'
import React, { useState } from 'react'
import { ProviderRole } from '@prisma/client'

interface Provider {
  id: string
  firstName: string
  lastName: string
  email?: string
  imageurl?: string
  bio?: string
  role: ProviderRole
  isAvailable?: boolean
  rating?: number
  totalReviews?: number
}

interface UpdateMemberProps {
  member: Provider | null
  closeModal: () => void
}

function UpdateMember({ member, closeModal }: UpdateMemberProps) {
  if (!member) return null

  const [updatedProvider, setUpdatedProvider] = useState<Provider>(member)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`/api/team/`, { // Use member ID in URL
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id:updatedProvider.id,
          firstName: updatedProvider.firstName,
          lastName: updatedProvider.lastName,
          email: updatedProvider.email,
          imageurl: updatedProvider.imageurl,
          bio: updatedProvider.bio,
          role: updatedProvider.role,
          isAvailable: updatedProvider.isAvailable,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Updated provider:', result)
        closeModal()
      } else {
        const error = await response.json()
        console.error('Failed to update provider:', error)
        alert(error.msg || 'Failed to update provider')
      }
    } catch (error) {
      console.error('Error updating provider:', error)
      alert('Error updating provider')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6  shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Provider</h2>
          <button 
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            disabled={isLoading}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-3">
            <label className="block mb-1">First Name *</label>
            <input
              type="text"
              value={updatedProvider.firstName}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedProvider({ ...updatedProvider, firstName: e.target.value })
              }
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Last Name *</label>
            <input
              type="text"
              value={updatedProvider.lastName}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedProvider({ ...updatedProvider, lastName: e.target.value })
              }
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={updatedProvider.email || ''}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedProvider({ ...updatedProvider, email: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Bio</label>
            <textarea
              value={updatedProvider.bio || ''}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedProvider({ ...updatedProvider, bio: e.target.value })
              }
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              value={updatedProvider.imageurl || ''}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedProvider({ ...updatedProvider, imageurl: e.target.value })
              }
              disabled={isLoading}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Role</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={updatedProvider.role}
              onChange={(e) =>
                setUpdatedProvider({
                  ...updatedProvider,
                  role: e.target.value as ProviderRole,
                })
              }
              disabled={isLoading}
            >
              {Object.values(ProviderRole).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={updatedProvider.isAvailable || false}
                onChange={(e) =>
                  setUpdatedProvider({ 
                    ...updatedProvider, 
                    isAvailable: e.target.checked 
                  })
                }
                disabled={isLoading}
                className="mr-2"
              />
              Available for bookings
            </label>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              onClick={closeModal}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Provider'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateMember