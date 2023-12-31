import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RootLayout from './_root/RootLayout';
import AuthLayout from './auth/AuthLayout';
import { checkAuthUser, useAppDispatch } from './globals/authSlice';
import { SignInForm, SignUpForm } from './auth/authForms';
import {
  Blogs,
  Community,
  CreatePost,
  Explore,
  Home,
  Profile,
  Saved,
  EditPost,
} from './_root/root-pages';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback');
    if (
      cookieFallback === '[]' ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate('/sign-in');
    }

    dispatch(checkAuthUser());
  }, []);

  return (
    <main className='w-full h-screen'>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path='/sign-in'
            element={<SignInForm />}
          />
          <Route
            path='/sign-up'
            element={<SignUpForm />}
          />
        </Route>

        <Route
          path='/'
          element={<RootLayout />}>
          <Route
            path=''
            element={<Home />}
          />
          <Route
            path='/blogs'
            element={<Blogs />}
          />
          <Route
            path='/community'
            element={<Community />}
          />
          <Route
            path='/create-post'
            element={<CreatePost />}
          />

          <Route
            path='/saved'
            element={<Saved />}
          />
          <Route
            path='/explore'
            element={<Explore />}
          />
          <Route
            path='/update-post/:id'
            element={<EditPost />}
          />
        </Route>

        <Route
          path='/profile'
          element={<Profile />}
        />
      </Routes>
    </main>
  );
};
export default App;
