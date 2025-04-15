'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

import { useShowToast } from '@/components/Toast';
import { SanitaryItem } from '@prisma/client';
import CloudinaryUpload from '@/components/CloudinaryUpload';
import { Loader2 } from 'lucide-react';

// Validation schema
const sanitarySchema = z.object({
  name: z.string().min(1, 'Item Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(1, 'Price is required'),
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  images: z.array(z.string()),
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
  const [imageUrls, setImageUrls] = useState<string[]>(item.images || []);

  const [isLoading, setIsLoading] = useState(false);

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
      images: item.images,
      brand: item.brand,
      availability: item.availability,
    },
  });

  // Handle new image uploads
  const handleUpload = (urls: string[]) => {
    const updatedImages = [...imageUrls, ...urls];

    setImageUrls(updatedImages);
    setValue(
      'images',
      updatedImages.length > 0
        ? ([updatedImages[0], ...updatedImages.slice(1)] as [
            string,
            ...string[]
          ])
        : []
    );
  };

  // Handle image removal
  const removeImage = (url: string) => {
    const updatedImages = imageUrls.filter((img) => img !== url);

    setImageUrls(updatedImages);
    setValue(
      'images',
      updatedImages.length > 0
        ? ([updatedImages[0], ...updatedImages.slice(1)] as [
            string,
            ...string[]
          ])
        : []
    );

    if (updatedImages.length > 0) {
      setValue('images', updatedImages as [string, ...string[]]);
    } else {
      showToast({
        title: 'At least one image is required!',
        description: 'You must upload at least one image.',
        variant: 'destructive',
      });
    }
  };

  // Handle form submission
  const handleUpdateSanitary = async (data: SanitaryFormValues) => {
    console.log('image urls');
    if (imageUrls.length <= 0) {
      showToast({
        title: 'At least one image is required!',
        description: 'You must upload at least one image.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`/api/sanitary-items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, images: imageUrls }),
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
        description: `An error occurred while updating the item. ${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className=' p-6 bg-white rounded-lg shadow-md sm:w-[400px] w-[90%] max-h-[90vh] overflow-y-auto scrollbar-hide'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Update Sanitary Item
        </h2>
        <form
          onSubmit={handleSubmit(handleUpdateSanitary)}
          className='space-y-4'
        >
          {/* Name Input */}
          <div className='space-y-2'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Item Name
            </label>
            <Input
              id='name'
              placeholder='Enter item name'
              {...register('name')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          {/* Category Input */}
          <div className='space-y-2'>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700'
            >
              Category
            </label>
            <Input
              id='category'
              placeholder='Enter category'
              {...register('category')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.category && (
              <p className='text-red-500 text-sm'>{errors.category.message}</p>
            )}
          </div>

          {/* Price Input */}
          <div className='space-y-2'>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700'
            >
              Price (PKR)
            </label>
            <Input
              id='price'
              placeholder='Enter price'
              {...register('price')}
              className='bg-gray-100 text-gray-700'
              type='number'
              onChange={(e) => setValue('price', Number(e.target.value) || 0)}
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>

          {/* Quantity Input */}
          <div className='space-y-2'>
            <label
              htmlFor='quantity'
              className='block text-sm font-medium text-gray-700'
            >
              Quantity (Units)
            </label>
            <Input
              id='quantity'
              placeholder='Enter quantity'
              {...register('quantity')}
              className='bg-gray-100 text-gray-700'
              type='number'
              onChange={(e) =>
                setValue('quantity', Number(e.target.value) || 0)
              }
            />
            {errors.quantity && (
              <p className='text-red-500 text-sm'>{errors.quantity.message}</p>
            )}
          </div>

          {/* Brand Input */}
          <div className='space-y-2'>
            <label
              htmlFor='brand'
              className='block text-sm font-medium text-gray-700'
            >
              Brand Name
            </label>
            <Input
              id='brand'
              placeholder='Enter brand name'
              {...register('brand')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.brand && (
              <p className='text-red-500 text-sm'>{errors.brand.message}</p>
            )}
          </div>

          {/* Availability Checkbox */}
          <div className='space-y-2'>
            <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
              <input
                type='checkbox'
                {...register('availability')}
                className='w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary'
              />
              <span>Item is available in stock</span>
            </label>
          </div>

          {/* Display Existing Images with Remove Option */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Current Images
            </label>
            <div className='flex flex-wrap gap-2'>
              {imageUrls.map((url, index) => (
                <div key={index} className='relative w-24 h-24'>
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className='w-full h-full rounded-lg object-cover'
                  />
                  <button
                    type='button'
                    className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm'
                    onClick={() => removeImage(url)}
                    aria-label={`Remove image ${index + 1}`}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Button (Cloudinary) */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Upload New Images
            </label>
            <CloudinaryUpload onUpload={handleUpload} />
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end space-x-4 pt-4'>
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Updating...
                </>
              ) : (
                'Update Item'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSanitaryPopup;
