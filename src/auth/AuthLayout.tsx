import { Outlet, Navigate } from 'react-router-dom';
import authBg from '../assets/images/authBg.jpg';
import logo from '../assets/images/logo.png';
const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <section
          style={{
            background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${authBg}) no-repeat 0`,
          }}
          className='relative h-screen w-full flex justify-center items-center flex-col'>
          <div className='absolute top-6 -left-8'>
            <img
              src={logo}
              alt='Logo'
              className='w-auto'
            />
          </div>
          <Outlet />
        </section>
      )}
    </>
  );
};
export default AuthLayout;
