'use client';
import React, { useCallback, useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import AuthSocialButton from './AuthSocialButton';

type Varian = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [varian, setVarian] = useState<Varian>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVarian = useCallback(() => {
    if (varian === 'LOGIN') {
      setVarian('REGISTER');
    } else {
      setVarian('LOGIN');
    }
  }, [varian]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (
    data: FieldValues
  ) => {
    setIsLoading(true);

    if (varian === 'REGISTER') {
      // Axios POST /api/auth/register
    }

    if (varian === 'LOGIN') {
      // Axios POST /api/auth/login
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth social login
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {varian === 'REGISTER' && (
            <Input
              label='name'
              id='Name'
              register={register}
              errors={errors}
            />
          )}
          <Input
            label='email'
            id='Email address'
            type='email'
            register={register}
            errors={errors}
          />
          <Input
            label='password'
            id='Password'
            type='password'
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type='submit'>
              {varian === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center '>
              <div className='w-full border-t border-gray-300 ' />
            </div>
            <div className='relative flex justify-center text-sm '>
              <span className='px-2 text-gray-500 bg-white'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='flex gap-2 mt-6 '>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />

            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>

        <div className='flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500'>
          <div>
            {varian === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVarian}
            className='underline cursor-pointer'>
            {varian === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
