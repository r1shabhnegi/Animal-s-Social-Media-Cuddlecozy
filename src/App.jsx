import { Route, Routes } from 'react-router-dom';
import AuthLayout from './auth/AuthLayout';
import SignInForm from './auth/authForms/SignInForm';
import SignUpForm from './auth/authForms/SignUpForm';
import RootLayout from './root/RootLayout';
import Home from './root/root-pages/Home';

const App = () => {
  return (
    <main className='w-full h-screen'>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path='/sign-in'
            element={<SignInForm />}
          />
          <Route
            index
            // path='/sign-up'
            element={<SignUpForm />}
          />
        </Route>

        <Route element={<RootLayout />}>
          <Route
            index
            element={<Home />}
          />
        </Route>
      </Routes>
    </main>
  );
};
export default App;
