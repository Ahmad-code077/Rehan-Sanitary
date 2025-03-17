'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import SearchBar from './SearchBar';
import SanitaryItemCard from './SanitaryItemCard';
import { debounce } from '@/utils/debounce';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { SanitaryItem } from '@prisma/client';
import { FetchParams } from '@/lib/types/siteTypes';

const ProductPageSanitary: React.FC = () => {
  const [items, setItems] = useState<SanitaryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'priceAsc' | 'priceDesc'>(
    'latest'
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSanitaryItems = async () => {
    setLoading(true);
    try {
      const params: FetchParams = {
        page,
        limit: 10,
        search: searchTerm,
        availability,
        sortBy,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      // Only include brand and category if they are not 'all'
      if (brand !== 'all') {
        params.brand = brand;
      }
      if (category !== 'all') {
        params.category = category;
      }

      const response = await axios.get('/api/sanitary-items', { params });
      setItems((prev) =>
        page === 1 ? response.data.items : [...prev, ...response.data.items]
      );
      setHasMore(response.data.items.length > 0);
    } catch (err) {
      console.log((err as AxiosError<{ error: string }>).message);
    } finally {
      setLoading(false);
    }
  };
  const debouncedFetch = useCallback(debounce(fetchSanitaryItems, 500), [
    searchTerm,
    category,
    brand,
    availability,
    sortBy,
    priceRange,
    page,
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setBrand('');
    setAvailability(null);
    setSortBy('latest');
    setPriceRange([0, 1000000]);
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
    debouncedFetch();
  }, [searchTerm, category, brand, availability, sortBy, priceRange]);

  useEffect(() => {
    debouncedFetch();
  }, [page]);

  return (
    <section className='text-white py-12 px-4'>
      <h2 className='text-4xl font-bold text-center mb-8'>
        Explore Our Sanitary Items
      </h2>
      <div className='mb-8 flex flex-wrap gap-4 justify-center'>
        <button
          onClick={resetFilters}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'
        >
          Reset Filters
        </button>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder='All Categories' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
            <SelectItem value='Faucets'>Faucets</SelectItem>
            <SelectItem value='Sinks'>Sinks</SelectItem>
          </SelectContent>
        </Select>

        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger>
            <SelectValue placeholder='All Brands' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Brands</SelectItem>
            <SelectItem value='Kohler'>Kohler</SelectItem>
            <SelectItem value='Toto'>Toto</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={availability === null ? 'null' : availability.toString()}
          onValueChange={(value) =>
            setAvailability(value === 'null' ? null : value === 'true')
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Availability' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='null'>All</SelectItem>
            <SelectItem value='true'>Available</SelectItem>
            <SelectItem value='false'>Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) =>
            setSortBy(value as 'latest' | 'priceAsc' | 'priceDesc')
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='latest'>Latest</SelectItem>
            <SelectItem value='priceAsc'>Price: Low to High</SelectItem>
            <SelectItem value='priceDesc'>Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && items.length === 0 ? (
        <p className='text-center text-xl text-gray-600'>
          Loading sanitary items...
        </p>
      ) : items.length > 0 ? (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((item) => (
            <SanitaryItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-300'>
          No items match your filters.
        </p>
      )}

      {hasMore && !loading && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className='bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition-colors'
        >
          Load More
        </button>
      )}
    </section>
  );
};

export default ProductPageSanitary;
