// app/user/[userId]/page.tsx
import Menu from '@/app/components/(public)/User/Menu'
import UserDash from '@/app/components/(public)/User/UserDash'
import React from 'react'

interface UserProfilePageProps {
  params: {
    id: string
  }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params
  return (
    <div>
      <UserDash
      id={id}
      />
    </div>
  )
}