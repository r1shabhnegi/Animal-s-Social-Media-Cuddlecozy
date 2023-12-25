import { createSlice } from '@reduxjs/toolkit';
import { UserTypes, InitialStateTypes } from '@/types';
import { getCurrentUser } from '@/appwrite/Api';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const initialUserData: UserTypes = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

const initialState: InitialStateTypes = {
  data: initialUserData,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action) {
      const { $id, name, username, email, imageUrl, bio } = action.payload;
      state.data = {
        id: $id,
        name,
        username,
        email,
        imageUrl,
        bio,
      };
    },
    setAuthentication(state, action) {
      state.isAuthenticated = action.payload;
    },
    setStatus(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserData, setStatus, setAuthentication }: any =
  authSlice.actions;

export const authReducer = authSlice.reducer;

export const checkAuthUser = () => {
  return async function fetchAuthData(dispatch: any) {
    try {
      dispatch(setStatus(true));
      const userData = await getCurrentUser();
      if (userData) {
        dispatch(setUserData(userData));
        dispatch(setAuthentication(true));
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      dispatch(setStatus(false));
    }
  };
};
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
