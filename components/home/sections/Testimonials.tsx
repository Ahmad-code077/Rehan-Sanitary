import { Card, CardContent } from '@/components/ui/card';
import { MessageSquareQuote, UserCheck, User } from 'lucide-react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    content:
      'These products have completely changed my experience. The quality is unmatched and I feel confident all day long.',
    rating: 5,
    icon: UserCheck,
    color: 'from-violet-500 to-purple-400',
    lightColor: 'bg-violet-50',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    role: 'Monthly Subscriber',
    content:
      'The eco-friendly option is a game changer. Finally a product that aligns with my values without compromising quality.',
    rating: 5,
    icon: User,
    color: 'from-pink-500 to-rose-400',
    lightColor: 'bg-pink-50',
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'First-time Buyer',
    content:
      "I bought these for my wife and she's never been happier with sanitary products. Worth every penny!",
    rating: 4,
    icon: MessageSquareQuote,
    color: 'from-blue-500 to-cyan-400',
    lightColor: 'bg-blue-50',
  },
];

const Testimonials = () => {
  return (
    <section className='text-center max-w-5xl mx-auto space-y-12'>
      <div className='space-y-4'>
        <h2 className='text-4xl font-bold text-gray-900 font-nunito'>
          What Our Customers Say
        </h2>
        <p className='text-gray-500 max-w-2xl mx-auto'>
          Don&apos;t just take our word for it - hear from our satisfied
          customers
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className='border-none rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
          >
            <CardContent className='p-0'>
              <div className='flex flex-col items-center'>
                <div
                  className={`w-full py-6 bg-gradient-to-r ${testimonial.color} flex flex-col items-center space-y-2`}
                >
                  <testimonial.icon className='h-10 w-10 text-white' />
                  <div className='flex justify-center'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'text-white fill-white'
                            : 'text-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className={`p-8 ${testimonial.lightColor} w-full h-full`}>
                  <div className='mb-4'>
                    <h3 className='text-lg font-bold text-gray-800'>
                      {testimonial.name}
                    </h3>
                    <p className='text-sm text-gray-500'>{testimonial.role}</p>
                  </div>
                  <p className='text-gray-600 italic'>
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
