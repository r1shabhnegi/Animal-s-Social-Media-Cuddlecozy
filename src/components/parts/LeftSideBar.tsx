import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sidebarConstants } from '@/constants';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/reactQuery/queriesAndMutations';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { setUserData, setAuthentication } from '@/globals/authSlice';
import { useAppDispatch } from '@/globals/authSlice';

const LeftSideBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    mutateAsync: signOutAccount,
    isPending: setIsLoading,
    isSuccess,
  } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in');
      dispatch(
        setUserData({
          id: '',
          name: '',
          username: '',
          email: '',
          imageUrl: '',
          bio: '',
        })
      );
      dispatch(setAuthentication(false));
    }
  }, [isSuccess]);

  return (
    <nav className='hidden h-[calc(100vh-5rem)] md:flex md:w-80 lg:w-96 flex-col justify-between p-2'>
      <ul className='flex flex-col gap-7 w-full'>
        {sidebarConstants.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li key={link.label}>
              <Link
                to={link.route}
                className={` ${
                  isActive && 'bg-cyan-950'
                } rounded-lg flex gap-10 items-center py-3 lg:px-8 md:px-5 mx-2`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`${
                    isActive && 'sepia'
                  } lg:w-6 lg:h-6 md:w-5 md:h-5`}
                />
                <p
                  className={`${
                    isActive && 'font-bold '
                  } md:text-lg lg:text-xl`}>
                  {link.label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>

      {setIsLoading ? (
        <div className='w-full flex justify-center items-center p-5'>
          <Loader2 className='mr-2 h-6 w-6 animate-spin' />
        </div>
      ) : (
        <Button
          type='button'
          onClick={() => signOutAccount()}
          className='w-full h-4 hidden md:flex  justify-start py-8 lg:px-9 md:px-5 mx-1'>
          <img
            src='/assets/icons/logout.svg'
            alt='Logout'
            className='lg:w-6 lg:h-6 md:w-5 md:h-5'
          />
          <p className='ml-8 md:text-lg lg:text-xl'>Logout</p>
        </Button>
      )}
    </nav>
  );
};
export default LeftSideBar;
