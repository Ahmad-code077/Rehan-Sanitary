'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';
import ImageUploader from '@/components/CloudinaryUpload';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageUpload = (urls: string[]) => {
    setUploadedImageUrls((prevImages) => {
      const updatedImages = [...prevImages, ...urls];
      setValue('images', updatedImages as [string, ...string[]]); // Ensure at least one element
      return updatedImages;
    });
  };
  // Handle form submission
  const handleAddSanitary = async (data: SanitaryFormValues) => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log('image url 😂😂😂😂 ', uploadedImageUrls);
  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImageUrls((prevImages) => {
      const updatedImages = prevImages.filter(
        (_, index) => index !== indexToRemove
      );
      setValue('images', updatedImages as [string, ...string[]]);
      return updatedImages;
    });

    if (uploadedImageUrls.length <= 1) {
      showToast({
        title: 'Image Required',
        description: 'At least one image is required for the product.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='p-6 bg-white rounded-lg shadow-md sm:w-[400px] w-[90%] max-h-[90vh] overflow-y-auto scrollbar-hide'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Add New Sanitary Item
        </h2>
        <form onSubmit={handleSubmit(handleAddSanitary)} className='space-y-4'>
          {/* Name Input */}
          <div className='space-y-2'>
            <Label htmlFor='name'>Item Name</Label>
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
            <Label htmlFor='category'>Category</Label>
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
            <Label htmlFor='price'>Price (PKR)</Label>
            <Input
              id='price'
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

          {/* Quantity Input */}
          <div className='space-y-2'>
            <Label htmlFor='quantity'>Quantity (Units)</Label>
            <Input
              id='quantity'
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

          {/* Brand Input */}
          <div className='space-y-2'>
            <Label htmlFor='brand'>Brand Name</Label>
            <Input
              id='brand'
              placeholder='Enter brand'
              {...register('brand')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.brand && (
              <p className='text-red-500 text-sm'>{errors.brand.message}</p>
            )}
          </div>

          {/* Availability Checkbox */}
          <div className='space-y-2'>
            <Label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                {...register('availability')}
                className='w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary'
              />
              <span>Item is available in stock</span>
            </Label>
          </div>

          {/* Image Upload Section */}
          <div className='space-y-2'>
            <Label>Product Images</Label>
            <ImageUploader onUpload={handleImageUpload} />
            <input
              type='hidden'
              {...register('images')}
              value={JSON.stringify(uploadedImageUrls)}
            />
            {errors.images && (
              <p className='text-red-500 text-sm'>{errors.images.message}</p>
            )}
          </div>

          {/* Preview Uploaded Images */}
          {uploadedImageUrls.length > 0 && (
            <div className='space-y-2'>
              <Label>Uploaded Images</Label>
              <div className='grid grid-cols-3 gap-2'>
                {uploadedImageUrls.map((url, index) => (
                  <div key={index} className='relative aspect-square group'>
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className='object-cover w-full h-full rounded-lg'
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 
                         flex items-center justify-center shadow-md 
                         transition-opacity opacity-0 group-hover:opacity-100'
                      aria-label={`Remove image ${index + 1}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex justify-end space-x-4 pt-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400'
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-primary text-white hover:bg-primary/90'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Adding...
                </>
              ) : (
                'Add Item'
              )}{' '}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSanitaryPopup;
