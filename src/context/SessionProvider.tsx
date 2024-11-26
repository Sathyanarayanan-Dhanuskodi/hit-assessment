'use client';

import { IUser } from '@/types/users';
import Utils from '@/utils/utils';
import { createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext<IUser | undefined>(undefined);

export function SessionProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [currentUser, setCurrentUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const currentUserInfo = await Utils.getCurrentUser();

        setCurrentUser(currentUserInfo);
      }
    })();
  }, []);

  return (
    <SessionContext.Provider value={currentUser}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  return useContext(SessionContext);
};
