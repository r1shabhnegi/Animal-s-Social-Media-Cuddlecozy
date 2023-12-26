import PostForm from '@/components/parts/PostForm';

const CreatePost = () => {
  return (
    <div className='w-full px-16 sm:px-24 md:px-28 lg:px-40 py-5'>
      <div className='flex gap-4 items-center pb-10 '>
        <img
          src='/assets/icons/add.svg'
          alt=''
          className='h-7 w-7 sm:h-10 sm:w-10'
        />
        <h1 className='text-[2rem] sm:text-[2.5rem]'>Create Post</h1>
      </div>
      <PostForm action='create' />
    </div>
  );
};
export default CreatePost;
