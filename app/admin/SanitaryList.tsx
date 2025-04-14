import { useState } from 'react';
import Image from 'next/image';
import UpdateSanitaryPopup from './UpdateSanitaryPopup';
import DeleteSanitary from './DeleteSanitary';
import { SanitaryItem } from '@prisma/client';

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
    <div className='py-6'>
      {sanitaryItems.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-secondary'>
                <th className='px-4 py-2 text-left text-foreground'>Item</th>
                <th className='px-4 py-2 text-left text-foreground'>
                  Category
                </th>
                <th className='px-4 py-2 text-left text-foreground'>
                  Quantity
                </th>
                <th className='px-4 py-2 text-left text-foreground'>Price</th>
                <th className='px-4 py-2 text-left text-foreground'>Brand</th>
                <th className='px-4 py-2 text-left text-foreground'>
                  Availability
                </th>
                <th className='px-4 py-2 text-left text-foreground'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sanitaryItems.map((item) => (
                <tr key={item.id} className='border-b border-border'>
                  <td className='w-[50px] h-[50px] rounded-full overflow-hidden mr-2'>
                    <Image
                      src={item.images[0] || '/rehan-sanitary.png'}
                      alt={item.name}
                      width={50}
                      height={50}
                      className='object-cover'
                      unoptimized
                    />
                  </td>
                  <td className='px-4 py-2'>{item.category}</td>
                  <td className='px-4 py-2'>{item.quantity}</td>
                  <td className='px-4 py-2'>${item.price}</td>
                  <td className='px-4 py-2'>{item.brand}</td>
                  <td className='px-4 py-2'>
                    {item.availability ? 'Available' : 'Not Available'}
                  </td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => setSelectedSanitary(item)}
                      className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 transition-all'
                    >
                      Update
                    </button>

                    <DeleteSanitary
                      itemId={item.id}
                      refreshSanitaryItems={refreshSanitaryItems}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-gray-300 text-center'>
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
