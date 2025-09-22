'use client'
import React, { useState } from 'react'

interface Member {
  id: string
  firstName: string
  lastName: string
  role: string
  email?: string
  phone?: string
  image: string
}

interface UpdateMemberProps {
  member: Member | null   // allow null
  closeModal: () => void
}

function UpdateMember({ member, closeModal }: UpdateMemberProps) {
  if (!member) return null // don’t render modal if no member selected

  const [updatedMember, setUpdatedMember] = useState<Member>(member)

  const handleUpdateMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/team`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMember),
      })

      if (response.ok) {
        const result = await response.json()
        
        closeModal()
      } else {
        console.error('Failed to update member')
      }
    } catch (error) {
      console.error('Error updating member:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Update Team Member</h2>
        <form onSubmit={handleUpdateMemberSubmit}>
          <div className="mb-4">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              value={updatedMember.firstName}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, firstName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              value={updatedMember.lastName}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, lastName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <input
              type="text"
              value={updatedMember.role}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, role: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={updatedMember.email || ''}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              value={updatedMember.phone || ''}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, phone: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              value={updatedMember.image}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, image: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateMember

