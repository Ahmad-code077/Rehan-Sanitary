import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>; // Directly destructure params instead of using Promise
  }
) {
  const { id } = await params;
  console.log('ids 🤣🤣🤣🤣', id);
  try {
    const data = await prisma.sanitaryItem.findUnique({ where: { id } });
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to Fetch the sanitary item',
      },
      { status: 500 }
    );
  }
}
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

    const body = await request.json(); // Get the update data from the request body
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
