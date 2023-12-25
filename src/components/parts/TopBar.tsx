import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  useAppDispatch,
  useAppSelector,
  setUserData,
  setAuthentication,
} from '@/globals/authSlice';
import { useSignOutAccount } from '@/reactQuery/queriesAndMutations';
import { useEffect } from 'react';

const TopBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.authSlice.data);

  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();

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
    <section className='sticky z-50 w-full h-[5rem] flex justify-between items-center'>
      <Link
        to='/'
        className='flex items-center justify-center h-full mx-4 sm:mx-6 md:mx-8'>
        <img
          src='/assets/images/logo.png'
          className='h-8 sm:h-11 md:h-12'
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
          <div className='hidden md:block px-4 py-2 text-left'>
            <p className='text-lg'>{user.name}</p>
            <p
              style={{ color: '#63A6F8' }}
              className='text-sm'>
              @{user.username}
            </p>
          </div>
          <Link to='/profile'>
            <img
              src={user.imageUrl}
              alt='Profile'
              className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full'
            />
          </Link>
        </Button>
      </div>
    </section>
  );
};
export default TopBar;
