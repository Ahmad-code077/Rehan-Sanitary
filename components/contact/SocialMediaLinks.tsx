import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const SocialMediaLinks = () => {
  return (
    <div className='bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-200'>
      <h3 className='text-xl font-semibold text-gray-900 mb-6'>
        Connect With Us
      </h3>
      <div className='flex gap-4'>
        <a
          href='https://facebook.com'
          className='bg-white p-3 rounded-lg shadow-xs hover:bg-amber-50 transition-colors'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Facebook className='w-5 h-5 text-amber-600' />
        </a>
        <a
          href='https://twitter.com'
          className='bg-white p-3 rounded-lg shadow-xs hover:bg-amber-50 transition-colors'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Twitter className='w-5 h-5 text-amber-600' />
        </a>
        <a
          href='https://instagram.com'
          className='bg-white p-3 rounded-lg shadow-xs hover:bg-amber-50 transition-colors'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Instagram className='w-5 h-5 text-amber-600' />
        </a>
        <a
          href='https://linkedin.com'
          className='bg-white p-3 rounded-lg shadow-xs hover:bg-amber-50 transition-colors'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Linkedin className='w-5 h-5 text-amber-600' />
        </a>
      </div>
    </div>
  );
};
