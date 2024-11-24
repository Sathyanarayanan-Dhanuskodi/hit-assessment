import { JWTPayload } from 'jose';

export interface IBaseResponse {
  success: boolean;
  message: string;
}

export type TRole = {
  id: number;
  code: string;
  name: string;
  description: string;
  read: boolean;
  write: boolean;
  update: boolean;
  delete: boolean;
};

export type TUser = {
  id: number;
  username: string;
  password: string;
  role: TRole;
};

export interface IUserResponse extends IBaseResponse {
  data: TUser[];
}

export type TTokenPayload = {
  uid: number;
  rid: number;
};

export type IUser = JWTPayload & TTokenPayload & TRole;
