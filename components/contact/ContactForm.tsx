'use client';

import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useShowToast } from '../Toast';
import emailjs from '@emailjs/browser';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';

// Define validation schema with Zod
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .transform((val) => val.replace(/\D/g, '')) // remove all non-digits
    .transform((val) => {
      // If starts with 03 -> convert to 92 (international format)
      if (val.startsWith('03') && val.length === 11) {
        return '92' + val.slice(1);
      }
      return val;
    })
    .refine((val) => /^92\d{10}$/.test(val), {
      message: 'Enter a valid Pakistani phone number',
    }),

  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' }),
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
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email, // included as custom value
        reply_to: data.email,
        phone_number: data.phone.replace(/\s+/g, ''),
        message: data.message,
        to_email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
        time: new Date().toLocaleString(),
        subject: `New Inquiry from Rehan Sanitary - ${data.firstName} ${data.lastName}`,
        website_name: 'Rehan Sanitary',
      };

      console.log('data email ', data.email);
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
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              id='firstName'
              {...register('firstName')}
              placeholder='John'
            />
            {errors.firstName && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input id='lastName' {...register('lastName')} placeholder='Doe' />
            {errors.lastName && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            {...register('email')}
            placeholder='you@example.com'
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            id='phone'
            {...register('phone')}
            inputMode='tel'
            pattern='[\d\s+\-]*'
            placeholder='+92 321 6832148'
          />

          {errors.phone && (
            <p className='mt-1 text-sm text-red-600'>{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='message'>Your Inquiry</Label>
          <Textarea
            id='message'
            rows={4}
            {...register('message')}
            placeholder='Tell us about your business needs...'
          />
          {errors.message && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full flex items-center gap-2'
        >
          <MessageSquare className='w-5 h-5' />
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </Button>
      </form>
    </div>
  );
};
