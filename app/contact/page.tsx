import React from 'react';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactInfoCard } from '@/components/contact/ContactInfoCard';
import { SocialMediaLinks } from '@/components/contact/SocialMediaLinks';
import { ContactForm } from '@/components/contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <section className=' bg-background py-8 sm:py-12 lg:py-16'>
      <div className=''>
        {/* Header with responsive padding */}
        <div className='mb-8 sm:mb-12 lg:mb-16'>
          <ContactHeader />
        </div>

        {/* Responsive grid container */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12'>
          {/* Left column - Info cards */}
          <div className='flex flex-col gap-6 sm:gap-8'>
            <div className='w-full'>
              <ContactInfoCard />
            </div>
            <div className='w-full'>
              <SocialMediaLinks />
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className='w-full'>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
