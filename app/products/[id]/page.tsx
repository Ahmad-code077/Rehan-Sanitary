'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { SanitaryItem } from '@prisma/client';
import Loader from '@/components/Loader';

const SingleSanitaryItem: React.FC = () => {
  const [item, setItem] = useState<SanitaryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchSanitaryItem = async () => {
      try {
        const response = await fetch(`/api/sanitary-items/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sanitary item');
        }
        const data: SanitaryItem = await response.json();
        console.log(data);
        if (data) {
          setItem(data);
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
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <p className='text-center text-red-600 dark:text-red-400 text-2xl sm:text-5xl font-medium shadow-lg p-6 rounded-lg h-screen flex items-center justify-center'>
        Error: {error}
      </p>
    );

  return (
    <section className='max-w-7xl mx-auto p-4 lg:p-8 '>
      <div
        className='bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl 
                    rounded-[2.5rem] border border-border/40 shadow-md hover:shadow-lg 
                    transition-all duration-500 overflow-hidden'
      >
        <div className='flex flex-col lg:flex-row gap-12 p-8 lg:p-12'>
          {/* Image Section */}
          <div className='flex-shrink-0 w-full lg:w-1/2 space-y-6'>
            {/* Main Image Container */}
            <div
              className='relative aspect-square rounded-2xl overflow-hidden group 
                          transform transition-all duration-700 hover:scale-[1.02]'
            >
              <Image
                className='w-full h-full object-cover transition-transform duration-700 
                         group-hover:scale-110'
                src={item?.images[selectedImage] || '/rehan-sanitary.png'}
                alt={item?.name as string}
                priority
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                unoptimized={true}
              />
              <div
                className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent 
                           to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                           duration-500'
              />
            </div>

            {/* Thumbnails */}
            {item?.images && item.images.length > 1 && (
              <div className='grid grid-cols-4 gap-4'>
                {item.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden 
                              transform transition-all duration-300 
                            `}
                  >
                    <Image
                      src={img}
                      alt={`${item.name} view ${index + 1}`}
                      fill
                      className='object-cover hover:scale-110 transition-transform duration-500'
                      sizes='(max-width: 768px) 25vw, 15vw'
                      unoptimized={true}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className='lg:w-1/2 space-y-10'>
            <div className='space-y-4'>
              <h1 className='text-4xl lg:text-6xl font-bold tracking-tight'>
                <span
                  className=' 
                              text-black/80   
                             hover:scale-[1.02] transition-transform duration-300'
                >
                  {item?.name}
                </span>
              </h1>
              <h3 className='text-2xl font-medium text-muted-foreground/80'>
                {item?.category}
              </h3>
            </div>

            <div
              className='space-y-8 p-8 rounded-2xl bg-secondary/20 backdrop-blur-lg 
                          border border-border/50 hover:border-border/80 transition-colors 
                          duration-300'
            >
              <div className='grid grid-cols-2 gap-8'>
                {[
                  { label: 'Brand', value: item?.brand },
                  {
                    label: 'Price',
                    value: `PKR ${item?.price.toLocaleString()}`,
                    isPrimary: true,
                  },
                  { label: 'Quantity', value: item?.quantity },
                  {
                    label: 'Status',
                    value: item?.availability ? '● In Stock' : '● Out of Stock',
                    isStatus: true,
                    isAvailable: item?.availability,
                  },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className='transform transition-all duration-300 hover:translate-y-[-2px]'
                  >
                    <p className='text-sm font-medium text-muted-foreground mb-2'>
                      {detail.label}
                    </p>
                    {detail.isStatus ? (
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                                ${
                                  detail.isAvailable
                                    ? 'bg-green-100/20 text-green-500 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-red-100/20 text-red-500 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                      >
                        {detail.value}
                      </span>
                    ) : (
                      <p
                        className={`text-lg font-semibold ${
                          detail.isPrimary
                            ? 'text-primary text-xl'
                            : 'text-foreground'
                        }`}
                      >
                        {detail.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleSanitaryItem;
