import { useMutation } from '@tanstack/react-query';
import {
  createAccount,
  createPost,
  signInAccount,
  signOutAccount,
} from '@/appwrite/Api';
import { CreateUserTypes, SignInTypes } from '@/types';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (values: CreateUserTypes) => createAccount(values),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: SignInTypes) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (values) => createPost(values),
  });
};
