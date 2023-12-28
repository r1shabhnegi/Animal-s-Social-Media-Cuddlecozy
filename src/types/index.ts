import { Models } from 'appwrite';

export type PostFormTypes = {
  post: Models.Document;
  action: 'create' | 'update';
};

export type FileUploaderTypes = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};
