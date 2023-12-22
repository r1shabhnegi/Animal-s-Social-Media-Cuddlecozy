import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/globals/authSlice';
const AuthLayout = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authSlice.isAuthenticated
  );

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <section
          style={{
            background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url('/assets/images/authBg.jpg') no-repeat 0`,
          }}
          className='relative h-screen w-full  flex justify-center items-center flex-col'>
          <div className='absolute top-10 w-80 sm:w-96 flex justify-center'>
            <img
              src='/assets/images/logo.png'
              alt='Logo'
              className='w-auto'
            />
          </div>
          <Navigate to='/sign-in' />
        </section>
      )}
    </>
  );
};
export default AuthLayout;
