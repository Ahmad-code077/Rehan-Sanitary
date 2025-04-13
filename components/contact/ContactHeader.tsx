import { Briefcase } from 'lucide-react';

export const ContactHeader = () => {
  return (
    <div className='text-center mb-16'>
      <div className='flex items-center justify-center gap-3 mb-4'>
        <Briefcase className='w-8 h-8 text-primary' />
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
          Rehan Trader
        </h1>
      </div>
      <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
        Your trusted trading partner. Reach out to us for quality products and
        exceptional service.
      </p>
    </div>
  );
};
