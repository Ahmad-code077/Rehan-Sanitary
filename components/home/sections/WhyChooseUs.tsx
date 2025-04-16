import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Shield, Truck } from 'lucide-react';

const benefits = [
  {
    title: 'Eco-Friendly',
    desc: 'We care for nature with biodegradable products.',
    icon: Leaf,
    color: 'from-emerald-500 to-green-400',
    lightColor: 'bg-emerald-50',
  },
  {
    title: 'Trusted Quality',
    desc: 'Top-rated materials trusted by thousands.',
    icon: Shield,
    color: 'from-indigo-500 to-blue-400',
    lightColor: 'bg-indigo-50',
  },
  {
    title: 'Fast Delivery',
    desc: 'Your products at your doorstep quickly.',
    icon: Truck,
    color: 'from-amber-500 to-yellow-400',
    lightColor: 'bg-amber-50',
  },
];

export default function WhyChooseUs() {
  return (
    <section className='text-center max-w-5xl mx-auto space-y-12'>
      <div className='space-y-4'>
        <h2 className='text-4xl font-bold text-gray-900 font-nunito'>
          Why Choose Us?
        </h2>
        <p className='text-gray-500 max-w-2xl mx-auto'>
          Discover the benefits that make our products stand out from the rest
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
        {benefits.map((item, idx) => (
          <Card
            key={idx}
            className='border-none rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
          >
            <CardContent className='p-0'>
              <div className='flex flex-col items-center'>
                <div
                  className={`w-full py-8 bg-gradient-to-r ${item.color} flex justify-center`}
                >
                  <item.icon className='h-12 w-12 text-white' />
                </div>
                <div className={`p-8 ${item.lightColor} w-full h-full`}>
                  <h3 className='text-xl font-bold mb-3 text-gray-800'>
                    {item.title}
                  </h3>
                  <p className='text-gray-600'>{item.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
