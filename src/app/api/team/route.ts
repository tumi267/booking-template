// /app/api/team/route.ts
import { createUser, getUsers, updateUser } from '@/app/libs/users/user'
import { NextResponse } from 'next/server'



// GET request
export async function GET() {
const team = await getUsers()
  return NextResponse.json(team)
}

// POST request
export async function POST(req: Request) {
  const newMember = await req.json()
  const team = await getUsers() 
  if(team.find((member) => member.email === newMember.email)) {

    return NextResponse.json({ msg: 'Member with this email already exists' }, { status: 250 })
  } 
    // Here you would typically add the new member to your database
    const data=await createUser(newMember)
    console.log('Created Member:', data)
  return NextResponse.json(data, { status: 201 })
}

// PUT (update member)
export async function PUT(
  req: Request,
) {
  try {
    const body = await req.json()
    // updateUser should handle actual DB update
    const {email,imageurl,firstName,lastName,phone,role}=body
    let data=({email,imageurl,firstName,lastName,phone,role})
    const updated = await updateUser(body.id, data)

    if (!updated) {
      return NextResponse.json({ msg: 'Member not found' }, { status: 404 })
    }

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json(
      { msg: 'Error updating member' },
      { status: 500 }
    )
  }
}