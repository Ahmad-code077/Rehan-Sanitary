'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SanitaryItem } from '@/app/admin/SanitaryList'; // Adjust this import if needed
import Image from 'next/image';

const SingleSanitaryItem: React.FC = () => {
  const [item, setItem] = useState<SanitaryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { id } = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!id) return;

    const fetchSanitaryItem = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/sanitary-items`);
        if (!response.ok) {
          throw new Error('Failed to fetch sanitary item');
        }
        const data: SanitaryItem[] = await response.json();
        const foundItem = data.find((item: SanitaryItem) => item.id === id);

        if (foundItem) {
          setItem(foundItem);
        } else {
          setError('Sanitary item not found');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSanitaryItem();
  }, [id, apiUrl]);

  if (loading)
    return (
      <p className='text-center text-gray-300 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Loading...
      </p>
    );
  if (error)
    return (
      <p className='text-center text-red-600 dark:text-red-400 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Error: {error}
      </p>
    );

  return (
    <section className='p-8 mt-12 shadow-2xl rounded-xl'>
      {item ? (
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Image Section */}
          <div className='flex-shrink-0 w-full md:w-1/2 flex justify-center items-center'>
            <Image
              className='w-full h-[400px] object-cover rounded-xl shadow-xl border-4 border-gray-700 transition-transform duration-500 transform hover:scale-105 '
              src={item.image}
              alt={item.name}
              priority
              width={960}
              height={540}
              unoptimized={true}
            />
          </div>

          {/* Content Section */}
          <div className='flex flex-col md:w-1/2'>
            <h1 className='text-5xl font-extrabold text-white '>
              {item.name} ({item.category})
            </h1>
            <div className='space-y-6'>
              <div>
                <h3 className='text-3xl font-semibold text-white mt-4'>
                  Details:
                </h3>
                <ul className='space-y-4 mt-2'>
                  <li className='text-lg text-gray-300'>
                    <strong>Brand:</strong> {item.brand}
                  </li>
                  {/* <li className='text-lg text-gray-300'>
                    <strong>Type:</strong> {item.type}
                  </li> */}
                  <li className='text-lg text-gray-300'>
                    <strong>Price:</strong> PKR {item.price}
                  </li>
                  <li
                    className={`text-lg font-semibold ${
                      item.availability ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {item.availability ? 'Available' : 'Out of Stock'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-300 text-lg font-medium'>
          Sanitary item not found.
        </p>
      )}
    </section>
  );
};

export default SingleSanitaryItem;
