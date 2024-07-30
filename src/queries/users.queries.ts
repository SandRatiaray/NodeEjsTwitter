import { User } from '../database/models/user.mondel';
import { IUserForm, IUser } from '../interfaces';

export const createUser = async (user: IUserForm) => {
  try {
    const hashPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashPassword,
      },
    });
    return newUser.save();
  } catch (e) {
    throw e;
  }
};

export const searchUsersPerUsername = (search: string) => {
  const regExp = `^${search}`;
  const reg = new RegExp(regExp);
  return User.find({ username: { $regex: reg } }).exec();
};

export const findUserPerEmail = (email: string) => {
  return User.findOne({ 'local.email': email }).exec();
};

export const findUserPerId = (id: string) => {
  return User.findById(id).exec();
};

export const findUserPerUsername = (username: string) => {
  return User.findOne({ username: username }).exec();
};

export const addUserIdToCurrentUserFollowing = (
  currentUser: IUser,
  userId: string
) => {
  if (currentUser.following) {
    currentUser.following = [...currentUser.following, userId];
    return currentUser.save();
  } else {
    return null;
  }
};

export const removeUserIdToCurrentUserFollowing = (
  currentUser: IUser,
  userId: string
) => {
  if (currentUser.following) {
    currentUser.following = currentUser.following.filter(
      (objId) => objId.toString() !== userId
    );
    return currentUser.save();
  } else {
    return null;
  }
};
