import HeroSection from '@/components/home/HeroSection';
import HomePageSanitary from '@/components/home/HomePageSanitary';
import ProcessSteps from '@/components/home/sections/ProcessSteps';
import Testimonials from '@/components/home/sections/Testimonials';
import WhyChooseUs from '@/components/home/sections/WhyChooseUs';

const Home = () => {
  return (
    <div className='my-12 sm:my-24'>
      <HeroSection />
      <div className='space-y-12 my-24'>
        <WhyChooseUs />
        <HomePageSanitary />
        <ProcessSteps />
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
