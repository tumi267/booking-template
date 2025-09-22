'use client'

// import { emailAddresses } from '@clerk/nextjs/api'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddMember from './AddMember'
import UpdateMember from './editTeamMember'

interface Member {
  id: string
  firstName: string
  lastName:string
  role: string
  image: string
  email?: string
  phone?: string
}

function TeamDash() {
  const [isloading, setIsLoading] = useState(true)
  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState<Member[]>([])
  const [openupdateMemberModal, setOpenUpdateMemberModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

useEffect(() => {
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team')
      const data = await response.json()
      setTeamMembers(data) // Assuming data is an array of team members
    } catch (error) {
      console.error('Error fetching team members:', error)
    }
  }
  fetchTeamMembers() // <-- actually call the function
  setIsLoading(false)
}, [isAddTeamMemberOpen, openupdateMemberModal]) // <-- add dependencies here


  const openAddTeamMember = () => {
    setIsAddTeamMemberOpen(!isAddTeamMemberOpen)
  }

  const handleEdit = (member: Member) => {
    setSelectedMember(member) // pass full member object
    setOpenUpdateMemberModal(true)
  }
if (isloading) {
  return <div>Loading...</div>
}
  return (
    <div>
      <h2>Edit Team</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openAddTeamMember}
      >
        Add Member
      </button>

      <table className="min-w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th>Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
      
        <tbody>
      {teamMembers.length === 0 ? (
      <tr>
        <td colSpan={4} className="text-center py-4">
          No members found
        </td>
      </tr>
      ) : (
        teamMembers.map((member, index) => (
        <tr key={index} className="text-center">
          <td className="border px-4 py-2 flex justify-center">
          <Image
            src={member.image}
            alt={member.firstName}
            width={50}
            height={50}
            className="rounded-full"
          />
          </td>
          <td className="border px-4 py-2">{member.firstName} {member.lastName}</td>
          <td className="border px-4 py-2">{member.role}</td>
          <td className="border px-4 py-2">
            <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(member)}>Edit</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </td>
        </tr>
        ))
        )}
      </tbody>
      </table>
      {openupdateMemberModal &&
        <UpdateMember
          member={selectedMember}
          closeModal={() => setOpenUpdateMemberModal(false)}
        />
      }
      {isAddTeamMemberOpen && <AddMember openAddTeamMember={openAddTeamMember} />}
    </div>
  )
}

export default TeamDash
