'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SanitaryList from './SanitaryList'; // Updated component name
import AddSanitary from './AddSanitary'; // Updated component name
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import { SanitaryItem } from '@prisma/client';

const AdminPage = () => {
  const router = useRouter();
  const [sanitaryItems, setSanitaryItems] = useState<SanitaryItem[]>([]); // Updated state variable
  // const [filteredSanitaryItems, setFilteredSanitaryItems] = useState<
  // SanitaryItem[]
  // >([]); // Updated state variable
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.email !== 'admin@gmail.com') {
      router.push('/'); // If not admin, redirect to home
    } else {
      fetchSanitaryItems(); // Updated function name
    }
  }, [router]);

  // Fetch sanitary items
  const fetchSanitaryItems = async () => {
    try {
      const response = await fetch(`/api/sanitary-items`); // Updated API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch sanitary items.');
      }
      const data: SanitaryItem[] = await response.json();
      setSanitaryItems(data?.items);
      // setFilteredSanitaryItems(data); // Initialize filtered sanitary items
    } catch (error) {
      console.error('Error fetching sanitary items:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <h2 className='text-2xl font-bold text-foreground '>
          All Sanitary Items
        </h2>{' '}
        {/* Updated title */}
        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='hover:bg-secondary/90 transition-all duration-300 hover:scale-105 size-16 rounded-full text-white text-5xl'
        >
          +
        </Button>
      </div>
      {/* Search Bar Section */}
      <div className='flex justify-end'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {/* Sanitary Items List Section */}
      <div>
        {sanitaryItems.length > 0 ? (
          <SanitaryList
            sanitaryItems={sanitaryItems}
            refreshSanitaryItems={fetchSanitaryItems} // Updated prop name
          />
        ) : (
          <p className='text-center text-gray-500'>
            No sanitary items match your search. {/* Updated message */}
          </p>
        )}
      </div>
      {/* Add Sanitary Item Popup */}
      {showAddPopup && (
        <AddSanitary
          onClose={() => setShowAddPopup(false)}
          refreshSanitaryItems={fetchSanitaryItems} // Updated prop name
        />
      )}
    </div>
  );
};

export default AdminPage;
