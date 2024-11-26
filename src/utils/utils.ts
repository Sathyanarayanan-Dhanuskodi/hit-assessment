import { ACCESS_TOKEN_KEY } from '@/constants/constants';
import { EModules, EPermissions } from '@/types/types';
import { IUser, TTokenPayload } from '@/types/users';
import axios from 'axios';
import { decodeJwt, SignJWT } from 'jose';

export default class Utils {
  static async callRestAPI({
    url,
    method = 'GET',
    data,
    headers
  }: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: object;
    headers?: object;
  }) {
    return axios(url, {
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('Error in callRestAPI', err);
        throw err;
      });
  }

  static async jwtSign(payload: TTokenPayload) {
    const iat = Math.floor(Date.now() / 1000);

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime('24h')
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return token;
  }

  static async getCurrentUser() {
    const token = document.cookie
      ?.split(`${ACCESS_TOKEN_KEY}=`)[1]
      ?.split(';')[0];

    if (token) {
      let decodedToken: IUser = decodeJwt(token);

      const role = await Utils.callRestAPI({
        url: `/api/roles/${decodedToken.rid}`,
        headers: {
          cache: 'force-cache'
        }
      });

      decodedToken = { ...decodedToken, ...role.data };

      return decodedToken;
    }
  }

  static isStrongPassword(password: string): {
    isValid: boolean;
    message: string;
  } {
    if (password.length < 8) {
      return {
        isValid: false,
        message: 'Password must be at least 8 characters long'
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one uppercase letter'
      };
    }

    if (!/[a-z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one lowercase letter'
      };
    }

    if (!/\d/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one number'
      };
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return {
        isValid: false,
        message:
          'Password must contain at least one special character (!@#$%^&*)'
      };
    }

    return { isValid: true, message: 'Password is strong' };
  }
}
