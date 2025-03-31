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
import { Button } from './ui/button';

const ProductPageSanitary: React.FC = () => {
  const [items, setItems] = useState<SanitaryItem[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allBrands, setAllBrands] = useState<string[]>([]);
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

  // Fetch all possible filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get('/api/sanitary-items/filters');
        setAllCategories(response.data.categories);
        setAllBrands(response.data.brands);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };
    fetchFilterOptions();
  }, []);

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
      setHasMore(response.data.hasMore);
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
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
          Explore Our Sanitary Collection
        </h2>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
          Discover high-quality sanitary items for your home
        </p>
      </div>

      {/* Filters Section */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 sm:p-6 mb-8'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Button
            onClick={resetFilters}
            variant='destructive'
            className='w-full sm:w-auto rounded'
          >
            Reset Filters
          </Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='All Categories' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Categories</SelectItem>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='All Brands' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Brands</SelectItem>
              {allBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={availability === null ? 'null' : availability.toString()}
            onValueChange={(value) =>
              setAvailability(value === 'null' ? null : value === 'true')
            }
          >
            <SelectTrigger className='w-full'>
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
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='latest'>Latest</SelectItem>
              <SelectItem value='priceAsc'>Price: Low to High</SelectItem>
              <SelectItem value='priceDesc'>Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {loading && items.length === 0 ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      ) : items.length > 0 ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {items.map((item) => (
              <SanitaryItemCard key={item.id} item={item} />
            ))}
          </div>
          {hasMore && (
            <div className='mt-8 text-center'>
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className='text-center py-12'>
          <div className='text-gray-500 dark:text-gray-400 text-lg'>
            No items match your filters.
          </div>
          <Button onClick={resetFilters} className='mt-4 rounded'>
            Reset Filters
          </Button>
        </div>
      )}

      {loading && items.length > 0 && (
        <div className='text-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 inline-block'></div>
        </div>
      )}
    </section>
  );
};

export default ProductPageSanitary;
