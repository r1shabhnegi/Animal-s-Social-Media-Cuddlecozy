import BottomBar from '@/components/parts/BottomBar';
import LeftSideBar from '@/components/parts/LeftSideBar';
import TopBar from '@/components/parts/TopBar';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='h-full'>
      <TopBar />
      <div className='flex'>
        <LeftSideBar />
        <section className='w-full'>
          <Outlet />
        </section>
      </div>
      <BottomBar />
    </div>
  );
};
export default RootLayout;
