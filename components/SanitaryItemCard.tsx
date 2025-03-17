import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SanitaryItem } from '@prisma/client';

interface SanitaryItemCardProps {
  item: SanitaryItem;
}

const SanitaryItemCard: React.FC<SanitaryItemCardProps> = ({ item }) => {
  return (
    <div className='bg-card text-foreground rounded-3xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 '>
      <Image
        src={item.image || '/default-sanitary-image.jpg'} // Fallback image if item.image is not available
        alt={item.name}
        className='w-full h-64 object-cover mb-4'
        width={500}
        height={300}
        unoptimized={true}
        loading='lazy'
      />
      <div className='p-4'>
        <h3 className='text-xl font-semibold'>{item.name}</h3>
        <p className='text-sm text-muted-foreground'>
          Category: <span className='text-neutral-300'>{item.category}</span>
        </p>
        <p className='text-sm text-muted-foreground'>
          Brand: <span className='text-neutral-300'>{item.brand}</span>
        </p>
        <p className='text-sm text-muted-foreground'>
          Price: <span className='text-neutral-300'>PKR {item.price}</span>
        </p>
        <p
          className={`text-sm font-semibold ${
            item.availability ? 'text-success' : 'text-destructive'
          }`}
        >
          {item.availability ? 'Available' : 'Not Available'}
        </p>
        <Link
          href={`/products/${item.id}`}
          className='text-primary hover:underline mt-2 block'
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SanitaryItemCard;
