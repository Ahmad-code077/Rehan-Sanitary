'use client';

import React from 'react';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactInfoCard } from '@/components/contact/ContactInfoCard';
import { SocialMediaLinks } from '@/components/contact/SocialMediaLinks';
import { ContactForm } from '@/components/contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <section className='bg-white py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ContactHeader />

        <div className='grid md:grid-cols-2 gap-12'>
          <div className='space-y-8'>
            <ContactInfoCard />
            <SocialMediaLinks />
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
