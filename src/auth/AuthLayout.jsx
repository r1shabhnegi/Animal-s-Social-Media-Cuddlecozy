import { Outlet, Navigate } from 'react-router-dom';
import authBg from '../assets/images/authBg.jpg';
const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <section
          style={{
            background: `linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,.6)), url(${authBg}) no-repeat 0`,
          }}
          className='h-screen w-full'>
          <Outlet />
        </section>
      )}
    </>
  );
};
export default AuthLayout;
