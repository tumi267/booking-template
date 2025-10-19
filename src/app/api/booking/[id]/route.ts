import { NextResponse } from 'next/server'
import { getBookingById, updateBooking, deleteBooking } from '@/app/libs/booking/Booking'

// GET a single booking
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await getBookingById(params.id)
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }
    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT (update) a booking
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const {
      status,
      price,
      sessionDuration,
      date,
      time,
      specialRequests,
      clientId,
      providerId,
      serviceId
    } = body

    const updated = await updateBooking(params.id, {
      status,
      price,
      sessionDuration,
      date,
      time,
      specialRequests,
      ...(clientId && { clientId }),
      ...(providerId && { providerId }),
      ...(serviceId && { serviceId }),
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE a booking
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteBooking(params.id)
    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

