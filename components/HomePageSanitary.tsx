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
  const [filteredItems, setFilteredItems] = useState<SanitaryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSanitaryItems = async () => {
      try {
        const response = await axios.get(`/api/sanitary-items`);
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        setError(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSanitaryItems();
  }, []);

  console.log('data from the request', items);
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.brand.toString().includes(lowerCaseSearchTerm)
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

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
        {filteredItems.length > 0 ? (
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredItems.map((item) => (
              <SanitaryItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-300'>
            No sanitary items match your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default HomePageSanitary;
