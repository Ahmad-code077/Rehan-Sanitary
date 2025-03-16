'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';

import { SanitaryItem } from './SanitaryList'; // Assuming SanitaryList contains the sanitary item data
import { useShowToast } from '@/components/Toast';

// Validation schema with preprocessing for numeric fields
const sanitarySchema = z.object({
  name: z.string().min(1, 'Item Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(1, 'Price is required'), // Coerce strings to numbers
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  brand: z.string().min(1, 'Brand is required'),
  availability: z.boolean(),
});

type SanitaryFormValues = z.infer<typeof sanitarySchema>;

interface UpdateSanitaryPopupProps {
  item: SanitaryItem;
  onClose: () => void;
  refreshSanitaryItems: () => void;
}

const UpdateSanitaryPopup: React.FC<UpdateSanitaryPopupProps> = ({
  item,
  onClose,
  refreshSanitaryItems,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SanitaryFormValues>({
    resolver: zodResolver(sanitarySchema),
    defaultValues: {
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      brand: item.brand,
      availability: item.availability,
    },
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Handle form submission
  const handleUpdateSanitary = async (data: SanitaryFormValues) => {
    try {
      const response = await fetch(`${apiUrl}/api/sanitary-items/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast({
          title: 'Item Updated Successfully!',
          description: 'The sanitary item details have been updated.',
        });
        refreshSanitaryItems();
        onClose();
      } else {
        showToast({
          title: 'Error Updating Item',
          description: 'There was an issue updating the sanitary item.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while updating the sanitary item. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Update Sanitary Item
        </h2>
        <form
          onSubmit={handleSubmit(handleUpdateSanitary)}
          className='space-y-4'
        >
          <div>
            <Input
              placeholder='Enter item name'
              {...register('name')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>
                {String(errors.name.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter category'
              {...register('category')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.category && (
              <p className='text-red-500 text-sm'>
                {String(errors.category.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter price'
              {...register('price')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('price', parseFloat(e.target.value) || 0)
              }
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter quantity'
              {...register('quantity')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('quantity', parseInt(e.target.value, 10) || 0)
              }
            />
            {errors.quantity && (
              <p className='text-red-500 text-sm'>{errors.quantity.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>
                {String(errors.image.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter brand'
              {...register('brand')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.brand && (
              <p className='text-red-500 text-sm'>
                {String(errors.brand.message)}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-600'>Availability</label>
            <input
              type='checkbox'
              {...register('availability')}
              className='mt-2'
            />
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-secondary text-white hover:bg-secondary/90'
            >
              Update Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSanitaryPopup;
