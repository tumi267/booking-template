'use client'
import Image from 'next/image'
import React from 'react'

function TeamDash() {
  let placeholder=[{name:'John Doe', role:'Manager', image:'/next.svg'},
  {name:'Jane Smith', role:'Staff', image:'/next.svg'}]
  return (
    <div>
        <h2>Edit Team</h2>
      <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add Member</button>
      <table className='min-w-full mt-4 border'>
        <thead>
          <tr className='bg-gray-200'> 
            <th>Image</th> 
            <th className='border px-4 py-2'>Name</th>
            <th className='border px-4 py-2'>Role</th>
            <th className='border px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {placeholder.map((member, index)=>(
            <tr key={index} className='text-center'>
              <td className='border px-4 py-2 flex justify-center'>
              <Image src={member.image} alt={member.name} width={50} height={50} className='rounded-full'/></td>
              <td className='border px-4 py-2'>{member.name}</td>
              <td className='border px-4 py-2'>{member.role}</td>
              <td className='border px-4 py-2'>
                <button className='bg-green-500 text-white px-2 py-1 rounded mr-2'>Edit</button>
                <button className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamDash