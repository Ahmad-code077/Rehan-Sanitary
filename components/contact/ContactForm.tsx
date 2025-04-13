'use client';

import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useShowToast } from '../Toast';
import emailjs from '@emailjs/browser';

// Define validation schema with Zod
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const showToast = useShowToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone_number: data.phone.replace(/\s+/g, ''), // Remove any spaces
        message: data.message,
        to_email: 'ahmadeveloper077@gmail.com',
        time: new Date().toLocaleString(),
        subject: `New Inquiry from Rehan Sanitary - ${data.firstName} ${data.lastName}`,
        website_name: 'Rehan Sanitary',
        reply_to: data.email,
      };
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (response.status === 200) {
        showToast({
          title: 'Message Sent Successfully',
          description:
            'Thank you for contacting us. We will get back to you soon!',
        });
      }
      reset();
    } catch (error) {
      console.error('Submission error:', error);

      // Show error toast
      showToast({
        title: 'Error Sending Message',
        description: 'There was an issue while sending your message',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-200'>
      <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
        Business Inquiry Form
      </h3>
      <p className='text-gray-600 mb-8'>
        Send us your questions and we&apos;ll respond within 24 hours.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <div>
            <label
              htmlFor='firstName'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              First Name
            </label>
            <input
              id='firstName'
              {...register('firstName')}
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
              placeholder='John'
            />
            {errors.firstName && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='lastName'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Last Name
            </label>
            <input
              id='lastName'
              {...register('lastName')}
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
              placeholder='Doe'
            />
            {errors.lastName && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            {...register('email')}
            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
            placeholder='you@example.com'
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Phone Number
          </label>
          <input
            id='phone'
            {...register('phone')}
            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
            placeholder='+92 300 1234567'
          />
          {errors.phone && (
            <p className='mt-1 text-sm text-red-600'>{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Your Inquiry
          </label>
          <textarea
            id='message'
            rows={4}
            {...register('message')}
            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
            placeholder='Tell us about your business needs...'
          ></textarea>
          {errors.message && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <MessageSquare className='w-5 h-5' />
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </div>
      </form>
    </div>
  );
};
