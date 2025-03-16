import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// PATCH /api/cars/:id - Update car by ID
export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>; // Directly destructure params instead of using Promise
  }
) {
  try {
    const { id } = await params; // Destructure id from params
    console.log('Received ID:', id);

    const body = await request.json(); // Get the update data from the request body
    console.log('body', body);
    // Update the sanitary item in the database
    const updatedSanitaryItem = await prisma.sanitaryItem.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedSanitaryItem, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update sanitary item',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    console.log('Deleting sanitary item with ID:', id);

    if (!id) {
      return NextResponse.json(
        { error: 'Sanitary item ID is required' },
        { status: 400 }
      );
    }

    const deletedSanitaryItem = await prisma.sanitaryItem.delete({
      where: { id: id },
    });

    return NextResponse.json(deletedSanitaryItem, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to delete sanitary item',
      },
      { status: 500 }
    );
  }
}
