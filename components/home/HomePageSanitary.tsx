'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SanitaryItem } from '@prisma/client';
import SanitaryItemCard from '../SanitaryItemCard';
import { Button } from '../ui/button';
import Loader from '../Loader';

export default function HomePageSanitary() {
  const [items, setItems] = useState<SanitaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // ❗️ Add error state

  const router = useRouter();

  useEffect(() => {
    const fetchSanitaryItems = async () => {
      try {
        const response = await axios.get('/api/sanitary-items', {
          params: { limit: 3 }, // Fetch only 3 items
        });
        setItems(response.data.items);
        setError(null); // ✅ clear any previous errors if successful
      } catch (error) {
        console.error('Error fetching sanitary items:', error);
        setError('Failed to fetch sanitary items.');
      } finally {
        setLoading(false);
      }
    };

    fetchSanitaryItems();
  }, []);

  return (
    <section className='py-12 px-4 '>
      <h2 className='text-4xl font-bold text-center mb-8 font-nunito'>
        Featured Sanitary Items
      </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className='text-center text-red-500 font-semibold'>{error}</p>
      ) : items.length > 0 ? (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((item) => (
            <SanitaryItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-300'>
          No sanitary items available.
        </p>
      )}
      {!loading && !error && (
        <div className='flex justify-center mt-8'>
          <Button
            onClick={() => router.push('/products')}
            className=' text-white px-6 py-3 rounded text-lg'
          >
            See More
          </Button>
        </div>
      )}
    </section>
  );
}
