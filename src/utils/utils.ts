import { ACCESS_TOKEN_KEY } from '@/constants/constants';
import { IUser, TRole, TTokenPayload } from '@/types/users';
import axios from 'axios';
import { decodeJwt, SignJWT } from 'jose';
import { unstable_cache } from 'next/cache';

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
      .split(`${ACCESS_TOKEN_KEY}=`)[1]
      .split(';')[0];

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
