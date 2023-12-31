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
import { postValidation } from '../../lib/validation';
import { Textarea } from '@/components/ui/textarea';
import { PostFormTypes } from '@/types';
import { useNavigate } from 'react-router';
import FileUploader from './FileUploader';
import { useCreatePost } from '@/reactQuery/queriesAndMutations';
import { useAppSelector } from '@/globals/authSlice';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const PostForm = ({ post, action }: PostFormTypes) => {
  console.log(post);
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: createPostLoading } =
    useCreatePost();
  const { data } = useAppSelector((state) => state.authSlice);

  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: '',
      file: [],
      location: '',
      tags: '',
    },
  });

  async function onSubmit(values: z.infer<typeof postValidation>) {
    const upload = await createPost({ ...values, userId: data.id });
    if (!upload) throw new Error();
    navigate('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 w'>
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className='h-36 bg-[#282828c1]  rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important text-xl'
                  {...field}
                  defaultValue={post?.caption}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  className=' bg-[#282828c1]  rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important text-xl'
                  {...field}
                  defaultValue={post?.location}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel> Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input
                  className='bg-[#282828c1] rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important text-xl'
                  {...field}
                  defaultValue={post?.tags}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2 justify-end'>
          <Button
            className='bg-[#282828c1]'
            type='button'
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            className='bg-[#282828c1]'
            type='submit'>
            {createPostLoading ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default PostForm;
