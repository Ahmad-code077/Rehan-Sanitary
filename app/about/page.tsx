import React from 'react';
import Image from 'next/image';
import { Award, BadgeCheck, Leaf, Ruler } from 'lucide-react';

const aboutContent = [
  {
    title: 'Our Mission',
    description:
      'To redefine bathroom experiences through innovative sanitary solutions that combine luxury, hygiene, and sustainable design.',
    icon: <Ruler className='w-8 h-8 text-primary' />,
    decoration: (
      <div className='absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background opacity-50' />
    ),
  },
  {
    title: 'Our Vision',
    description:
      'To be the global benchmark in premium sanitaryware, setting new standards in bathroom aesthetics and functionality.',
    icon: <Award className='w-8 h-8 text-primary' />,
    decoration: (
      <div className='absolute inset-0 bg-gradient-to-br from-background via-accent/10 to-background opacity-50' />
    ),
  },
  {
    title: 'Our Values',
    description:
      'Quality craftsmanship, customer-centric innovation, and environmental responsibility guide every product we create.',
    icon: <Leaf className='w-8 h-8 text-primary' />,
    decoration: (
      <div className='absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background opacity-50' />
    ),
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative h-96 md:h-screen/2'>
        <div className='absolute inset-0 bg-black/30'></div>
        <Image
          src='/8.jpg'
          alt='Luxury Bathroom Showroom'
          fill
          className='mix-blend-multiply'
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className='relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8'>
          <div className='text-center md:text-left space-y-6'>
            <h1 className='text-4xl md:text-6xl font-light text-secondary'>
              Crafting Bathroom{' '}
              <span className='font-serif italic text-primary'>Elegance</span>
            </h1>
            <p className='text-lg md:text-xl text-secondary max-w-2xl'>
              For over two decades, we&apos;ve been transforming bathrooms into
              luxurious sanctuaries with our premium sanitaryware collections.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
            {aboutContent.map((item, index) => (
              <div
                key={index}
                className='group relative p-8 bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border overflow-hidden'
              >
                {item.decoration}
                <div className='mb-8 flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-muted to-background border border-border'>
                  <div className='text-foreground group-hover:text-primary transition-colors'>
                    {item.icon}
                  </div>
                </div>

                <div className='relative z-10'>
                  <h3 className='text-2xl font-semibold text-foreground mb-4 flex items-center gap-2'>
                    {item.title}
                    <BadgeCheck className='w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity' />
                  </h3>

                  <p className='text-muted-foreground leading-relaxed text-base border-t border-border pt-4'>
                    {item.description}
                  </p>
                </div>

                <div className='absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-xl transition-all pointer-events-none' />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/10'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <h2 className='text-3xl md:text-4xl font-light text-foreground'>
              Leading Suppliers of{' '}
              <span className='font-serif italic text-primary'>
                Premium Sanitary Solutions
              </span>
            </h2>

            <p className='text-muted-foreground leading-relaxed text-lg'>
              Since 1998, Rehan Traders has been at the forefront of sanitary
              equipment supply, providing top-quality products to residential
              and commercial projects. Our expertise spans across:
            </p>

            <ul className='grid grid-cols-2 gap-4 text-muted-foreground'>
              <li className='flex items-start space-x-3'>
                <svg
                  className='w-5 h-5 text-primary mt-1 flex-shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                </svg>
                <span>
                  <strong>Premium Taps & Faucets</strong>
                  <br />
                  Modern designs with water-saving technology
                </span>
              </li>

              <li className='flex items-start space-x-3'>
                <svg
                  className='w-5 h-5 text-primary mt-1 flex-shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                </svg>
                <span>
                  <strong>Sanitary Pipes</strong>
                  <br />
                  Durable, corrosion-resistant piping systems
                </span>
              </li>

              <li className='flex items-start space-x-3'>
                <svg
                  className='w-5 h-5 text-primary mt-1 flex-shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                </svg>
                <span>
                  <strong>Wash Basins</strong>
                  <br />
                  Elegant designs for modern bathrooms
                </span>
              </li>

              <li className='flex items-start space-x-3'>
                <svg
                  className='w-5 h-5 text-primary mt-1 flex-shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                </svg>
                <span>
                  <strong>Complete Solutions</strong>
                  <br />
                  End-to-end sanitary system installations
                </span>
              </li>
            </ul>
          </div>

          <div className='relative h-96 rounded-xl overflow-hidden shadow-xl'>
            <Image
              src='/13.jpg'
              alt='Rehan Traders Sanitary Products'
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              style={{ objectFit: 'cover' }}
              className='transform hover:scale-105 transition-all duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/10 to-black/30'></div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-8 flex flex-col'>
              <div className='bg-card p-8 rounded-xl shadow-lg border border-border flex-1 flex flex-col'>
                <h3 className='text-2xl font-semibold text-foreground mb-4'>
                  Quality Assurance
                </h3>
                <p className='text-muted-foreground flex-1'>
                  Every product undergoes 27 quality checks using precision
                  instruments to ensure perfect finish and optimal performance.
                </p>
              </div>

              <div className='bg-card p-8 rounded-xl shadow-lg border border-border flex-1 flex flex-col'>
                <h3 className='text-2xl font-semibold text-foreground mb-4'>
                  Sustainable Practices
                </h3>
                <p className='text-muted-foreground flex-1'>
                  Our eco-friendly manufacturing process saves 4.5 million
                  liters of water annually while maintaining zero-waste
                  production.
                </p>
              </div>
            </div>

            <div className='space-y-8 flex flex-col'>
              <div className='bg-card p-8 rounded-xl shadow-lg border border-border flex-1 flex flex-col'>
                <h3 className='text-2xl font-semibold text-foreground mb-4'>
                  Global Standards
                </h3>
                <p className='text-muted-foreground flex-1'>
                  Certified by ISO 9001, WaterSense, and ADA Compliance for
                  exceptional quality and water efficiency.
                </p>
              </div>

              <div className='bg-card p-8 rounded-xl shadow-lg border border-border flex-1 flex flex-col'>
                <h3 className='text-2xl font-semibold text-foreground mb-4'>
                  Design Expertise
                </h3>
                <p className='text-muted-foreground flex-1'>
                  Our international design team creates collections that blend
                  functionality with artistic expression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
