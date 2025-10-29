// app/user/[userId]/page.tsx
import Menu from '@/app/components/(public)/User/Menu'
import UserDash from '@/app/components/(public)/User/UserDash'
import { getProviderByClerkId } from '@/app/libs/providers/providers'
import { getUserByClerkId } from '@/app/libs/users/user'
import React from 'react'
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server'; // App router equivalent

interface UserProfilePageProps {
  params: {
    id: string
  }
}


export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params
  const user = await currentUser();

  // ✅ If no Clerk user is signed in → redirect to /user
  if (!user) redirect('/user');

  

  // Fetch from Prisma (runs on Node.js runtime)
  const dbUser = await getUserByClerkId(id);
  const dbProvider = await getProviderByClerkId(id);

  // ✅ Not found → redirect
  if (!dbUser && !dbProvider) redirect('/user');

  // ✅ If provider → redirect to admin dashboard
  if (dbProvider) redirect('/admin');


  
  return (
    <div>
      <UserDash
      id={id}
      />
    </div>
  )
}
