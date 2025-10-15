import { NextResponse } from 'next/server';
import { 
  createBooking, 
  getAllBookings, 
  getBookingsByClient, 
  getBookingsByProvider, 
  updateBooking, 
  deleteBooking 
} from '@/app/libs/booking/Booking';

/* ---------------------- GET (READ BOOKINGS) ---------------------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    const providerId = searchParams.get("providerId");

    let bookings;

    if (clientId) {
      bookings = await getBookingsByClient(clientId);
    } else if (providerId) {
      bookings = await getBookingsByProvider(providerId);
    } else {
      bookings = await getAllBookings();
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

/* ---------------------- POST (CREATE BOOKING) ---------------------- */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newBooking = await createBooking({
      clientId: data.clientId ?? null,
      providerId: data.providerId,
      serviceId: data.serviceId,
      price: data.price,
      sessionDuration: data.sessionDuration,
      date: new Date(data.date),
      time: data.time,
      specialRequests: data.specialRequests ?? "",
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    console.error("Error creating booking:", error);

    if (error.code) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

/* ---------------------- PATCH (UPDATE BOOKING) ---------------------- */
export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Missing booking ID" },
        { status: 400 }
      );
    }

    const updatedBooking = await updateBooking(id, {
      status: updateData.status,
      price: updateData.price,
      sessionDuration: updateData.sessionDuration,
      date: updateData.date ? new Date(updateData.date) : undefined,
      time: updateData.time ? updateData.time : undefined,
      specialRequests: updateData.specialRequests,
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error: any) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

/* ---------------------- DELETE (DELETE BOOKING) ---------------------- */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing booking ID" },
        { status: 400 }
      );
    }

    const deleted = await deleteBooking(id);
    return NextResponse.json(deleted, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}