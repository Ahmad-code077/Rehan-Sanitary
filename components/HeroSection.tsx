import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='relative flex flex-col lg:flex-row items-center h-auto mt-12'>
      {/* Left Side - Text Content */}
      <div className='flex-1 flex items-center justify-center py-12 lg:py-0 px-6 sm:px-16 bg-white lg:h-full'>
        <div className='max-w-2xl text-center lg:text-left'>
          <h1 className='text-3xl sm:text-5xl font-extrabold font-nunito text-gray-900 mb-6'>
            Elevate Your Space with{' '}
            <span className='text-primary'>Rehan. Traders</span>
          </h1>
          <p className='text-lg sm:text-xl text-gray-700'>
            Discover a premium range of sanitary fittings, stylish bathroom
            accessories, and high-quality fixtures. From elegant washbasins to
            modern faucets, we bring innovation and luxury to your home.
          </p>
        </div>
      </div>

      {/* Right Side - Image Container */}
      <div
        className='flex-1 relative hidden lg:block w-full lg:h-full'
        aria-hidden='true'
      >
        <Image
          src='https://www.conceptvirtualdesign.com/wp-content/uploads/2024/06/LH-PEN-9280.webp'
          alt='Modern Minimalist Bathroom'
          width={600}
          height={600}
          priority
          unoptimized
          className='w-full h-full object-cover'
        />
      </div>
    </section>
  );
};

export default HeroSection;
