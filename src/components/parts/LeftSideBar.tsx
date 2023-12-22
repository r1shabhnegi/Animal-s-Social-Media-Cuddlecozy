import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/globals/authSlice';
import { sidebarLinks } from '@/instance';
import { SideBarTypes } from '@/types';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/tanstack/queriesAndMutations';
import { useEffect } from 'react';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();
  useEffect(() => {
    if (isSuccess) navigate('/sign-in');
  }, [isSuccess]);

  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.authSlice.userData);

  return (
    <nav className='hidden md:w-60 md:flex lg:w-64 h-full p-4 flex-col justify-between'>
      <ul className='w-full flex flex-1 flex-col gap-5 mb-40'>
        <li>
          <Link
            to={`/profile/${user.id}`}
            className='flex items-center w-full gap-4 px-4'>
            <img
              src={user.imageUrl || '/assets/images.profile.png'}
              alt='profile Image'
              className='h-10 w-10 rounded-full'
            />
            <div>
              <p className='text-xl'> {user.name}</p>
              <p
                style={{ color: '#63A6F8' }}
                className='text-sm'>
                @{user.username}
              </p>
            </div>
          </Link>
        </li>
        {sidebarLinks.map((link: SideBarTypes) => {
          const isActive = pathname === link.route;
          return (
            <li key={link.label}>
              <NavLink
                to={link.route}
                className={`${
                  isActive && 'bg-primary-500'
                } group flex items-center w-full bg-rd-400 py-3 px-4 gap-8 hover:bg-primary-600 rounded-lg`}>
                <img
                  src={link.imgURL}
                  alt='img'
                  className={`group-hover:text-white  ${
                    isActive && 'invert brightness-0'
                  } group-hover:invert group-hover:brightness-0 `}
                />
                <p>{link.label}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <Button
        type='button'
        className='px-5 py-2 flex text-left justify-start gap-8'
        onClick={() => signOutAccount()}>
        <img
          src='/assets/icons/logout.svg'
          alt='Logout'
          className='w-7 h-7 '
        />
        <p>Logout</p>
      </Button>
    </nav>
  );
};
export default LeftSidebar;
