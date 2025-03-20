import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';
    const brand = url.searchParams.get('brand') || '';
    const availability = url.searchParams.get('availability');
    const sortBy = url.searchParams.get('sortBy') || 'latest'; // latest or price
    const minPrice = parseInt(url.searchParams.get('minPrice') || '0', 10);
    const maxPrice = parseInt(
      url.searchParams.get('maxPrice') || '1000000',
      10
    );

    const skip = (page - 1) * limit;

    // Build filter query
    const filterConditions: Prisma.SanitaryItemWhereInput = {
      price: { gte: minPrice, lte: maxPrice },
    };

    if (search) {
      filterConditions.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }
    // Category filter (only apply if category is provided and not 'all')
    if (category && category !== 'all') {
      filterConditions.category = category;
    }
    if (brand && brand !== 'all') {
      filterConditions.brand = brand;
    }
    if (availability !== null) {
      if (availability === 'true' || availability === 'false') {
        filterConditions.availability = availability === 'true';
      }
      // If availability is not 'true' or 'false', do not apply any filter (show all items)
    }
    const orderBy: Record<string, 'asc' | 'desc'> =
      sortBy === 'priceAsc'
        ? { price: 'asc' }
        : sortBy === 'priceDesc'
        ? { price: 'desc' }
        : { createdAt: 'desc' };

    // Fetch items with applied filters
    const items = await prisma.sanitaryItem.findMany({
      where: filterConditions,
      skip,
      take: limit,
      orderBy,
    });

    const totalItems = await prisma.sanitaryItem.count({
      where: filterConditions,
    });

    console.log('items in the backend', items);
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
    const { name, category, price, quantity, images, brand, availability } =
      await request.json();
    console.log('images in the api', images);
    const imagesArray = Array.isArray(images) ? images : [images];

    const newSanitaryItem = await prisma.sanitaryItem.create({
      data: {
        name,
        category,
        price,
        quantity,
        images: imagesArray,
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
    const { name, category, price, quantity, images, brand, availability } =
      await request.json();
    const imagesArray = Array.isArray(images) ? images : [images];

    const { id } = await params;

    const updatedSanitaryItem = await prisma.sanitaryItem.update({
      where: { id: id },
      data: {
        name,
        category,
        price,
        quantity,
        images: imagesArray,
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
