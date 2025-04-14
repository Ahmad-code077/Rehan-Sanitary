'use client';

import { useShowToast } from '@/components/Toast';
import { useState } from 'react';

// Define types for the props of DeleteSanitaryPopup
interface DeleteSanitaryPopupProps {
  itemId: string;
  onClose: () => void;
  refreshSanitaryItems: () => void;
}

const DeleteSanitaryPopup: React.FC<DeleteSanitaryPopupProps> = ({
  itemId,
  onClose,
  refreshSanitaryItems,
}) => {
  const showToast = useShowToast();

  const handleDeleteSanitary = async () => {
    try {
      const response = await fetch(`/api/sanitary-items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showToast({
          title: 'Item Deleted Successfully!',
          description: 'The sanitary item has been removed.',
        });
        refreshSanitaryItems();
        onClose(); // Close the popup after deleting
      } else {
        showToast({
          title: 'Error Deleting Item',
          description: 'There was an issue deleting the sanitary item.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
      showToast({
        title: 'Error',
        description: `An error occurred while deleting the sanitary item. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-xl font-bold text-primary mb-4'>Are you sure?</h2>
        <p className='text-gray-600 mb-6'>
          Do you really want to delete this sanitary item? This action cannot be
          undone.
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-black transition duration-200'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteSanitary}
            className='px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

interface DeleteSanitaryButtonProps {
  itemId: string;
  refreshSanitaryItems: () => void;
}

const DeleteSanitaryButton: React.FC<DeleteSanitaryButtonProps> = ({
  itemId,
  refreshSanitaryItems,
}) => {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const handleOpenDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDeletePopup}
        className='px-4 py-2 bg-[#E11D48] text-white rounded-lg hover:bg-[#BE123C] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition duration-200'
      >
        Delete
      </button>

      {isDeletePopupVisible && (
        <DeleteSanitaryPopup
          itemId={itemId.toString()}
          onClose={handleCloseDeletePopup}
          refreshSanitaryItems={refreshSanitaryItems}
        />
      )}
    </>
  );
};

export default DeleteSanitaryButton;
