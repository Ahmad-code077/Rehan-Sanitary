'use client';

import React from 'react';
import { Facebook, Instagram, Github, MessageCircleCode } from 'lucide-react';
import Link from 'next/link';

const phoneNumber = '923203236515';
const footerData = {
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
  ],
  socialLinks: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/18hca6yUVd/',
      icon: <Facebook />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/rehantraders708',
      icon: <Instagram />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Ahmad-code077',
      icon: <Github />,
    },
    {
      name: 'Whatsapp',
      url: `https://wa.me/${phoneNumber}`,
      icon: <MessageCircleCode />,
    },
  ],
  contactDetails: [
    {
      label: 'Email',
      value: 'rehanTraders708@gmail.com',
      href: 'mailto:rehanTraders708@gmail.com',
    },
    { label: 'Phone', value: '+92-320-3236515' },
    { label: 'Address', value: 'Bahawalpur Pakistan' },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className='bg-background text-foreground py-12 px-6 sm:px-16 border-t border-border mt-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Footer Top Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-8'>
          {/* Navigation Links */}
          <div>
            <h3 className='text-2xl font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-4'>
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className='hover:text-primary'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className='text-2xl font-semibold mb-4'>Follow Us</h3>
            <div className='flex gap-8'>
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className='text-2xl text-primary hover:scale-110 transition-scale duration-300'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className='text-2xl font-semibold mb-4'>Contact Us</h3>
            {footerData.contactDetails.map((contact, index) => (
              <p key={index} className='text-lg'>
                {contact.label}:{' '}
                {contact.href ? (
                  <a
                    href={contact.href}
                    className='text-primary hover:text-muted-foreground'
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span className='text-primary'>{contact.value}</span>
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className='border-t border-border pt-6'>
          <p className='text-sm text-muted-foreground text-center'>
            &copy; {new Date().getFullYear()} Rehan Traders. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
