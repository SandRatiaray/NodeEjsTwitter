import {  Document } from 'mongoose';

export interface IUserLocal {
  email: string;
  password: string;
}

export interface IUser extends Document {
  _id: string;
  username: string;
  local: IUserLocal;
  avatar?: string;
  following: string[];
  comparePassword : (password:string, hashedPassword:string) => boolean;
}

export interface IUserForm {
  username: string;
  email: string;
  password: string;
}
