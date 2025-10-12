import { NextResponse } from 'next/server';
import {
  getOperatingHourById,
  updateOperatingHour,
  deleteOperatingHour,
} from '@/app/libs/Operations/Operations'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const record = await getOperatingHourById(params.id)
    if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(record)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const record = await updateOperatingHour(params.id, body)
    return NextResponse.json(record)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await deleteOperatingHour(params.id)
    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
// import { updateOperatingHoursBulk } from '@/app/libs/Operations/Operations';

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();
//     const { updates } = body;

//     if (!updates || !Array.isArray(updates)) {
//       return NextResponse.json(
//         { error: 'updates array is required' },
//         { status: 400 }
//       );
//     }

//     const result = await updateOperatingHoursBulk(updates);
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Error bulk updating operating hours:', error);
//     return NextResponse.json(
//       { error: 'Failed to update operating hours' },
//       { status: 500 }
//     );
//   }
// }