import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/globals/authSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
const AuthLayout = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state) => state.authSlice.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <section
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url('/assets/images/authBg.jpg') no-repeat 0`,
      }}
      className='h-screen w-full flex justify-center items-center '>
      <Outlet />
    </section>
  );
};
export default AuthLayout;
