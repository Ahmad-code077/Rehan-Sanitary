import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { initEmailJS } from '@/lib/emailjs';
import WhatsAppButton from '@/components/contact/WhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rehan Traders',
  description: 'Rehan Sanitary Store',
  icons: {
    icon: '/rehan-sanitary.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  initEmailJS();
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className='max-w-6xl mx-auto px-4'>{children}</div>
        <BackToTop />
        <WhatsAppButton />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
