import { Card, CardContent } from '@/components/ui/card';
import { Search, ClipboardCheck, PhoneCall } from 'lucide-react';

const steps = [
  {
    title: 'Browse Products',
    desc: 'Explore our range of high-quality sanitary products for your store.That you want',
    icon: Search,
    color: 'from-blue-500 to-indigo-400',
    lightColor: 'bg-blue-50',
  },
  {
    title: 'Select & Inquire',
    desc: 'Choose what you need and note down quantities and product names.',
    icon: ClipboardCheck,
    color: 'from-pink-500 to-fuchsia-400',
    lightColor: 'bg-pink-50',
  },
  {
    title: 'Place Order',
    desc: 'Send us your order via call, WhatsApp, or email with your shop address.',
    icon: PhoneCall,
    color: 'from-green-500 to-teal-400',
    lightColor: 'bg-green-50',
  },
];

export default function ProcessSteps() {
  return (
    <section className='text-center max-w-5xl mx-auto space-y-12'>
      <div className='space-y-4'>
        <h2 className='text-4xl font-bold text-gray-900 font-nunito'>
          How It Works
        </h2>
        <p className='text-gray-500 max-w-2xl mx-auto'>
          Simple steps to get the products you need
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 relative'>
        {steps.map((step, idx) => (
          <div key={idx} className='relative'>
            <Card className='border-none rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <CardContent className='p-0'>
                <div className='flex flex-col items-center'>
                  <div
                    className={`w-full py-8 bg-gradient-to-r ${step.color} flex justify-center relative`}
                  >
                    <div className='absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-800'>
                      {idx + 1}
                    </div>
                    <step.icon className='h-12 w-12 text-white' />
                  </div>
                  <div className={`p-8 ${step.lightColor} w-full h-full`}>
                    <h3 className='text-xl font-bold mb-3 text-gray-800'>
                      {step.title}
                    </h3>
                    <p className='text-gray-600'>{step.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {idx < steps.length - 1 && (
              <div className='hidden sm:block absolute top-1/3 -right-4 z-10 transform translate-x-1/2'>
                <div className='h-0.5 w-8 bg-gray-300'></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
