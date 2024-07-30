import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../../interfaces';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  avatar: { type: String, default: '/images/avatar.jpg' },
  following: { type: [Schema.Types.ObjectId], ref: 'user' , default: [] },
});

userSchema.statics.hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

interface IUserModel extends Model<IUser> {
  hashPassword: (password: string) => string;
}

export const User = mongoose.model<IUser, IUserModel>('user', userSchema);
