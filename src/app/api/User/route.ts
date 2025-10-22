// app/api/webhook/clerk/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUser, updateUser, getUserById } from '@/app/libs/users/user';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { type, data } = body;
    console.log(data)
    // // Clerk webhook sends user info inside data object
    // const userId = data.id;
    // const email = data.email_addresses?.[0]?.email_address;
    // const firstName = data.first_name;
    // const lastName = data.last_name;
    // const imageurl = data.image_url;

    // if (!userId || !email) {
    //   return NextResponse.json({ error: 'Missing user info' }, { status: 400 });
    // }

    // // Check if user exists in your database
    // const existingUser = await getUserById(userId);

    // if (type === 'user.created' && !existingUser) {
    //   // Create user if it doesn't exist
    //   await createUser({
    //     email,
    //     clerkId,
    //     firstName,
    //     lastName,
    //     imageurl,
    //     role: 'CLIENT', // default role
    //   });
    //   console.log(`Created new user ${email}`);
    // } else if (type === 'user.updated' && existingUser) {
    //   // Update user if exists
    //   await updateUser(userId, {
    //     email,
    //     firstName,
    //     lastName,
    //     imageurl,
    //   });
    //   console.log(`Updated user ${email}`);
    // }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Clerk webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
