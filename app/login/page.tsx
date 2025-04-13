'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const showToast = useShowToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin@gmail.com';

    if (email === adminEmail && password === adminPassword) {
      const userData = { email: adminEmail, role: 'admin' };
      localStorage.setItem('loggedInUser', JSON.stringify(userData));

      // Trigger a localStorage event manually
      window.dispatchEvent(new Event('storage'));

      showToast({
        title: 'Login Successful!',
        description: `Welcome back, ${userData.email}!`,
      });

      router.push('/');
    } else {
      setError('Invalid email or password.');
      showToast({
        title: 'Invalid Credentials',
        description: 'Please check your email and password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-background/50 backdrop-blur-sm'>
      <div className='w-full max-w-md px-4'>
        <div className='bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden'>
          {/* Header Section */}
          <div className='bg-primary/5 p-8 border-b border-border/50'>
            <h1 className='text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              Welcome Back
            </h1>
            <p className='text-muted-foreground text-center mt-2'>
              Please sign in to continue
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleLogin} className='p-8 space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-sm font-medium text-foreground'
                >
                  Email Address
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='email'
                    placeholder='Enter your email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='pl-10 bg-background/50 border-border/50 focus:border-primary'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-sm font-medium text-foreground'
                >
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='password'
                    placeholder='Enter your password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pl-10 bg-background/50 border-border/50 focus:border-primary'
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className='text-destructive text-sm bg-destructive/10 p-3 rounded-lg'>
                {error}
              </p>
            )}

            <Button
              type='submit'
              className='w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 py-6'
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
