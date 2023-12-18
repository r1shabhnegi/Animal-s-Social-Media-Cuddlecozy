'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(18, {
      message: 'Name must be less then 18 characters',
    }),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters',
    })
    .max(18, {
      message: 'Username must be less then 18 characters',
    }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Username must be at least 8 characters',
  }),
});

const SignUpForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2 w-1/4 px-8 py-6 rounded-lg bg-white'>
        <h1 className=' text-4xl w-full mb-6 text-gray-800'>Sign Up</h1>
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
            marginTop: '1.5rem',
            marginBottom: '.5rem',
          }}
          type='submit'
          className=' w-full'>
          Submit
        </Button>

        <Button
          style={{
            // marginTop: '1.5rem',
            marginBottom: '0.5rem',
          }}
          type='button'
          className=' w-full bg-blue-400'>
          Sign In
        </Button>
      </form>
    </Form>
  );
};
export default SignUpForm;
