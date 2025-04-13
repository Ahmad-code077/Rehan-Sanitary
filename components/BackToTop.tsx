'use client';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-lg transition-all duration-300 hover:bg-primary/80 focus:outline-none ${
        showButton
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label='Back to top'
    >
      <ArrowUp className='text-lg' />
    </button>
  );
};

export default BackToTop;
