import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAppSelector } from '@/globals/authSlice';
import { useSignOutAccount } from '@/tanstack/queriesAndMutations';
import { useEffect } from 'react';

const TopBar = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.authSlice.userData);

  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate('/sign-in');
  }, [isSuccess]);

  return (
    <section className='sticky z-50 w-full h-auto flex justify-between items-center'>
      <Link
        to='/'
        className='flex items-center justify-center h-full mx-2 sm:m-4 md:m-6'>
        <img
          src='/assets/images/logo.png'
          className='h-7 sm:h-9 md:h-11'
          alt='Logo'
        />
      </Link>

      <div className='h-auto w-auto flex justify-center items-center mx-2'>
        <Button
          type='button'
          className='p-0 m-2 md:hidden'
          onClick={() => signOutAccount()}>
          <img
            src='/assets/icons/logout.svg'
            alt='Logout'
            className='w-full'
          />
        </Button>
        <Button
          type='button'
          className='p-0 m-2 sm:m-4 md:m-6'>
          <div className='hidden md:block p-5 text-left'>
            <p className='text-xl'>{user.name}</p>
            <p
              style={{ color: '#63A6F8' }}
              className='text-sm'>
              @{user.username}
            </p>
          </div>
          <img
            src={user.imageUrl}
            alt='Profile'
            className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full'
          />
        </Button>
      </div>
    </section>
  );
};
export default TopBar;
