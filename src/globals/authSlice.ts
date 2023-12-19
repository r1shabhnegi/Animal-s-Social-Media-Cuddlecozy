import { createSlice } from '@reduxjs/toolkit';
import { UserTypes } from '@/types';

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

type authTypes = {
  user: UserTypes;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState = {
  user: INITIAL_USER,
  isAuthenticated = false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});
