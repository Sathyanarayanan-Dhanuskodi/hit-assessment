import { JWTPayload } from 'jose';
import { ERoles } from './types';

export interface IBaseResponse {
  success: boolean;
  message: string;
}

export type TRole = {
  id: number;
  code: string;
  name: string;
};

export type TUser = {
  id: number;
  username: string;
  password: string;
  roles: TRole[];
};

export interface IUserResponse extends IBaseResponse {
  data: TUser[];
}

export type TTokenPayload = {
  uid: number;
  rid: ERoles[];
};

export type IUser = JWTPayload & TTokenPayload & TRole;
