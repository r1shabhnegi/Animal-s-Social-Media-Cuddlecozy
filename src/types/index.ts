export type UserTypes = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type CreateUserTypes = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type SaveUserDbTypes = {
  userId: string;
  name: string;
  username: string;
  email: string;
  imageUrl: URL;
};
