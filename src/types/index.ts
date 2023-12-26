import { Models } from 'appwrite';

export type PostFormTypes = {
  post: Models.Document;
  action: 'create' | 'update';
};
