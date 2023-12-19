'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Link } from 'react-router-dom';
import { signUpValidation } from '@/lib/validation';
import { mutateCreateUser } from '@/tanstack/queriesAndMutations';
import { useState } from 'react';

const formSchema = signUpValidation;

const SignUpForm = () => {
  const [error, setError] = useState(false);
  const { mutateAsync, isPending } = mutateCreateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError(false);
      const data = await mutateAsync(values);
      if (!data) throw new Error();

      console.log(data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 w-1/4 px-8 py-6 rounded-lg bg-white'>
        <h1 className=' text-4xl w-full mb-5 text-gray-800'>Sign Up</h1>
        {error && (
          <p className='text-red-600 text-center'>
            Something went wrong, Please try again!
          </p>
        )}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label  text-gray-500'>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  className='bg-gray-200 focus-visible:ring-0'
                  type='text'
                  placeholder='Name'
                  {...field}
                />
              </FormControl>

              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label  text-gray-500'>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className='bg-gray-200 focus-visible:ring-0'
                  type='text'
                  placeholder='Username'
                  {...field}
                />
              </FormControl>

              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

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
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          type='submit'
          className=' w-full'>
          {isPending ? <p>Loading...</p> : <p>Submit</p>}
        </Button>
        <Link to='sign-in'>
          <Button
            style={{
              // marginTop: '1.5rem',
              marginBottom: '0.5rem',
            }}
            type='button'
            className=' w-full bg-blue-400'>
            Sign In
          </Button>
        </Link>
      </form>
    </Form>
  );
};
export default SignUpForm;
