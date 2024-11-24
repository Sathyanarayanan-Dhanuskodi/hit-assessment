'use client';

import { ACCESS_TOKEN_KEY } from '@/constants/constants';
import { TRole, TTokenPayload } from '@/types/users';
import Utils from '@/utils/utils';
import { decodeJwt, JWTPayload } from 'jose';
import { useEffect, useState } from 'react';

type IUser = JWTPayload & TTokenPayload & TRole;

async function getRoleInfo(id: number): Promise<TRole> {
  const role = await Utils.callRestAPI({
    url: `/api/roles/${id}`
  });

  return role;
}

async function useCurrentUser() {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const token = document.cookie
      .split(`${ACCESS_TOKEN_KEY}=`)[1]
      .split(';')[0];

    let decodedToken: IUser = decodeJwt(token);

    const role = getRoleInfo(decodedToken.rid);

    decodedToken = { ...decodedToken, role };

    setUser(decodedToken);
  }, []);

  return user;
}

export default useCurrentUser;
