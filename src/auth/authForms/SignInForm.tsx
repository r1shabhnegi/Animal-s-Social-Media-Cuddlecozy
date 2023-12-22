'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Link, useNavigate } from 'react-router-dom';
import { signInValidation } from '@/lib/validation';
import { useState } from 'react';
import { useSignInAccount } from '@/tanstack/queriesAndMutations';
import { useAppDispatch, checkAuthUser } from '@/globals/authSlice';

const formSchema = signInValidation;

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError(false);
      setIsLoading(true);

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) throw new Error();

      const loadAuth = await dispatch(checkAuthUser());

      // console.log(loadAuth);
      if (loadAuth) {
        form.reset();
        navigate('/');
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const pendingStatus = isLoading ? true : false;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 w-80 md:w-2/5 lg:w-2/6 xl:w-1/4 px-6 py-6 md:p-7 md:y-7 rounded-lg bg-white'>
        <h1 className=' text-4xl w-full mb-5 text-gray-800'>Sign In</h1>
        {error && (
          <p className='text-red-600 text-center'>
            Something went wrong, Please try again!
          </p>
        )}

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label  text-gray-500'>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className='bg-gray-200 focus-visible:ring-0'
                  type='email'
                  placeholder='Email'
                  {...field}
                />
              </FormControl>

              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label text-gray-500'>
                Password
              </FormLabel>
              <FormControl>
                <Input
                  className='bg-gray-200 focus-visible:ring-0'
                  type='password'
                  placeholder='Password'
                  {...field}
                />
              </FormControl>

              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <Button
          disabled={pendingStatus}
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          type='submit'
          className=' w-full'>
          {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : ''}

          {isLoading ? <p>Please wait</p> : <p>Submit</p>}
        </Button>

        <Link to='/sign-up'>
          <Button
            style={{
              marginBottom: '0.5rem',
            }}
            type='button'
            className=' w-full bg-blue-400'>
            Sign Up
          </Button>
        </Link>
      </form>
    </Form>
  );
};
export default SignInForm;
