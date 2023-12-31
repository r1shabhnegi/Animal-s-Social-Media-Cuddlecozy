import { Models } from 'appwrite';

export type PostFormTypes = {
  post?: Models.Document;
  action: 'create' | 'update';
};

export type FileUploaderTypes = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

export type SignInTypes = {
  email: string;
  password: string;
};

export type CreateUserTypes = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type CreatePostTypes = {
  caption: string;
  location?: string | undefined;
  tags?: string | undefined;
  file: File[];
  userId: string;
};
