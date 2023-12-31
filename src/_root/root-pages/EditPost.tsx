import PostForm from '@/components/parts/PostForm';
import { useGetPostById } from '@/reactQuery/queriesAndMutations';
import { useParams } from 'react-router';

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  return (
    <div className='w-full px-16 sm:px-24 md:px-28 lg:px-40 pt-5 pb-20 overflow-scroll'>
      <div className='flex gap-4 items-center pb-10 '>
        <img
          src='/assets/icons/edit.svg'
          alt=''
          className='h-7 w-7 sm:h-10 sm:w-10'
        />
        <h1 className='text-[2rem] sm:text-[2.5rem]'>Edit Post</h1>
      </div>
      <PostForm
        post={post}
        action='update'
      />
    </div>
  );
};
export default EditPost;
