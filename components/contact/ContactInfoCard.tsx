import { Phone, Mail, MapPin, Headphones } from 'lucide-react';

export const ContactInfoCard = () => {
  return (
    <div className='bg-amber-50 rounded-xl p-8 shadow-sm border border-amber-100'>
      <div className='flex items-start gap-4 mb-6'>
        <div className='bg-amber-100 p-3 rounded-lg'>
          <Headphones className='w-6 h-6 text-amber-600' />
        </div>
        <div>
          <h3 className='text-xl font-semibold text-gray-900'>
            Business Inquiries
          </h3>
          <p className='text-gray-600'>
            Contact us for product details, pricing, and partnerships.
          </p>
        </div>
      </div>

      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <div className='bg-white p-2 rounded-lg shadow-xs'>
            <Phone className='w-5 h-5 text-amber-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Phone Number</p>
            <p className='font-medium text-gray-900'>+92-320-3236515</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='bg-white p-2 rounded-lg shadow-xs'>
            <Mail className='w-5 h-5 text-amber-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Email Address</p>
            <p className='font-medium text-gray-900'>rehanakbar737@gmail.com</p>
          </div>
        </div>

        <div className='flex items-start gap-4'>
          <div className='bg-white p-2 rounded-lg shadow-xs'>
            <MapPin className='w-5 h-5 text-amber-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Our Location</p>
            <p className='font-medium text-gray-900'>Bahawalpur, Pakistan</p>
          </div>
        </div>
      </div>
    </div>
  );
};
