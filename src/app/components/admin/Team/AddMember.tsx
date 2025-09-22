'use client'
import React, { useState } from 'react'
interface AddMemberProps {
  openAddTeamMember: () => void
}

function AddMember({ openAddTeamMember }: AddMemberProps) {

    const [newTeamMember, setNewTeamMember] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phone: '',
    imageurl: '',
  })
  const handleNewTeamMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send newTeamMember to your backend API
    addMember() 
  }

  const addMember=async()=>{
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeamMember),
      })
 console.log('Response status:', response.status)
      if (response.status==201) {
        const createdMember = await response.json()
        
          
        
        openAddTeamMember() // Close the modal after successful creation
      }else if(response.status==250){
        alert('Member with this email already exists')
      }
       else {
        console.error('Failed to create member')
      }
    } catch (error) {
      console.error('Error creating member:', error)
    } 
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Add Team Member</h2>
        <form onSubmit={handleNewTeamMemberSubmit}>
          <div className="mb-4">
            <label className="block mb-1">First Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded" 
            onChange={(e) =>
            setNewTeamMember({ ...newTeamMember, firstName: e.target.value })
             }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Last Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded" 
                        onChange={(e) =>
            setNewTeamMember({ ...newTeamMember, lastName: e.target.value })
             }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <input type="text" className="w-full border px-3 py-2 rounded" 
            onChange={(e) =>
            setNewTeamMember({ ...newTeamMember, role: e.target.value })
             }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input type="email" className="w-full border px-3 py-2 rounded" 
            onChange={(e) =>
            setNewTeamMember({ ...newTeamMember, email: e.target.value })
             }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone</label>
            <input type="text" className="w-full border px-3 py-2 rounded" 
            onChange={(e) =>
            setNewTeamMember({ ...newTeamMember, phone: e.target.value })
             }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Image URL</label>
            <input type="text" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={openAddTeamMember}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddMember