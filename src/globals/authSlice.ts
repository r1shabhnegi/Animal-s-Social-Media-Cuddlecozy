import { createSlice } from '@reduxjs/toolkit';
import { UserTypes, InitialStateTypes } from '@/types';
import { getCurrentUser } from '@/appwrite/Api';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { error } from 'console';

export const initialUser: UserTypes = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

const initialState: InitialStateTypes = {
  userData: initialUser,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserData(state, action) {
      const { id, name, username, email, imageUrl, bio } = action.payload;
      state.userData = {
        id,
        name,
        username,
        email,
        imageUrl,
        bio,
      };
      state.isAuthenticated = !!action.payload;
    },
    setStatus(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { addUserData, setStatus }: any = authSlice.actions;

export const authReducer = authSlice.reducer;

export const checkAuthUser = () => {
  return async function fetchAuthData(dispatch: any) {
    try {
      dispatch(setStatus(true));
      const data = await getCurrentUser();
      if (data) {
        dispatch(addUserData(data));
        return true;
      } else {
        throw new Error('User data not found');
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
