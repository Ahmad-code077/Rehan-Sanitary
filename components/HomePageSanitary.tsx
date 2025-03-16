'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import SanitaryItemCard from './SanitaryItemCard';
import SearchBar from './SearchBar'; // Import SearchBar
import { SanitaryItem } from '@/app/admin/SanitaryList';

interface ErrorResponse {
  error?: string;
}

const HomePageSanitary: React.FC = () => {
  const [items, setItems] = useState<SanitaryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchSanitaryItems = async () => {
      try {
        const response = await axios.get(
          `/api/sanitary-items?page=${page}&limit=10&search=${searchTerm}`
        );
        if (page === 1) {
          setItems(response.data.items); // Replace items on new search
        } else {
          setItems((prev) => [...prev, ...response.data.items]); // Append new data
        }
        setHasMore(response.data.items.length > 0);
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        setError(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSanitaryItems();
  }, []);

  // useEffect(() => {
  //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //   // const filtered = items.filter(
  //   //   (item) =>
  //   //     item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
  //   //     item.category.toLowerCase().includes(lowerCaseSearchTerm) ||
  //   //     item.brand.toString().includes(lowerCaseSearchTerm)
  //   // );
  // }, [searchTerm, items]);

  if (loading)
    return (
      <p className='text-center text-xl text-gray-600'>
        Loading sanitary items...
      </p>
    );
  if (error) return <p className='text-center text-xl text-red-600'>{error}</p>;

  return (
    <section className='text-white py-12 px-4'>
      {/* Main Heading */}
      <h2 className='text-4xl font-bold text-center mb-8'>
        Explore Our Sanitary Items
      </h2>

      {/* Search Bar */}
      <div className='mb-8 flex items-center justify-center'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Sanitary Items List */}
      <div>
        {items.length > 0 ? (
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {items.map((item) => (
              <SanitaryItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-300'>
            No sanitary items match your search.
          </p>
        )}
      </div>

      {hasMore && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
          className='bg-blue-500 text-white px-4 py-2 mt-4'
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </section>
  );
};

export default HomePageSanitary;
