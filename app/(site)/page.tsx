import React from 'react';
import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className='flex flex-col justify-center min-h-full py-12 bg-gray-100 sm:px-6 lg:px-8'>
      <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          alt='Logo'
          height='48'
          width='48'
          src='/images/logo.png'
          className='w-auto mx-auto'
        />
        <h2 className='mt-6 text-3xl font-bold tracking-tight text-center text-gray-900 '>
          Sing in to your account
        </h2>
      </div>
      {/* Auth Form */}
      <AuthForm />
    </div>
  );
}
