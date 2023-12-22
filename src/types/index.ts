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
  accountId: string;
  name: string;
  username: string;
  email: string;
  imageUrl: URL;
};

export type SignInTypes = {
  email: string;
  password: string;
};

export type InitialStateTypes = {
  userData: UserTypes;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type SideBarTypes = {
  imgURL: string;
  route: string;
  label: string;
};
