import PostCard from '@/components/parts/PostCard';
import { useGetRecentPosts } from '@/reactQuery/queriesAndMutations';

const Home = () => {
  const { data: posts, isError: isErrorPosts } = useGetRecentPosts();

  if (isErrorPosts) <h1>Something went wrong</h1>;

  return (
    <div className='flex px-8 overflow-y-auto'>
      <div className='flex flex-col w-full justify-center md:px-24 lg:px-12'>
        <h2 className='text-[2rem] font-medium text-left w-full pb-5'>
          Home Feed
        </h2>
        <ul>
          {posts?.documents.map((postData: any) => (
            <li key={postData.$id}>
              <PostCard post={postData} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
