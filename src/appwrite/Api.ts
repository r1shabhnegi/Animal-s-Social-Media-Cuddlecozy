import { ID } from 'appwrite';
import { account, avatars, databases, appwriteConfig } from './Config';
import { CreateUserTypes, SaveUserDbTypes } from '@/types';

export const createUser = async (user: CreateUserTypes) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newUser) throw new Error();

    const avatarUrl = avatars.getInitials(user.name);

    const userData = await saveUserToDb({
      userId: newUser.$id,
      name: newUser.name,
      username: user.username,
      email: newUser.email,
      imageUrl: avatarUrl,
    });

    return userData;
  } catch (error) {
    console.log(error);
  }
};

export const saveUserToDb = async (user: SaveUserDbTypes) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
