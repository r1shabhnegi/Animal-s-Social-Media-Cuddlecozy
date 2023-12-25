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
import { signUpValidation } from '@/lib/validation';
import {
  useCreateUser,
  useSignInAccount,
} from '@/reactQuery/queriesAndMutations';
import { useState } from 'react';
import { checkAuthUser, useAppDispatch } from '@/globals/authSlice';

const formSchema = signUpValidation;

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: createAccount } = useCreateUser();
  const { mutateAsync: signInAccount } = useSignInAccount();

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
      setIsLoading(true);
      const data = await createAccount(values);
      if (!data) throw new Error();

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
    <div className=' flex justify-center items-center flex-col'>
      <div className='w-44 sm:w-48 md:w-52 flex justify-center m-4'>
        <img
          src='/assets/images/logo.png'
          alt='Logo'
          className='w-auto'
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-3 sm:w-80 w-72 px-6 py-5 rounded-lg bg-white'>
          <h1 className=' text-4xl w-full mb-4 text-gray-800'>Sign Up</h1>
          {error && (
            <p className='text-red-600 text-center text-sm'>
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

                <FormMessage className='text-xs text-red-600' />
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

                <FormMessage className='text-xs text-red-600' />
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

                <FormMessage className='text-xs text-red-600' />
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

                <FormMessage className='text-xs text-red-600' />
              </FormItem>
            )}
          />

          <Button
            // disabled = false
            disabled={pendingStatus}
            style={{
              marginTop: '1.5rem',
            }}
            type='submit'
            className=' w-full bg-red-300'>
            {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : ''}

            {isLoading ? <p>Please wait</p> : <p>Submit</p>}
          </Button>
          <div className='w-full flex justify-center'>
            <p className='font-gray-500 text-xs text-slate-500'>
              Already registered user?
              <Link
                to='/sign-in'
                className='hover:underline text-slate-950'>
                &nbsp;Sign in now
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SignUpForm;
