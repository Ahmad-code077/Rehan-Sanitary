import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/sanitary-items - Fetch all sanitary items
// export async function GET() {
//   try {
//     const sanitaryItems = await prisma.sanitaryItem.findMany();

//     return NextResponse.json(sanitaryItems);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: error.message || 'Failed to fetch sanitary items' },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(
//       { error: 'An unknown error occurred' },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const search = url.searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Fetch items with search filtering
    const items = await prisma.sanitaryItem.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
        ],
      },
      skip,
      take: limit,
    });

    const totalItems = await prisma.sanitaryItem.count({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
        ],
      },
    });

    return NextResponse.json({
      items,
      totalItems,
      page,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Failed to get sanitary item' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/sanitary-items - Create a new sanitary item
export async function POST(request: Request) {
  try {
    const { name, category, price, quantity, image, brand, availability } =
      await request.json();

    console.log('data', {
      name,
      category,
      price,
      quantity,
      image,
      brand,
      availability,
    });

    const newSanitaryItem = await prisma.sanitaryItem.create({
      data: {
        name,
        category,
        price,
        quantity,
        image,
        brand,
        availability,
      },
    });

    return NextResponse.json(newSanitaryItem, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Failed to create sanitary item' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

// PATCH /api/sanitary-items/:id - Update a sanitary item
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { name, category, price, quantity, image, brand, availability } =
      await request.json();

    const { id } = await params;
    console.log('id in the API file:', id);

    const updatedSanitaryItem = await prisma.sanitaryItem.update({
      where: { id: id },
      data: {
        name,
        category,
        price,
        quantity,
        image,
        brand,
        availability,
      },
    });

    return NextResponse.json(updatedSanitaryItem, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Failed to update sanitary item' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
