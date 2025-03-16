'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';

// Define the schema for sanitary items
const sanitarySchema = z.object({
  name: z.string().min(1, 'Item Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  quantity: z.number().min(1, 'Quantity must be greater than 0'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  brand: z.string().min(1, 'Brand is required'),
  availability: z.boolean(),
});

type SanitaryFormValues = z.infer<typeof sanitarySchema>;

interface AddSanitaryPopupProps {
  onClose: () => void;
  refreshSanitaryItems: () => void;
}

const AddSanitaryPopup: React.FC<AddSanitaryPopupProps> = ({
  onClose,
  refreshSanitaryItems,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SanitaryFormValues>({
    resolver: zodResolver(sanitarySchema),
  });

  // Handle form submission
  const handleAddSanitary = async (data: SanitaryFormValues) => {
    console.log('data', data);
    try {
      const response = await fetch(`/api/sanitary-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast({
          title: 'Item Added Successfully!',
          description: 'The sanitary item has been added.',
        });
        refreshSanitaryItems();
        onClose();
        reset();
      } else {
        showToast({
          title: 'Error Adding Item',
          description: 'There was an issue adding the sanitary item.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while adding the sanitary item. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Add New Sanitary Item
        </h2>
        <form onSubmit={handleSubmit(handleAddSanitary)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter item name'
              {...register('name')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter category'
              {...register('category')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.category && (
              <p className='text-red-500 text-sm'>{errors.category.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter price'
              {...register('price', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
              min={1}
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter quantity'
              {...register('quantity', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
              min={1}
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
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter brand'
              {...register('brand')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.brand && (
              <p className='text-red-500 text-sm'>{errors.brand.message}</p>
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
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSanitaryPopup;
