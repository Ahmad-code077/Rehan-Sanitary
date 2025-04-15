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
    <section className='p-2 sm:p-8 my-12 rounded-3xl bg-card  border border-border/40 backdrop-blur-sm'>
      <div className='flex flex-col md:flex-row gap-12'>
        {/* Image Section */}

        <div className='flex-shrink-0 w-full md:w-1/2 space-y-4'>
          {/* Main Image */}
          <div className='relative group aspect-square'>
            <Image
              className='w-full h-full object-cover rounded-2xl shadow-xl 
                     border-2 border-border/50 transition-all duration-500 
                     group-hover:shadow-2xl group-hover:shadow-primary/20'
              src={item?.images[selectedImage] || '/rehan-sanitary.png'}
              alt={item?.name as string}
              priority
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              unoptimized={true}
            />
            <div
              className='absolute inset-0 rounded-2xl transition-opacity duration-500 
                        bg-gradient-to-t from-background/80 via-background/0 to-transparent 
                        opacity-0 group-hover:opacity-100'
            />
          </div>

          {/* Thumbnails - Only show if there are multiple images */}
          {item?.images && item.images.length > 1 && (
            <div className='grid grid-cols-4 gap-2 pt-4'>
              {item.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${item.name} view ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 25vw, 15vw'
                    unoptimized={true}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className='flex flex-col md:w-1/2 space-y-8'>
          <div className='space-y-4'>
            <h1
              className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent 
                       bg-clip-text text-transparent'
            >
              {item?.name}
            </h1>
            <h3 className='text-2xl font-medium text-muted-foreground'>
              {item?.category}
            </h3>
          </div>

          <div className='grid gap-6 p-6 rounded-xl bg-secondary/50 backdrop-blur-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Brand
                </p>
                <p className='text-lg font-semibold text-foreground'>
                  {item?.brand}
                </p>
              </div>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Price
                </p>
                <p className='text-lg font-semibold text-primary'>
                  PKR {item?.price.toLocaleString()}
                </p>
              </div>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Quantity
                </p>
                <p className='text-lg font-semibold text-foreground'>
                  {item?.quantity}
                </p>
              </div>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Status
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${
                            item?.availability
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                >
                  {item?.availability ? '● In Stock' : '● Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleSanitaryItem;
