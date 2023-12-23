import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from './auth/authForms/SignInForm';
import SignUpForm from './auth/authForms/SignUpForm';
import RootLayout from './root/RootLayout';
import Home from './root/root-pages/Home';
import { checkAuthUser, useAppDispatch } from './globals/authSlice';
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Profile,
  Saved,
  UpdateProfile,
} from './root/root-pages';
import PostDetail from './root/root-pages/PostDetails';

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
        <Route
          path='/sign-in'
          element={<SignInForm />}
        />
        <Route
          path='/sign-up'
          element={<SignUpForm />}
        />

        <Route
          path='/'
          element={<RootLayout />}>
          <Route
            path=''
            element={<Home />}
          />
          <Route
            path='/explore'
            element={<Explore />}
          />
          <Route
            path='/saved'
            element={<Saved />}
          />
          <Route
            path='/all-users'
            element={<AllUsers />}
          />
          <Route
            path='/create-post'
            element={<CreatePost />}
          />
          <Route
            path='/update-post:id'
            element={<EditPost />}
          />
          <Route
            path='/posts/:id'
            element={<PostDetail />}
          />

          <Route
            path='/profile/:id/*'
            element={<Profile />}
          />
          <Route
            path='/update-profile/:id'
            element={<UpdateProfile />}
          />
        </Route>
      </Routes>
    </main>
  );
};
export default App;
