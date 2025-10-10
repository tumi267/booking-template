import { NextResponse } from 'next/server';
import { updateBookingSettings, deleteBookingSettings } from '@/app/libs/bookingSettings/BookingSettings';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const settings = await updateBookingSettings(params.id, body);
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteBookingSettings(params.id);
    return NextResponse.json({ message: 'Settings deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete settings' }, { status: 500 });
  }
}