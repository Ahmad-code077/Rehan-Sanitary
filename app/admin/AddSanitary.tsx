'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';
import ImageUploader from '@/components/CloudinaryUpload';

// Define the schema for sanitary items
const sanitarySchema = z.object({
  name: z.string().min(1, 'Item Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  quantity: z.number().min(1, 'Quantity must be greater than 0'),
  images: z.array(z.string()).nonempty('At least one image is required'),
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
    setValue,
  } = useForm<SanitaryFormValues>({
    resolver: zodResolver(sanitarySchema),
    defaultValues: {
      images: [],
    },
  });
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const handleImageUpload = (urls: string[]) => {
    setUploadedImageUrls((prevImages) => {
      const updatedImages = [...prevImages, ...urls];
      setValue('images', updatedImages as [string, ...string[]]); // Ensure at least one element
      return updatedImages;
    });
  };
  // Handle form submission
  const handleAddSanitary = async (data: SanitaryFormValues) => {
    try {
      const response = await fetch(`/api/sanitary-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          images: uploadedImageUrls, // Send images as an array
        }),
      });

      if (response.ok) {
        showToast({
          title: 'Item Added Successfully!',
          description: 'The sanitary item has been added.',
        });
        refreshSanitaryItems();
        onClose();
        reset();
        setUploadedImageUrls([]);
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
  console.log('image url 😂😂😂😂 ', uploadedImageUrls);

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
          {/* <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
          </div> */}
          {/* Image Upload Component */}
          <ImageUploader onUpload={handleImageUpload} />

          {/* Hidden input to store image URLs */}
          <input
            type='hidden'
            {...register('images')}
            value={JSON.stringify(uploadedImageUrls)} // Store as a JSON string
          />
          {errors.images && (
            <p className='text-red-500 text-sm'>{errors.images.message}</p>
          )}
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
              className='bg-primary text-white hover:bg-primary/90'
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
