import { NextResponse } from 'next/server';
import { createBookingSettings, getBookingSettings, updateBookingSettings } from '@/app/libs/bookingSettings/BookingSettings';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {id}=body
   if(id){
    const settings = await updateBookingSettings(id, body);
    return NextResponse.json(settings, { status: 201 }); 
  }else{
    const settings = await createBookingSettings(body);
    return NextResponse.json(settings, { status: 201 });
   }
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create settings' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const settings = await getBookingSettings();
   
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}