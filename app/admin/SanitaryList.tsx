import { useState } from 'react';
import Image from 'next/image';
import UpdateSanitaryPopup from './UpdateSanitaryPopup';
import DeleteSanitary from './DeleteSanitary';
import { SanitaryItem } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

interface SanitaryListProps {
  sanitaryItems: SanitaryItem[];
  refreshSanitaryItems: () => void;
}

const SanitaryList = ({
  sanitaryItems,
  refreshSanitaryItems,
}: SanitaryListProps) => {
  const [selectedSanitary, setSelectedSanitary] = useState<SanitaryItem | null>(
    null
  );

  return (
    <div className='py-6 px-4'>
      {sanitaryItems.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {sanitaryItems.map((item) => (
            <Card
              key={item.id}
              className='overflow-hidden hover:shadow-lg transition-shadow'
            >
              {/* Image Section */}
              <div className='relative h-48 w-full'>
                <Image
                  src={item.images[0] || '/rehan-sanitary.png'}
                  alt={item.name}
                  fill
                  className='object-cover'
                  unoptimized
                />
                <Badge
                  variant={item.availability ? 'default' : 'destructive'}
                  className='absolute top-2 right-2'
                >
                  {item.availability ? 'Available' : 'Out of Stock'}
                </Badge>
              </div>

              {/* Content Section */}
              <CardContent className='p-4 space-y-4'>
                <div className='space-y-2'>
                  <Link
                    href={`/products/${item.id}`}
                    className='font-semibold text-lg line-clamp-1 text-primary transition-colors hover:underline'
                  >
                    {item.name}
                  </Link>
                  <div className='flex items-center justify-between'>
                    <Badge variant='outline'>{item.category}</Badge>
                    <span className='font-bold text-primary'>
                      ${item.price}
                    </span>
                  </div>
                </div>

                <div className='space-y-1 text-sm text-muted-foreground'>
                  <div className='flex justify-between'>
                    <span>Brand:</span>
                    <span className='font-medium text-foreground'>
                      {item.brand}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Quantity:</span>
                    <span className='font-medium text-foreground'>
                      {item.quantity} units
                    </span>
                  </div>
                </div>
              </CardContent>

              {/* Actions Section */}
              <CardFooter className='p-4 bg-muted/50 flex gap-2'>
                <button
                  onClick={() => setSelectedSanitary(item)}
                  className='flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg 
                           hover:bg-primary/90 focus:outline-none focus:ring-2 
                           focus:ring-primary/50 transition-all text-sm'
                >
                  Update
                </button>
                <DeleteSanitary
                  itemId={item.id}
                  refreshSanitaryItems={refreshSanitaryItems}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className='text-muted-foreground text-center mt-8'>
          No sanitary items available.
        </p>
      )}

      {selectedSanitary && (
        <UpdateSanitaryPopup
          item={selectedSanitary}
          onClose={() => setSelectedSanitary(null)}
          refreshSanitaryItems={refreshSanitaryItems}
        />
      )}
    </div>
  );
};

export default SanitaryList;
