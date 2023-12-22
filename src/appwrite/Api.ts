import { ID, Query } from 'appwrite';
import { account, avatars, databases, appwriteConfig } from './Config';
import { CreateUserTypes, SaveUserDbTypes, SignInTypes } from '@/types';

export const createAccount = async (user: CreateUserTypes) => {
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
      accountId: newUser.$id,
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
    console.log(`databases: ${newUser}`);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const signInAccount = async (user: SignInTypes) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    // console.log(session);
    return session;
  } catch (error) {
    console.log(error);
  }
};

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSessions();
    return session;
  } catch (error) {
    console.log(error);
  }
};
