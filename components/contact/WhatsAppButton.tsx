'use client';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [showButton, setShowButton] = useState(false);
  const phoneNumber = '923203236515'; // Format: country code + number without '+'

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi,%20I%20am%20interested%20in%20your%20products`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className={`fixed bottom-8 right-8 z-50 p-3 bg-[#25D366] text-white rounded-full shadow-lg 
        transition-all duration-300 hover:bg-[#128C7E] focus:outline-none 
        hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] scale-100 hover:scale-110
        ${
          showButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      aria-label='Chat on WhatsApp'
    >
      <div className='relative'>
        <MessageCircle className='w-6 h-6' />
        <span className='absolute -top-1 -right-1 flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-white/30'></span>
        </span>
      </div>
    </button>
  );
};

export default WhatsAppButton;
