import { LeftSideBar, TopBar } from '@/components/parts';
import BottomBar from '@/components/parts/BottomBar';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='h-screen'>
      <TopBar />
      <div className='flex'>
        <LeftSideBar />
        <section className='w-full h-[calc(100vh-5rem)]'>
          <Outlet />
        </section>
      </div>
      <BottomBar />
    </div>
  );
};
export default RootLayout;
